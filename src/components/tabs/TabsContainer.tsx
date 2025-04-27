import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs'
import PersonalForm from '@/components/forms/PersonalForm'
import InvoiceForm from '@/components/forms/InvoiceForm'
import WorktimeForm from '@/components/forms/WorktimeForm'
import ApiConfigForm from '@/components/forms/ApiConfigForm'
import PaymentInfoForm from '@/components/forms/PaymentInfoForm'

interface Props {
  tab: string;
  setTab: (value: string) => void;
  onFetchHarvest: () => void;
  onPersonalSubmit: (data: any) => void;
  onPaymentSubmit: (data: any) => void;
  onInvoiceSubmit: (data: any) => void;
  onApiConfigSubmit: (data: any) => void;
}

const TabsContainer = ({
  tab,
  setTab,
  onFetchHarvest,
  onPersonalSubmit,
  onPaymentSubmit,
  onInvoiceSubmit,
  onApiConfigSubmit,
}: Props) => {
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
          <ApiConfigForm onSubmit={onApiConfigSubmit} />
        </TabsContent>
        <TabsContent value="personal" className="p-6">
          <PersonalForm onSubmit={onPersonalSubmit} />
        </TabsContent>
        <TabsContent value="account" className="p-6">
          <PaymentInfoForm onSubmit={onPaymentSubmit} />
        </TabsContent>
        <TabsContent value="invoice" className="p-6">
          <InvoiceForm onSubmit={onInvoiceSubmit} />
        </TabsContent>
        <TabsContent value="worktime" className="p-6">
          <WorktimeForm onFetch={onFetchHarvest} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default TabsContainer
