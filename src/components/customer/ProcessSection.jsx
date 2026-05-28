import { ArrowRight } from 'lucide-react';
import { claimSteps, purchaseSteps } from '../../utils/customerMockData';
import { formatStatusLabel } from '../../utils/format';

export default function ProcessSection() {
  return (
    <>
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How to buy insurance
            </h2>
            <p className="mt-3 text-gray-500">
              From browsing plans to an active contract in five simple steps.
            </p>
          </div>
          <ol className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {purchaseSteps.map((step, index) => (
              <li
                key={step.key}
                className="relative rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-semibold text-gray-900">{step.label}</h3>
                <p className="mt-1 text-sm text-gray-500">{step.description}</p>
                {index < purchaseSteps.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-gray-300 lg:block" />
                )}
              </li>
            ))}
          </ol>
          <p className="mt-8 text-center text-sm font-medium text-blue-600">
            BROWSE → SELECT → CONFIRM → PAYMENT → ACTIVE CONTRACT
          </p>
        </div>
      </section>

      <section id="claims" className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Claim status workflow
            </h2>
            <p className="mt-3 text-gray-500">
              Track your claim through every stage until approval, payment, or rejection.
            </p>
          </div>
          <div className="mt-12 overflow-x-auto pb-2">
            <div className="flex min-w-max gap-2 md:gap-4">
              {claimSteps.map((step, index) => (
                <div key={step.key} className="relative flex min-w-[120px] flex-1 flex-col items-center px-2 sm:min-w-[140px]">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${
                      step.status === 'REJECTED'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <p className="mt-3 text-center text-sm font-medium text-gray-900">
                    {step.label}
                  </p>
                  <p className="mt-0.5 text-center text-xs text-gray-400">
                    {formatStatusLabel(step.status)}
                  </p>
                  {index < claimSteps.length - 1 && (
                    <ArrowRight className="absolute right-0 top-5 hidden h-4 w-4 text-gray-300 md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-8 text-center text-sm text-gray-400">
            SUBMITTED → UNDER REVIEW → NEED MORE INFO → APPROVED → PAID or REJECTED
          </p>
        </div>
      </section>
    </>
  );
}
