import { Outlet } from 'react-router-dom';
import CustomerFooter from '../components/customer/CustomerFooter';
import CustomerNavbar from '../components/customer/CustomerNavbar';

export default function CustomerLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <CustomerNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <CustomerFooter />
    </div>
  );
}
