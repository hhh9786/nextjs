'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import z, { date } from 'zod';

const InvoiceSchema = z.object({
    id: z.string().min(1, 'ID is required'),
    customerId: z.string().min(1, 'Customer ID is required'),
    amount: z.coerce.number().min(0, 'Amount is required'),
    status: z.enum(['pending', 'paid'], {
        errorMap: () => ({ message: 'Status must be one of pending or paid' }),
    }),
    date: z.coerce.date()
});
const Invoice = InvoiceSchema.omit({
    id: true,
    date: true,
});

const sql = postgres(process.env.POSTGRES_URL!, {
    ssl: 'require', // Ensure SSL is enabled for secure connections
});

const createInvoice = async (formData: FormData) => {
    const invoiceData = Invoice.parse({
        customerId: formData.get('customerId') as string,
        amount: formData.get('amount') as string,
        status: formData.get('status') as string,
    });
    invoiceData.amount *= 100; // Convert to cents
    const date = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    console.log(invoiceData);
    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoiceData.customerId}, ${invoiceData.amount}, ${invoiceData.status}, ${date})
    `;
    revalidatePath('/dashboard/invoices'); // Revalidate the invoices page to reflect the new invoice
    redirect('/dashboard/invoices'); // Redirect to the invoices page after creation
}
export { createInvoice };