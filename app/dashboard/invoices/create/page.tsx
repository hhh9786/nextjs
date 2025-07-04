import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { lusitana } from '@/app/ui/fonts';
import { fetchCustomers } from '@/app/lib/data';

export default async function Page() {
    const customers = await fetchCustomers();
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'Invoices', href: '/dashboard/invoices' },
                    { label: 'Create Invoice', href: '/dashboard/invoices/create' }
            ]}
            />
            <Form customers={customers} />            
        </main>
    );
}   