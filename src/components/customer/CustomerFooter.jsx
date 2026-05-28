import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Shield } from 'lucide-react';

export default function CustomerFooter() {
  return (
    <footer id="contact" className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Shield className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-lg font-bold text-gray-900">InsureHub</span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-500">
              Buy insurance online, manage contracts, and track claims with a secure
              platform built for modern policyholders.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-500">
              <li>
                <Link to="/" className="transition-colors hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <a href="#plans" className="transition-colors hover:text-blue-600">
                  Insurance Plans
                </a>
              </li>
              <li>
                <Link to="/login" className="transition-colors hover:text-blue-600">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="transition-colors hover:text-blue-600">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-blue-600" />
                +1 (800) 555-0199
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-blue-600" />
                support@insurehub.com
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                1200 Insurance Ave, Suite 400, New York, NY
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-100 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} InsureHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
