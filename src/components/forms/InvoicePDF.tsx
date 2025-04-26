import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
    section: { margin: 10, padding: 10, fontSize: 12 }
})

interface Props {
    personal: any
    invoice: any
    harvest: any[]
}

const InvoicePDF = ({ personal, invoice, harvest }: Props) => (
    <Document>
        <Page size="A4">
            <View style={styles.section}>
                <Text>Invoice</Text>
                <Text>Name: {personal.name}</Text>
                <Text>Info: {personal.info}</Text>
                <Text>Company Info: {personal.companyInfo}</Text>
                <Text>Invoice Number: {invoice.number}</Text>
                <Text>Issued: {invoice.issuedDate}</Text>
                <Text>Due: {invoice.dueDate}</Text>
                <Text>Billing Period: {invoice.billingPeriod}</Text>
                <Text>
                    Hours: {invoice.from} - {invoice.to}
                </Text>
                <Text>Type: {invoice.type}</Text>
                <Text>Account Title: {invoice.accountTitle}</Text>
                <Text>Bank: {invoice.bank}</Text>
                <Text>Routing: {invoice.routing}</Text>
                <Text>Account: {invoice.account}</Text>
                <Text>Harvest Entries:</Text>
                {harvest.map((entry, idx) => (
                    <Text key={idx}>
                        Project: {entry.project.name}, Hours: {entry.hours}, Rate: ${entry.task.billable_rate}, Amount:
                        ${entry.hours * entry.task.billable_rate}
                    </Text>
                ))}
            </View>
        </Page>
    </Document>
)

export default InvoicePDF
