import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/invoices/edit-form";
import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";

const InvoiceEditPage = async (props: {
    params: Promise<{
        id: string;
    }>;
}) => {
    const params = await props.params;
    const id = params.id;
    const [customers, invoice] = await Promise.all([
        fetchCustomers(),
        fetchInvoiceById(id)
    ]).catch((error) => {
        console.error("Error fetching data:", error);
        return [[], null]; // Return empty customers and null invoice on error
    });
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Dashboard", href: "/dashboard" },
                    { label: "Invoices", href: "/dashboard/invoices" },
                    { label: "Edit Invoice", href: `/dashboard/invoices/${id}/edit` }
                ]}
            />
            <Form invoice={invoice} customers={customers} />
        </main>
    );
};

export default InvoiceEditPage;
