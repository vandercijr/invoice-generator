import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs'
import PersonalForm from "@components/forms/PersonalForm";
import InvoiceForm from "@components/forms/InvoiceForm";
import WorktimeForm from "@components/forms/WorktimeForm";
import ApiConfigForm from "@components/forms/ApiConfigForm";
import PaymentInfoForm from "@components/forms/PaymentInfoForm";
import SendEmailConfigForm from "@components/forms/SendEmailConfigForm";
import { ApiConfig, EmailConfig, Invoice, Payment, Personal } from "@types";

interface Props {
  tab: string;
  setTab: (value: string) => void;
  onFetchHarvest: () => void;
  onSubmit: (
    name: string,
    data: ApiConfig | Personal | Payment | EmailConfig | Invoice,
    callback?: (any) => void
  ) => void;
}

const TabsContainer = ({ tab, setTab, onFetchHarvest, onSubmit }: Props) => {
  return (
    <Tabs
      value={tab}
      onValueChange={setTab}
      className="flex flex-col flex-grow"
    >
      <TabsList className="flex justify-center gap-4 py-4 border-b bg-gray-50">
        <TabsTrigger
          value="harvest"
          className="px-4 py-2 text-sm font-medium text-gray-600 rounded-t-md hover:text-gray-800 hover:bg-gray-100 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white"
        >
          Api Config
        </TabsTrigger>
        <TabsTrigger
          value="personal"
          className="px-4 py-2 text-sm font-medium text-gray-600 rounded-t-md hover:text-gray-800 hover:bg-gray-100 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white"
        >
          Personal Info
        </TabsTrigger>
        <TabsTrigger
          value="account"
          className="px-4 py-2 text-sm font-medium text-gray-600 rounded-t-md hover:text-gray-800 hover:bg-gray-100 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white"
        >
          Payment Info
        </TabsTrigger>
        <TabsTrigger
          value="emailConfig"
          className="px-4 py-2 text-sm font-medium text-gray-600 rounded-t-md hover:text-gray-800 hover:bg-gray-100 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white"
        >
          Send Email Config
        </TabsTrigger>
        <TabsTrigger
          value="invoice"
          className="px-4 py-2 text-sm font-medium text-gray-600 rounded-t-md hover:text-gray-800 hover:bg-gray-100 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white"
        >
          Invoice Info
        </TabsTrigger>
        <TabsTrigger
          value="worktime"
          className="px-4 py-2 text-sm font-medium text-gray-600 rounded-t-md hover:text-gray-800 hover:bg-gray-100 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white"
        >
          Worktime
        </TabsTrigger>
      </TabsList>

      <div className="flex-grow overflow-y-auto bg-white">
        <TabsContent value="harvest" className="p-6">
          <ApiConfigForm onSubmit={onSubmit} />
        </TabsContent>
        <TabsContent value="personal" className="p-6">
          <PersonalForm onSubmit={onSubmit} />
        </TabsContent>
        <TabsContent value="account" className="p-6">
          <PaymentInfoForm onSubmit={onSubmit} />
        </TabsContent>
        <TabsContent value="emailConfig" className="p-6">
          <SendEmailConfigForm onSubmit={onSubmit} />
        </TabsContent>
        <TabsContent value="invoice" className="p-6">
          <InvoiceForm onSubmit={onSubmit} />
        </TabsContent>
        <TabsContent value="worktime" className="p-6">
          <WorktimeForm onFetch={onFetchHarvest} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default TabsContainer
