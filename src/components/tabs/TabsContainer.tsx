import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs'
import PersonalForm from '@/components/forms/PersonalForm'
import InvoiceForm from '@/components/forms/InvoiceForm'
import WorktimeForm from '@/components/forms/WorktimeForm'
import ApiConfigForm from '@/components/forms/ApiConfigForm'
import PaymentInfoForm from '@/components/forms/PaymentInfoForm'

interface Props {
    tab: string
    setTab: (value: string) => void
    worktime: any[]
    onFetchHarvest: () => void
    onPersonalSubmit: (data: any) => void
    onPaymentSubmit: (data: any) => void
    onInvoiceSubmit: (data: any) => void
    onApiConfigSubmit: (data: any) => void
}

const TabsContainer = ({
    tab,
    setTab,
    worktime,
    onFetchHarvest,
    onPersonalSubmit,
    onPaymentSubmit,
    onInvoiceSubmit,
    onApiConfigSubmit
}: Props) => (
    <Tabs value={tab} onValueChange={setTab} className="flex flex-col flex-grow">
        <TabsList className="flex justify-center gap-4 py-4 border-b">
            <TabsTrigger value="harvest">Api Config</TabsTrigger>
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="account">Payment Info</TabsTrigger>
            <TabsTrigger value="invoice">Invoice Info</TabsTrigger>
            <TabsTrigger value="worktime">Worktime</TabsTrigger>
        </TabsList>

        <div className="flex-grow overflow-y-auto">
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
                <WorktimeForm data={worktime} onFetch={onFetchHarvest} />
            </TabsContent>
        </div>
    </Tabs>
)

export default TabsContainer
