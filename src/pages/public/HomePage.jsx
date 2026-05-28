import { useCallback, useEffect, useState } from 'react';
import { getPolicies } from '../../services/policyService';
import { useNavigate } from 'react-router-dom';
import FeatureSection from '../../components/customer/FeatureSection';
import HeroSection from '../../components/customer/HeroSection';
import PolicyCard from '../../components/customer/PolicyCard';
import PolicyPurchaseModal from '../../components/customer/PolicyPurchaseModal';
import ProcessSection from '../../components/customer/ProcessSection';
import Button from '../../components/ui/Button';
import { getApiErrorMessage } from '../../utils/apiError';
import { resolvePolicyId } from '../../utils/policy';
import { getAccessToken } from '../../utils/token';

function getPolicyStatus(policy) {
  return policy.policyStatus || policy.status || 'UNKNOWN';
}

export default function HomePage() {
  const navigate = useNavigate();
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [purchaseOpen, setPurchaseOpen] = useState(false);

  const loadPolicies = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getPolicies();
      const available = data.filter((policy) => getPolicyStatus(policy) === 'ACTIVE');
      setPolicies(available.length > 0 ? available : data);
    } catch (err) {
      setPolicies([]);
      setError(getApiErrorMessage(err, 'Failed to load insurance plans. Please try again later.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await getPolicies();
        if (cancelled) return;

        const available = data.filter((policy) => getPolicyStatus(policy) === 'ACTIVE');
        setPolicies(available.length > 0 ? available : data);
        setError('');
      } catch (err) {
        if (cancelled) return;
        setPolicies([]);
        setError(
          getApiErrorMessage(err, 'Failed to load insurance plans. Please try again later.')
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleBuy = (policy) => {
    if (!getAccessToken()) {
      navigate('/login', {
        state: { message: 'Please login to purchase insurance' },
      });
      return;
    }

    if (!resolvePolicyId(policy)) {
      setError(
        'This insurance plan cannot be purchased right now. Please refresh the page or choose another plan.'
      );
      return;
    }

    setSelectedPolicy(policy);
    setPurchaseOpen(true);
  };

  const handleClosePurchase = () => {
    if (!purchaseOpen) return;
    setPurchaseOpen(false);
    setSelectedPolicy(null);
  };

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

          {loading && (
            <div className="mt-12 flex flex-col items-center justify-center py-16">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
              <p className="mt-4 text-sm text-gray-500">Loading insurance plans...</p>
            </div>
          )}

          {!loading && error && (
            <div className="mt-12 rounded-2xl border border-red-100 bg-red-50 px-6 py-10 text-center">
              <p className="text-sm text-red-700">{error}</p>
              <Button variant="secondary" className="mt-6" onClick={loadPolicies}>
                Try again
              </Button>
            </div>
          )}

          {!loading && !error && policies.length === 0 && (
            <div className="mt-12 rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
              <p className="text-sm text-gray-500">
                No insurance plans are available at the moment. Please check back later.
              </p>
              <Button variant="secondary" className="mt-6" onClick={loadPolicies}>
                Refresh
              </Button>
            </div>
          )}

          {!loading && !error && policies.length > 0 && (
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {policies.map((policy) => (
                <PolicyCard
                  key={resolvePolicyId(policy) ?? policy.name}
                  policy={policy}
                  onBuy={handleBuy}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <FeatureSection />
      <ProcessSection />

      <PolicyPurchaseModal
        open={purchaseOpen}
        policy={selectedPolicy}
        onClose={handleClosePurchase}
      />
    </>
  );
}
