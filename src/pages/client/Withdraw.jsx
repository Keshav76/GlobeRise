import { useState, useEffect } from 'react';
import { walletService } from '../../services/walletService';
import { withdrawalService } from '../../services/withdrawalService';
import { transactionService } from '../../services/transactionService';
import { formatCurrency } from '../../utils/formatters';
import { FaMoneyBillWave, FaCalendarAlt, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import Loading from '../../components/common/Loading';
import Button from '../../components/common/Button';

const Withdraw = () => {
  const [withdrawalBalance, setWithdrawalBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
  const [feePercent, setFeePercent] = useState(10); // Default 10%

  const isMonday = () => {
    const today = new Date();
    return today.getDay() === 1; // 1 = Monday
  };

  const getDaysUntilMonday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    if (dayOfWeek === 1) return 0;
    const daysUntil = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
    return daysUntil;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [balances, txs] = await Promise.all([
        walletService.getBalances(),
        transactionService.getTransactions({ type: 'WITHDRAWAL', limit: 10 })
      ]);
      setWithdrawalBalance(balances.withdrawal || 0);
      setPendingWithdrawals((txs.transactions || []).filter(t => t.status === 'PENDING'));
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load withdrawal data');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!isMonday()) {
      setError('Withdrawals can only be requested on Mondays (UTC)');
      return;
    }

    const amountNum = parseFloat(amount);
    if (!amountNum || amountNum < 10) {
      setError('Minimum withdrawal amount is $10');
      return;
    }

    if (amountNum > withdrawalBalance) {
      setError('Insufficient Withdrawal wallet balance');
      return;
    }

    try {
      setSubmitting(true);
      await walletService.requestWithdrawal(amountNum);
      setSuccess(`Withdrawal request of ${formatCurrency(amountNum)} submitted successfully!`);
      setAmount('');
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit withdrawal request');
    } finally {
      setSubmitting(false);
    }
  };

  const calculateFee = () => {
    const amountNum = parseFloat(amount) || 0;
    return (amountNum * feePercent) / 100;
  };

  const calculateNetAmount = () => {
    const amountNum = parseFloat(amount) || 0;
    const fee = calculateFee();
    return amountNum - fee;
  };

  if (loading) return <Loading />;

  const mondayStatus = isMonday();
  const daysUntilMonday = getDaysUntilMonday();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white flex items-center gap-2">
        <FaMoneyBillWave className="text-green-400" />
        Withdrawal Request
      </h1>

      {/* Monday Status Banner */}
      {!mondayStatus && (
        <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-yellow-400 text-2xl" />
            <div>
              <h3 className="text-yellow-300 font-bold text-lg">Withdrawals Open on Mondays Only</h3>
              <p className="text-yellow-200 text-sm mt-1">
                Next withdrawal window: <strong>{daysUntilMonday} {daysUntilMonday === 1 ? 'day' : 'days'}</strong> from now
              </p>
            </div>
          </div>
        </div>
      )}

      {mondayStatus && (
        <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-green-400 text-xl" />
            <div>
              <h3 className="text-green-300 font-bold">Withdrawal Window Open!</h3>
              <p className="text-green-200 text-sm">You can submit withdrawal requests today</p>
            </div>
          </div>
        </div>
      )}

      {/* Withdrawal Form */}
      <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Request Withdrawal</h2>

        <div className="bg-green-950/50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-green-300">Withdrawal Wallet Balance</p>
              <p className="text-3xl font-bold text-white">{formatCurrency(withdrawalBalance)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Minimum Withdrawal</p>
              <p className="text-lg font-bold text-green-400">$10.00</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleWithdraw} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-200 mb-2">
              Withdrawal Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount (min $10)"
              className="w-full px-4 py-3 bg-green-950/50 border border-green-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={!mondayStatus || submitting}
              min="10"
              step="0.01"
            />
          </div>

          {amount && parseFloat(amount) >= 10 && (
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Gross Amount:</span>
                <span className="text-white font-bold">{formatCurrency(parseFloat(amount))}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Withdrawal Fee ({feePercent}%):</span>
                <span className="text-red-400 font-bold">-{formatCurrency(calculateFee())}</span>
              </div>
              <div className="border-t border-gray-700 pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="text-gray-300 font-medium">Net Amount:</span>
                  <span className="text-green-400 font-bold text-lg">{formatCurrency(calculateNetAmount())}</span>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg flex items-center gap-2">
              <FaExclamationTriangle />
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500/20 border border-green-500 text-green-200 px-4 py-3 rounded-lg flex items-center gap-2">
              <FaCheckCircle />
              {success}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3 text-lg font-bold bg-green-600 hover:bg-green-700"
            disabled={!mondayStatus || submitting}
          >
            {submitting ? 'Submitting Request...' : 'Request Withdrawal'}
          </Button>

          {!mondayStatus && (
            <p className="text-center text-yellow-300 text-sm">
              <FaCalendarAlt className="inline mr-1" />
              Withdrawal requests can only be submitted on Mondays
            </p>
          )}
        </form>
      </div>

      {/* Pending Withdrawals */}
      {pendingWithdrawals.length > 0 && (
        <div className="bg-[#393E46] rounded-lg border border-[#4b5563] p-6">
          <h2 className="text-xl font-bold text-white mb-4">Pending Withdrawal Requests</h2>
          <div className="space-y-3">
            {pendingWithdrawals.map((withdrawal) => (
              <div key={withdrawal.id} className="bg-[#0f1419] rounded-lg p-4 border border-yellow-800/30">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-bold">{formatCurrency(withdrawal.amount)}</p>
                    <p className="text-xs text-gray-400">
                      Requested: {new Date(withdrawal.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="px-3 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full text-xs font-semibold">
                    PENDING
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Withdrawal Info */}
      <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-6">
        <h3 className="text-lg font-bold text-blue-300 mb-3">Withdrawal Information</h3>
        <ul className="space-y-2 text-sm text-blue-200">
          <li>• <strong>Withdrawal Window:</strong> Mondays only (UTC timezone)</li>
          <li>• <strong>Minimum Amount:</strong> $10.00</li>
          <li>• <strong>Withdrawal Fee:</strong> {feePercent}% (deducted from gross amount)</li>
          <li>• <strong>Processing Time:</strong> Admin approval required</li>
          <li>• <strong>Transfer First:</strong> Move funds from Reward wallet to Withdrawal wallet before requesting</li>
        </ul>
      </div>
    </div>
  );
};

export default Withdraw;
