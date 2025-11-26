import { useState, useEffect } from 'react';
import { dashboardService } from '../../services/dashboardService';
import Loading from '../../components/common/Loading';
import Alert from '../../components/common/Alert';
import { FaTrophy, FaCheckCircle, FaLock, FaCrown, FaStar } from 'react-icons/fa';

// Define all ranking tiers with requirements and bonuses
const RANKING_TIERS = [
  { rank: 'EXPLORER', teamBusiness: 5000, bonus: 250 },
  { rank: 'PATHFINDER', teamBusiness: 15000, bonus: 750 },
  { rank: 'CHALLENGER', teamBusiness: 40000, bonus: 1500 },
  { rank: 'NAVIGATOR', teamBusiness: 100000, bonus: 3000 },
  { rank: 'CHAMPION', teamBusiness: 200000, bonus: 5000 },
  { rank: 'COMMANDER', teamBusiness: 350000, bonus: 7500 },
  { rank: 'STRATEGIST', teamBusiness: 500000, bonus: 9000 },
  { rank: 'TRAILBLAZER', teamBusiness: 1000000, bonus: 15000 },
  { rank: 'GRANDMASTER', teamBusiness: 1500000, bonus: 20000 },
  { rank: 'LEGEND', teamBusiness: 2500000, bonus: 25000 },
  { rank: 'CROWN PRINCE', teamBusiness: 4000000, bonus: 30000 },
  { rank: 'KING', teamBusiness: 5500000, bonus: 35000 },
  { rank: 'EMPEROR', teamBusiness: 7000000, bonus: 40000 },
  { rank: 'SUPREME LEADER', teamBusiness: 8500000, bonus: 45000 },
  { rank: 'IMPERATOR', teamBusiness: 10000000, bonus: 50000 },
];

const Ranking = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadRankData();
  }, []);

  const loadRankData = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await dashboardService.getStats();
      setStats(data);
    } catch (err) {
      console.error('Error loading rank data:', err);
      setError(err.response?.data?.message || 'Failed to load rank data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading size="lg" />;

  const currentRank = stats?.rank || 'NONE';
  const teamBusiness = parseFloat(stats?.teamBusiness || 0);

  // Find current rank index and next rank
  const currentRankIndex = RANKING_TIERS.findIndex(tier => tier.rank === currentRank);
  const nextRank = currentRankIndex < RANKING_TIERS.length - 1 ? RANKING_TIERS[currentRankIndex + 1] : null;
  const currentTier = currentRankIndex >= 0 ? RANKING_TIERS[currentRankIndex] : null;

  // Calculate progress to next rank
  const getProgressToNextRank = () => {
    if (!nextRank) return 100; // Already at highest rank
    if (!currentTier) return (teamBusiness / nextRank.teamBusiness) * 100;

    const currentReq = currentTier.teamBusiness;
    const nextReq = nextRank.teamBusiness;
    const progress = ((teamBusiness - currentReq) / (nextReq - currentReq)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  const remainingBV = nextRank ? Math.max(nextRank.teamBusiness - teamBusiness, 0) : 0;
  const progressPercentage = getProgressToNextRank();

  const getRankIcon = (rank, index) => {
    if (index >= 10) return <FaCrown className="text-yellow-500" />;
    if (index >= 7) return <FaTrophy className="text-purple-500" />;
    if (index >= 4) return <FaStar className="text-blue-500" />;
    return <FaStar className="text-gray-400" />;
  };

  const isRankAchieved = (rank) => {
    const rankIndex = RANKING_TIERS.findIndex(tier => tier.rank === rank);
    return rankIndex <= currentRankIndex;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <FaTrophy className="text-yellow-500" />
          Ranking System
        </h1>
      </div>

      {error && <Alert type="error" message={error} />}

      {/* Current Status Card */}
      <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm mb-2">Current Rank</p>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              {getRankIcon(currentRank, currentRankIndex)}
              <h2 className="text-2xl font-bold text-white">{currentRank}</h2>
            </div>
          </div>
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm mb-2">Your Team Business</p>
            <h2 className="text-2xl font-bold text-green-400">${teamBusiness.toLocaleString()}</h2>
          </div>
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm mb-2">Next Rank</p>
            <h2 className="text-2xl font-bold text-blue-400">{nextRank ? nextRank.rank : 'MAX RANK'}</h2>
          </div>
        </div>

        {/* Progress Bar */}
        {nextRank && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-300">Progress to {nextRank.rank}</span>
              <span className="text-sm text-gray-300">{progressPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Remaining BV: <span className="text-white font-bold">${remainingBV.toLocaleString()}</span>
            </p>
          </div>
        )}
      </div>

      {/* Rankings Table */}
      <div className="bg-[#393E46] border border-[#4b5563] rounded-lg overflow-hidden">
        <div className="p-6 border-b border-[#4b5563]">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <FaStar className="text-yellow-500" />
            All Ranking Tiers
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            Achieve higher ranks to unlock bigger bonuses and exclusive benefits
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0f1419]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Total Team Business
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  One Time Bonus
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4b5563]">
              {RANKING_TIERS.map((tier, index) => {
                const achieved = isRankAchieved(tier.rank);
                const isCurrent = tier.rank === currentRank;
                const progress = Math.min((teamBusiness / tier.teamBusiness) * 100, 100);

                return (
                  <tr
                    key={tier.rank}
                    className={`
                      ${isCurrent ? 'bg-blue-500/10 border-l-4 border-l-blue-500' : ''}
                      ${achieved && !isCurrent ? 'bg-green-500/5' : ''}
                      hover:bg-white/5 transition-colors
                    `}
                  >
                    <td className="px-6 py-4">
                      {achieved ? (
                        <FaCheckCircle className="text-green-500 text-xl" />
                      ) : (
                        <FaLock className="text-gray-600 text-xl" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {getRankIcon(tier.rank, index)}
                        <span className={`font-semibold ${isCurrent ? 'text-blue-400' : achieved ? 'text-green-400' : 'text-gray-300'}`}>
                          {tier.rank}
                          {isCurrent && <span className="ml-2 text-xs bg-blue-500 px-2 py-1 rounded-full">Current</span>}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-white">
                      ${tier.teamBusiness.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-yellow-400 font-bold">
                      ${tier.bonus.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${achieved ? 'bg-green-500' : 'bg-blue-500'
                              }`}
                            style={{ width: `${achieved ? 100 : progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 w-12 text-right">
                          {achieved ? '100' : progress.toFixed(0)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Benefits Info */}
      <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <FaTrophy className="text-yellow-500" />
          Rank Benefits
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
          <div className="flex items-start gap-2">
            <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
            <p>Receive a <strong className="text-white">one-time cash bonus</strong> upon achieving each new rank</p>
          </div>
          <div className="flex items-start gap-2">
            <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
            <p>Unlock <strong className="text-white">higher commission rates</strong> on team business volume</p>
          </div>
          <div className="flex items-start gap-2">
            <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
            <p>Gain access to <strong className="text-white">exclusive leadership training</strong> and resources</p>
          </div>
          <div className="flex items-start gap-2">
            <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
            <p>Earn <strong className="text-white">monthly royalties</strong> from company profits</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
