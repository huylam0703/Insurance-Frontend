import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-white to-gray-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            <Shield className="h-3.5 w-3.5" />
            Trusted Insurance Platform
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Buy insurance online and track claims easily
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-600">
            Compare plans, purchase coverage in minutes, and follow every claim from
            submission to payment — all in one secure customer portal.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/#plans">
              <Button size="lg" className="w-full sm:w-auto">
                Explore Plans
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/#claims">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Track Claim
              </Button>
            </Link>
          </div>
        </div>

        <Card className="relative overflow-hidden border-blue-100 bg-gradient-to-br from-white to-blue-50/50 shadow-lg shadow-blue-100/50">
          <p className="text-sm font-semibold text-blue-600">Your coverage summary</p>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">Family Protection Plan</h2>
          <ul className="mt-6 space-y-3">
            {[
              'Active health & vehicle policies',
              '2 open claims in review',
              'Next renewal: Aug 12, 2026',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Total coverage
              </p>
              <p className="mt-1 text-xl font-bold text-gray-900">$1.25M</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Monthly premium
              </p>
              <p className="mt-1 text-xl font-bold text-blue-600">$214</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
