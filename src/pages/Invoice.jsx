import React from "react";
import DataTable from "../components/DataTable";

const invoiceColumns = [
  { key: "orderId", label: "Order ID", sortable: true },
  { key: "invoiceId", label: "Invoice ID", sortable: true },
  { key: "company", label: "Company", sortable: true },
  { key: "department", label: "Department", sortable: true },
  { key: "gst", label: "GST", sortable: false },
  { key: "date", label: "Issued Date", sortable: true },
  { key: "amount", label: "Invoice Amount", sortable: true, align: "right" },
];

const invoiceRows = [
  { orderId: "ORD-001", invoiceId: "INV-1001", company: "Geodesic Pvt Ltd", department: "Admin", gst: "18%", date: "2025-09-01", amount: 314151},
  { orderId: "ORD-003", invoiceId: "INV-1003", company: "Sony India", department: "Accounts", gst: "18%", date: "2025-09-05", amount: 5424247 },
  { orderId: "ORD-004", invoiceId: "INV-1004", company: "Acme Pvt Ltd", department: "Procurement", gst: "18%", date: "2025-09-06", amount: 123456 },
  { orderId: "ORD-005", invoiceId: "INV-1005", company: "Infosys", department: "IT", gst: "18%", date: "2025-09-10", amount: 789321 },
  { orderId: "ORD-006", invoiceId: "INV-1006", company: "TCS", department: "Finance", gst: "18%", date: "2025-09-12", amount: 45678 },
  { orderId: "ORD-007", invoiceId: "INV-1007", company: "Wipro", department: "Accounts", gst: "18%", date: "2025-09-15", amount: 951357 },
  { orderId: "ORD-008", invoiceId: "INV-1008", company: "Reliance", department: "Sales", gst: "18%", date: "2025-09-18", amount: 753951 },
  { orderId: "ORD-009", invoiceId: "INV-1009", company: "Deloitte", department: "Consulting", gst: "18%", date: "2025-09-20", amount: 852963 },
  { orderId: "ORD-010", invoiceId: "INV-1010", company: "Amazon", department: "Logistics", gst: "18%", date: "2025-09-25", amount: 147852 },
  { orderId: "ORD-011", invoiceId: "INV-1011", company: "Samsung", department: "Accounts", gst: "18%", date: "2025-09-24", amount: 679054 },
  { orderId: "ORD-012", invoiceId: "INV-1012", company: "Accenture", department: "Logistics", gst: "18%", date: "2025-06-25", amount: 976874 },
];

export default function Invoice() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div>
          <div style={{ color: "var(--muted)", fontSize: 13 }}>Dashboard › Invoice Received</div>
          <h1 style={{ margin: 0 }}>Invoice Received</h1>
        </div>
        <div style={{ textAlign: "right", color: "var(--muted)" }}>
          October 2025<br /><small>S M T W T F S</small>
        </div>
      </div>

      <DataTable columns={invoiceColumns} data={invoiceRows} />
    </div>
  );
}
