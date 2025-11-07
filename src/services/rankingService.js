import { delay } from '../utils/helpers';
import { STORAGE_KEYS } from '../utils/constants';
import { mockRankings } from '../data/mockRankings';

// Initialize rankings in localStorage if not exists
if (!localStorage.getItem(STORAGE_KEYS.RANKINGS)) {
  localStorage.setItem(STORAGE_KEYS.RANKINGS, JSON.stringify(mockRankings));
}

const getRankings = () => {
  const rankings = localStorage.getItem(STORAGE_KEYS.RANKINGS);
  return rankings ? JSON.parse(rankings) : [];
};

const saveRankings = (rankings) => {
  localStorage.setItem(STORAGE_KEYS.RANKINGS, JSON.stringify(rankings));
};

export const rankingService = {
  async getAllRankings() {
    await delay(500);
    return getRankings();
  },

  async getRankingById(id) {
    await delay(300);
    const rankings = getRankings();
    return rankings.find(r => r.id === id);
  },

  async createRanking(rankingData) {
    await delay(800);
    const rankings = getRankings();
    const newRanking = {
      id: String(rankings.length + 1),
      ...rankingData,
      status: rankingData.status || 'enabled',
    };
    
    rankings.push(newRanking);
    saveRankings(rankings);
    return newRanking;
  },

  async updateRanking(id, updates) {
    await delay(800);
    const rankings = getRankings();
    const index = rankings.findIndex(r => r.id === id);
    
    if (index === -1) {
      throw new Error('Ranking not found');
    }
    
    rankings[index] = { ...rankings[index], ...updates };
    saveRankings(rankings);
    return rankings[index];
  },

  async deleteRanking(id) {
    await delay(800);
    const rankings = getRankings();
    const filtered = rankings.filter(r => r.id !== id);
    saveRankings(filtered);
    return { message: 'Ranking deleted successfully' };
  },
};

