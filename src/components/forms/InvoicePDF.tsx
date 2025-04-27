import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { Table, TR, TH, TD } from "@ag-media/react-pdf-table";
import { Invoice, Payment, Personal } from "@types";
import { formatNumber } from "@/utils/format";
import { format } from "date-fns";
import { dateToLocalISOMidnight } from "@/utils/date";

type InvoicePDFProps = {
  invoice: Invoice;
  payment: Payment;
  personal: Personal;
  worktime: any[];
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    flexDirection: "column",
    justifyContent: "space-between", // important!
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftColumn: {
    width: "55%",
  },
  rightColumn: {
    width: "45%",
    textAlign: "right",
  },
  alignLeft: {
    textAlign: "left",
  },
  alignRight: {
    textAlign: "right",
  },
  bold: {
    fontWeight: "bold",
  },
  blueText: {
    color: "#0070F3",
  },
  noBorder: {
    borderTop: 0,
    borderBottom: 0,
    borderLeft: 0,
    borderRight: 0,
  },
  table: {
    width: "100%",
  },
  tableHeader: {
    backgroundColor: "#fff",
    fontWeight: "bold",
    height: "30px",
  },
  tableCell: {
    height: "30px",
  },
  paymentInfo: {
    marginTop: 20,
  },
  paymentTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  footer: {
    marginTop: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  contentWrapper: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

const InvoicePDF = ({
  invoice,
  payment,
  personal,
  worktime,
}: InvoicePDFProps) => {
  const rate = invoice.rate ?? 0;
  const totalAmount =
    worktime.reduce((acc, w) => acc + w.total_hours, 0) * rate;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.contentWrapper}>
          <View>
            <View style={[styles.section, styles.row, { marginLeft: 50 }]}>
              <View style={styles.leftColumn}>
                <Text style={{ ...styles.bold, marginBottom: 10 }}>
                  {personal.name}
                </Text>
                <Text>{personal.info}</Text>
              </View>
              <View style={styles.rightColumn}>
                <Text style={{ ...styles.header, marginBottom: 30 }}>
                  INVOICE
                </Text>
                <Text style={styles.bold}>INVOICE #{invoice.number}</Text>
                <Text style={{ marginBottom: 10 }}>
                  <Text style={styles.bold}>ISSUED DATE: </Text>
                  {format(
                    dateToLocalISOMidnight(invoice.issuedDate),
                    "MMM dd, yyyy"
                  ).toUpperCase()}
                </Text>
                <Text style={{ ...styles.bold, ...styles.blueText }}>
                  DUE DATE:{" "}
                  {format(
                    dateToLocalISOMidnight(invoice.dueDate),
                    "MMM dd, yyyy"
                  ).toUpperCase()}
                </Text>
              </View>
            </View>

            <View style={[styles.section, styles.row, { marginLeft: 50 }]}>
              <View style={styles.leftColumn}>
                <Text style={styles.bold}>TO:</Text>
                <Text>{personal.companyInfo}</Text>
              </View>
              <View style={styles.rightColumn}>
                <Text style={styles.bold}>FOR:</Text>
                <Text>
                  Billing Period –{" "}
                  {format(dateToLocalISOMidnight(invoice.from), "MMM dd, yyyy")}{" "}
                  to{" "}
                  {format(dateToLocalISOMidnight(invoice.to), "MMM dd, yyyy")}
                </Text>
              </View>
            </View>

            <View style={[styles.section, { marginLeft: 50 }]}>
              <Table style={styles.table}>
                <TH>
                  <TD
                    style={{
                      ...styles.tableHeader,
                      ...styles.noBorder,
                      justifyContent: "flex-start",
                      flexGrow: 1,
                      minWidth: "150px",
                    }}
                  >
                    PROJECT / TASK
                  </TD>
                  <TD
                    style={{
                      ...styles.tableHeader,
                      ...styles.noBorder,
                      justifyContent: "flex-start",
                      flexGrow: 1,
                      minWidth: "80px",
                    }}
                  >
                    CLIENT
                  </TD>
                  <TD
                    style={{
                      ...styles.tableHeader,
                      ...styles.noBorder,
                      justifyContent: "flex-end",
                      flexGrow: 1,
                      minWidth: "50px",
                    }}
                  >
                    HOURS
                  </TD>
                  <TD
                    style={{
                      ...styles.tableHeader,
                      ...styles.noBorder,
                      justifyContent: "flex-end",
                      flexGrow: 1,
                      minWidth: "50px",
                    }}
                  >
                    RATE
                  </TD>
                  <TD
                    style={{
                      ...styles.tableHeader,
                      ...styles.noBorder,
                      justifyContent: "flex-end",
                      flexGrow: 1,
                      minWidth: "70px",
                    }}
                  >
                    AMOUNT
                  </TD>
                </TH>
                {worktime.map((project, index) => (
                  <TR key={index}>
                    <TD
                      style={{
                        ...styles.noBorder,
                        ...styles.tableCell,
                        justifyContent: "flex-start",
                        flexGrow: 1,
                        minWidth: "150px",
                      }}
                    >
                      {project.project_name}
                    </TD>
                    <TD
                      style={{
                        ...styles.noBorder,
                        ...styles.tableCell,
                        justifyContent: "flex-start",
                        flexGrow: 1,
                        minWidth: "80px",
                      }}
                    >
                      {project.client_name}
                    </TD>
                    <TD
                      style={{
                        ...styles.noBorder,
                        ...styles.tableCell,
                        justifyContent: "flex-end",
                        flexGrow: 1,
                        minWidth: "50px",
                      }}
                    >
                      {formatNumber(project.total_hours, 2, false, "0.00")}
                    </TD>
                    <TD
                      style={{
                        ...styles.noBorder,
                        ...styles.tableCell,
                        justifyContent: "flex-end",
                        flexGrow: 1,
                        minWidth: "50px",
                      }}
                    >
                      {formatNumber(rate, 2, true, "0.00")}
                    </TD>
                    <TD
                      style={{
                        ...styles.noBorder,
                        ...styles.tableCell,
                        justifyContent: "flex-end",
                        flexGrow: 1,
                        minWidth: "70px",
                      }}
                    >
                      {formatNumber(
                        project.total_hours * rate,
                        2,
                        true,
                        "0.00"
                      )}
                    </TD>
                  </TR>
                ))}
              </Table>
              <View style={styles.row}>
                <View style={styles.leftColumn}></View>
                <View style={styles.rightColumn}>
                  <Text style={styles.bold}>
                    TOTAL {formatNumber(totalAmount, 2, true, "0.00")}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentTitle}>PAYMENT INFORMATION</Text>
              <Text>
                <Text style={styles.bold}>Type:</Text> {payment.type}
              </Text>
              <Text>
                <Text style={styles.bold}>Account Title:</Text>
                {payment.accountTitle}
              </Text>
              <Text>
                <Text style={styles.bold}>Bank:</Text> {payment.bank}
              </Text>
              <Text>
                <Text style={styles.bold}>ACH/Routing:</Text> {payment.routing}
              </Text>
              <Text>
                <Text style={styles.bold}>DDA/Account:</Text> {payment.account}
              </Text>
            </View>

            <Text style={styles.footer}>Thank you for your business!</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
