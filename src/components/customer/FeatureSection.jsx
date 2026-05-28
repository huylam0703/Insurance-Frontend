import {
  Activity,
  Bell,
  ClipboardList,
  FileText,
  Lock,
  ShoppingCart,
} from 'lucide-react';
import { customerFeatures } from '../../utils/customerMockData';

const iconMap = {
  ShoppingCart,
  FileText,
  ClipboardList,
  Activity,
  Lock,
  Bell,
};

export default function FeatureSection() {
  return (
    <section id="about" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need in one place
          </h2>
          <p className="mt-3 max-w-2xl text-gray-500">
            Manage your insurance journey from purchase to claim resolution with
            enterprise-grade security and transparency.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {customerFeatures.map((feature) => {
            const Icon = iconMap[feature.icon] || ShoppingCart;
            return (
              <article
                key={feature.title}
                className="rounded-2xl border border-gray-200/80 bg-gray-50/50 p-6 transition-all hover:border-blue-100 hover:bg-blue-50/30 hover:shadow-sm"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/20">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
