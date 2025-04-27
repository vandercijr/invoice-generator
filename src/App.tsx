import { useState, useEffect } from "react";
import { fetchData, getDb } from "@/utils/db";
import { fetchHarvestData } from "@/utils/api";
import TabsContainer from "@/components/tabs/TabsContainer";
import InvoicePDF from "@/components/forms/InvoicePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DataContext } from "@/utils/context";
import { ApiConfig, Invoice, Payment, Personal } from "@types";

const App = () => {
  const [tab, setTab] = useState("worktime");
  const [harvestData, setHarvestData] = useState<any[]>([]);
  const [db, setDb] = useState<any>(null);
  const [invoiceInfo, setInvoiceInfo] = useState({} as Invoice);
  const [apiConfig, setApiConfig] = useState({} as ApiConfig);
  const [personalInfo, setPersonalInfo] = useState({} as Personal);
  const [paymentInfo, setPaymentInfo] = useState({} as Payment);

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
      if (payment) setPaymentInfo(payment);
      if (personal) setPersonalInfo(personal);
      if (config) setApiConfig(config);
      if (invoice) setInvoiceInfo(invoice);
    };
    load();
  }, []);

  return (
    <DataContext.Provider
      value={{
        invoice: invoiceInfo,
        payment: paymentInfo,
        apiConfig: apiConfig,
        personal: personalInfo,
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
          />

          {!!invoiceInfo &&
          !!paymentInfo &&
          !!personalInfo &&
          !!harvestData?.length ? (
            <div className="py-6">
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
                  <button className="w-full py-3 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700">
                    {loading ? "Generating..." : "Generate PDF"}
                  </button>
                )}
              </PDFDownloadLink>
            </div>
          ) : null}
        </div>
      </div>
    </DataContext.Provider>
  );
};

export default App;
