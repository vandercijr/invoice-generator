import { useState, useEffect } from "react";
import { fetchData, getDb } from "@utils/db";
import { fetchHarvestData } from "@utils/api";
import TabsContainer from "@components/tabs/TabsContainer";
import InvoicePDF from "@components/forms/InvoicePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DataContext } from "@utils/context";
import { ApiConfig, EmailConfig, Invoice, Payment, Personal } from "@types";
import { pdf } from "@react-pdf/renderer";
// import emailjs from "@emailjs/browser";
import { sendInvoice } from "@services/invoice";

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

  const handleSendEmail = async () => {
    const blob = await pdf(
      <InvoicePDF
        invoice={invoiceInfo}
        payment={paymentInfo}
        personal={personalInfo}
        worktime={harvestData}
      />
    ).toBlob();

    const attachment = new File([blob], `invoice_${invoiceInfo.number}.pdf`, {
      type: "application/pdf",
    });

    const formData = new FormData();
    formData.append(
      "subject",
      `Invoice #${invoiceInfo.number} ${personalInfo.name}`
    );
    formData.append("name", personalInfo.name);
    formData.append("worktime_from", invoiceInfo.from);
    formData.append("worktime_to", invoiceInfo.to);
    formData.append("email_to", emailConfig.emailTo);
    formData.append("reply_to", emailConfig.emailSender);
    formData.append("attachment", attachment);

    await sendInvoice(formData);
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
