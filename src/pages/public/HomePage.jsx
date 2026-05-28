import FeatureSection from '../../components/customer/FeatureSection';
import HeroSection from '../../components/customer/HeroSection';
import PolicyCard from '../../components/customer/PolicyCard';
import ProcessSection from '../../components/customer/ProcessSection';
import { mockPolicies } from '../../utils/customerMockData';

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section id="plans" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Insurance plans for every need
            </h2>
            <p className="mt-3 text-gray-500">
              Choose from health, life, vehicle, and travel coverage with transparent pricing.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {mockPolicies.map((policy) => (
              <PolicyCard key={policy.id} policy={policy} />
            ))}
          </div>
        </div>
      </section>

      <FeatureSection />
      <ProcessSection />
    </>
  );
}
