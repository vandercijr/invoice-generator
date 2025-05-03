import { useState, useEffect } from "react";
import { fetchData, getDb } from "@/utils/db";
import { fetchHarvestData } from "@/utils/api";
import TabsContainer from "@/components/tabs/TabsContainer";
import InvoicePDF from "@/components/forms/InvoicePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DataContext } from "@/utils/context";
import { ApiConfig, EmailConfig, Invoice, Payment, Personal } from "@types";
import { pdf } from "@react-pdf/renderer";
import emailjs from "@emailjs/browser";

const App = () => {
  const [tab, setTab] = useState("worktime");
  const [harvestData, setHarvestData] = useState<any[]>([]);
  const [db, setDb] = useState<any>(null);
  const [invoiceInfo, setInvoiceInfo] = useState({} as Invoice);
  const [apiConfig, setApiConfig] = useState({} as ApiConfig);
  const [personalInfo, setPersonalInfo] = useState({} as Personal);
  const [paymentInfo, setPaymentInfo] = useState({} as Payment);
  const [emailConfig, setEmailConfig] = useState({} as EmailConfig);

  useEffect(() => {
    getDb().then(setDb);
  }, []);

  const handlePersonalSubmit = async (data: any) => {
    if (!db) return;
    const tx = db.transaction("personal", "readwrite");
    await tx.objectStore("personal").put({ id: 1, ...data });
    await tx.done;
    alert("Personal info saved.");
  };

  const handleInvoiceSubmit = async (data: any) => {
    if (!db) return;
    const tx = db.transaction("invoice", "readwrite");
    await tx.objectStore("invoice").put({ id: 1, ...data });
    await tx.done;
    // localStorage.setItem('invoiceNumber', data.number)
    alert("Invoice info saved.");
  };

  const handlePaymentSubmit = async (data: any) => {
    if (!db) return;
    const tx = db.transaction("payment", "readwrite");
    await tx.objectStore("payment").put({ id: 1, ...data });
    await tx.done;
    alert("Payment info saved.");
  };

  const handleApiConfigSubmit = async (data: any) => {
    if (!db) return;
    const tx = db.transaction("apiConfig", "readwrite");
    await tx.objectStore("apiConfig").put({ id: 1, ...data });
    await tx.done;
    alert("Api config saved.");
  };

  const handleSendEmailConfigSubmit = async (data: any) => {
    if (!db) return;
    const tx = db.transaction("emailConfig", "readwrite");
    await tx.objectStore("emailConfig").put({ id: 1, ...data });
    await tx.done;
    alert("Send email config saved.");
  };

  const handleFetchHarvest = async () => {
    const data = await fetchHarvestData();
    setHarvestData(data);
  };

  useEffect(() => {
    const load = async () => {
      const invoice = await fetchData("invoice", 1);
      const config = await fetchData("apiConfig", 1);
      const payment = await fetchData("payment", 1);
      const personal = await fetchData("personal", 1);
      const emailConfig = await fetchData("emailConfig", 1);
      if (payment) setPaymentInfo(payment);
      if (personal) setPersonalInfo(personal);
      if (config) setApiConfig(config);
      if (invoice) setInvoiceInfo(invoice);
      if (emailConfig) setEmailConfig(emailConfig);
    };
    load();
  }, []);

  useEffect(() => {
    emailjs.init({
      publicKey: "G6Ss5LUla5ppY_RPH", // 🔑 your EmailJS Public Key
      blockHeadless: true,
      blockList: {
        list: ["foo@emailjs.com", "bar@emailjs.com"],
        watchVariable: "userEmail", // 👀 will watch userEmail field
      },
      limitRate: {
        id: "app",
        throttle: 10000, // 10 seconds limit between requests
      },
    });
  }, []); // empty dependency = run once on mount ✅

  const blobToBase64 = (blob: Blob) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const base64data = reader.result.toString();
          resolve(base64data);
        } else {
          reject("Failed to read blob");
        }
      };
      reader.readAsDataURL(blob);
    });
  };

  const generatePdfBase64 = async (pdfDocument: any) => {
    const pdfBlob = await pdf(pdfDocument).toBlob();
    const base64String = await blobToBase64(pdfBlob);
    console.log("NJJ", base64String);
    return base64String;
  };

  const handleSendEmail = async () => {
    // const blob = await pdf(
    //   <InvoicePDF
    //     invoice={invoiceInfo}
    //     payment={paymentInfo}
    //     personal={personalInfo}
    //     worktime={harvestData}
    //   />
    // ).toBlob();

    const base64Pdf = await generatePdfBase64(
      <InvoicePDF
        invoice={invoiceInfo}
        payment={paymentInfo}
        personal={personalInfo}
        worktime={harvestData}
      />
    );

    // const formData = new FormData();
    // formData.append("to", emailConfig.emailTo);
    // formData.append("from", emailConfig.emailSender);
    // formData.append("subject", "Your Invoice");
    // formData.append("file", blob, "invoice.pdf");

    // await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     service_id: "service_m8c03lm",
    //     template_id: "template_ortg0xp",
    //     user_id: "G6Ss5LUla5ppY_RPH",
    //   }),
    // });
    await emailjs.send(
      "service_m8c03lm",
      "template_ortg0xp",
      {
        message: "Your message here",
        invoice_number: invoiceInfo.number,
        name: personalInfo.name,
        worktime_from: invoiceInfo.from,
        worktime_to: invoiceInfo.to,
        email_to: "vandercijr@gmail.com",
        content: base64Pdf,
      }
      // "G6Ss5LUla5ppY_RPH" // this is the "User ID" or "Public Key" you get from EmailJS
    );
  };

  return (
    <DataContext.Provider
      value={{
        invoice: invoiceInfo,
        payment: paymentInfo,
        apiConfig: apiConfig,
        personal: personalInfo,
        emailConfig: emailConfig,
        worktime: harvestData,
      }}
    >
      <div className="w-screen h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-4/5 h-full flex flex-col justify-between">
          <TabsContainer
            tab={tab}
            setTab={setTab}
            onFetchHarvest={handleFetchHarvest}
            onPersonalSubmit={handlePersonalSubmit}
            onInvoiceSubmit={handleInvoiceSubmit}
            onPaymentSubmit={handlePaymentSubmit}
            onApiConfigSubmit={handleApiConfigSubmit}
            onSendEmailConfigSubmit={handleSendEmailConfigSubmit}
          />

          {!!invoiceInfo &&
          !!paymentInfo &&
          !!personalInfo &&
          !!harvestData?.length ? (
            <div className="py-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <PDFDownloadLink
                    document={
                      <InvoicePDF
                        invoice={invoiceInfo}
                        payment={paymentInfo}
                        personal={personalInfo}
                        worktime={harvestData}
                      />
                    }
                    fileName="invoice.pdf"
                  >
                    {({ loading }) => (
                      <button className="w-full flex-1 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700">
                        {loading ? "Generating..." : "Generate PDF"}
                      </button>
                    )}
                  </PDFDownloadLink>
                </div>
                <button
                  onClick={handleSendEmail}
                  className="flex-1 bg-amber-500 text-white font-semibold rounded hover:bg-amber-600"
                >
                  Send PDF
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </DataContext.Provider>
  );
};

export default App;
