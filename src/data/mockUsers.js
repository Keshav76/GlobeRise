// Helper function to generate random country code
const getRandomCountry = () => {
  const countries = [
    { code: 'AF', name: 'Afghanistan' },
    { code: 'CO', name: 'Colombia' },
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'IN', name: 'India' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'BR', name: 'Brazil' },
  ];
  return countries[Math.floor(Math.random() * countries.length)];
};

// Helper function to get country code from name
const getCountryByName = (name) => {
  const countries = {
    'Afghanistan': { code: 'AF', name: 'Afghanistan' },
    'Colombia': { code: 'CO', name: 'Colombia' },
    'United States': { code: 'US', name: 'United States' },
    'United Kingdom': { code: 'GB', name: 'United Kingdom' },
    'India': { code: 'IN', name: 'India' },
    'Canada': { code: 'CA', name: 'Canada' },
    'Australia': { code: 'AU', name: 'Australia' },
    'Germany': { code: 'DE', name: 'Germany' },
    'France': { code: 'FR', name: 'France' },
    'Brazil': { code: 'BR', name: 'Brazil' },
  };
  return countries[name] || { code: 'US', name: 'United States' };
};

// Helper function to get rank based on totalBV
const getRankByBV = (totalBV) => {
  if (totalBV >= 8500000) return 'IMPERATOR';
  if (totalBV >= 7000000) return 'SUPREME LEADER';
  if (totalBV >= 5500000) return 'EMPEROR';
  if (totalBV >= 4000000) return 'KING';
  if (totalBV >= 2500000) return 'CROWN PRINCE';
  if (totalBV >= 1500000) return 'LEGEND';
  if (totalBV >= 1000000) return 'GRANDMASTER';
  if (totalBV >= 500000) return 'TRAILBLAZER';
  if (totalBV >= 350000) return 'STRATEGIST';
  if (totalBV >= 200000) return 'COMMANDER';
  if (totalBV >= 100000) return 'CHAMPION';
  if (totalBV >= 40000) return 'NAVIGATOR';
  if (totalBV >= 15000) return 'CHALLENGER';
  if (totalBV >= 5000) return 'PATHFINDER';
  if (totalBV > 0) return 'EXPLORER';
  return 'NONE';
};

export const mockUsers = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@globerise.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User',
    firstName: 'Admin',
    lastName: 'User',
    mobile: '+1234567890',
    mobileCountryCode: '+1',
    emailVerified: true,
    mobileVerified: true,
    twoFactorEnabled: false,
    kycStatus: 'verified',
    status: 'active',
    userType: 'free',
    createdAt: '2024-01-01T10:00:00',
    balance: 15000.00,
    totalDeposited: 50000.00,
    totalWithdrawn: 35000.00,
    totalInvest: 15000.00,
    totalReferralCommission: 2500.00,
    totalBinaryCommission: 1500.00,
    totalBV: 2500000,
    transactions: 45,
    rank: 'CROWN PRINCE',
    leaderId: null,
    country: 'United States',
    countryCode: 'US',
    address: '',
    city: '',
    state: '',
    zip: '',
  },
  {
    id: '2',
    username: 'okokok222',
    email: 'okokok222@example.com',
    password: 'user123',
    role: 'client',
    name: 'okokoo ookkkk',
    firstName: 'okokoo',
    lastName: 'ookkkk',
    mobile: '+93712345678',
    mobileCountryCode: '+93',
    emailVerified: true,
    mobileVerified: true,
    twoFactorEnabled: false,
    kycStatus: 'verified',
    status: 'active',
    userType: 'free',
    createdAt: '2025-11-01T17:28:00',
    balance: 1250.50,
    totalDeposited: 2500.00,
    totalWithdrawn: 1249.50,
    totalInvest: 1000.00,
    totalReferralCommission: 50.00,
    totalBinaryCommission: 25.00,
    totalBV: 15000,
    transactions: 8,
    rank: 'CHALLENGER',
    leaderId: '1',
    country: 'Afghanistan',
    countryCode: 'AF',
    address: '',
    city: '',
    state: '',
    zip: '',
  },
  {
    id: '3',
    username: 'okokok11',
    email: 'okokok11@example.com',
    password: 'user123',
    role: 'client',
    name: 'okokoo oooo',
    firstName: 'okokoo',
    lastName: 'oooo',
    mobile: '+93712345679',
    mobileCountryCode: '+93',
    emailVerified: true,
    mobileVerified: true,
    twoFactorEnabled: false,
    kycStatus: 'verified',
    status: 'active',
    userType: 'free',
    createdAt: '2025-11-01T17:27:00',
    balance: 3500.75,
    totalDeposited: 8000.00,
    totalWithdrawn: 4499.25,
    totalInvest: 3500.00,
    totalReferralCommission: 150.00,
    totalBinaryCommission: 80.00,
    totalBV: 50000,
    transactions: 12,
    rank: 'NAVIGATOR',
    leaderId: '1',
    country: 'Afghanistan',
    countryCode: 'AF',
    address: '',
    city: '',
    state: '',
    zip: '',
  },
  {
    id: '4',
    username: 'supernigga30',
    email: 'supernigga30@example.com',
    password: 'user123',
    role: 'client',
    name: 'Supernigga30 Supernigga30',
    firstName: 'Supernigga30',
    lastName: 'Supernigga30',
    mobile: '+57123456789',
    mobileCountryCode: '+57',
    emailVerified: false,
    mobileVerified: true,
    twoFactorEnabled: false,
    kycStatus: 'pending',
    status: 'active',
    userType: 'free',
    createdAt: '2025-10-24T16:47:00',
    balance: 0.00,
    totalDeposited: 0.00,
    totalWithdrawn: 0.00,
    totalInvest: 0.00,
    totalReferralCommission: 0.00,
    totalBinaryCommission: 0.00,
    totalBV: 0,
    transactions: 0,
    rank: 'NONE',
    leaderId: null,
    country: 'Colombia',
    countryCode: 'CO',
    address: '',
    city: '',
    state: '',
    zip: '',
  },
  {
    id: '5',
    username: 'john_doe',
    email: 'john@example.com',
    password: 'user123',
    role: 'client',
    name: 'John Doe',
    firstName: 'John',
    lastName: 'Doe',
    mobile: '+1234567890',
    mobileCountryCode: '+1',
    emailVerified: true,
    mobileVerified: true,
    twoFactorEnabled: true,
    kycStatus: 'verified',
    status: 'active',
    userType: 'paid',
    createdAt: '2024-01-15T10:00:00',
    balance: 12500.00,
    totalDeposited: 50000.00,
    totalWithdrawn: 37500.00,
    totalInvest: 25000.00,
    totalReferralCommission: 2500.00,
    totalBinaryCommission: 1500.00,
    totalBV: 5500000,
    transactions: 50,
    rank: 'EMPEROR',
    leaderId: null,
    country: 'United States',
    countryCode: 'US',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip: '10001',
  },
];

// Generate more users for realistic data
for (let i = 6; i <= 1281; i++) {
  const statuses = ['active', 'banned'];
  const emailVerified = Math.random() > 0.02; // 98% verified
  const mobileVerified = Math.random() > 0.001; // 99.9% verified
  const kycStatuses = ['verified', 'pending', 'unverified'];
  const kycStatus = kycStatuses[Math.floor(Math.random() * kycStatuses.length)];
  const userType = Math.random() > 0.5 ? 'free' : 'paid';
  const twoFactorEnabled = Math.random() > 0.7;
  const country = getRandomCountry();
  const firstName = `User${i}`;
  const lastName = `Last${i}`;
  
  // Generate business volume (totalBV) with distribution favoring lower ranks
  const bvRand = Math.random();
  let totalBV;
  if (bvRand < 0.15) {
    // 15% - NONE (0 BV - new users)
    totalBV = 0;
  } else if (bvRand < 0.35) {
    // 20% - EXPLORER (1-5000)
    totalBV = Math.floor(Math.random() * 5000) + 1;
  } else if (bvRand < 0.55) {
    // 20% - PATHFINDER (5000-15000)
    totalBV = Math.floor(5000 + Math.random() * 10000);
  } else if (bvRand < 0.65) {
    // 15% - CHALLENGER (15000-40000)
    totalBV = Math.floor(15000 + Math.random() * 25000);
  } else if (bvRand < 0.75) {
    // 10% - NAVIGATOR (40000-100000)
    totalBV = Math.floor(40000 + Math.random() * 60000);
  } else if (bvRand < 0.85) {
    // 10% - CHAMPION to COMMANDER (100000-350000)
    totalBV = Math.floor(100000 + Math.random() * 250000);
  } else if (bvRand < 0.92) {
    // 7% - STRATEGIST to TRAILBLAZER (350000-1000000)
    totalBV = Math.floor(350000 + Math.random() * 650000);
  } else if (bvRand < 0.97) {
    // 5% - GRANDMASTER to LEGEND (1000000-2500000)
    totalBV = Math.floor(1000000 + Math.random() * 1500000);
  } else if (bvRand < 0.99) {
    // 2% - CROWN PRINCE to KING (2500000-5500000)
    totalBV = Math.floor(2500000 + Math.random() * 3000000);
  } else {
    // 1% - EMPEROR to IMPERATOR (5500000+)
    totalBV = Math.floor(5500000 + Math.random() * 5000000);
  }
  
  // Calculate rank based on totalBV
  const rank = getRankByBV(totalBV);
  
  // Generate balance and deposits proportional to rank
  const balance = Math.random() * (totalBV * 0.1) + (totalBV * 0.05); // 5-15% of BV
  const totalDeposited = totalBV + (Math.random() * totalBV * 0.3); // BV plus some margin
  const totalWithdrawn = Math.random() * (totalDeposited * 0.7);
  const totalInvest = Math.random() * totalDeposited * 0.8;
  const transactions = Math.floor(Math.random() * 50);
  
  // Assign leader (referrer) - 70% have a leader
  const hasLeader = Math.random() > 0.3;
  const leaderId = hasLeader && i > 6 ? String(Math.floor(Math.random() * (i - 1)) + 1) : null;
  
  // Generate a random date within the last year
  const daysAgo = Math.floor(Math.random() * 365);
  const createdAt = new Date();
  createdAt.setDate(createdAt.getDate() - daysAgo);
  
  mockUsers.push({
    id: String(i),
    username: `user_${i}`,
    email: `user${i}@example.com`,
    password: 'user123',
    role: 'client',
    name: `${firstName} ${lastName}`,
    firstName,
    lastName,
    mobile: `+${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    mobileCountryCode: country.code === 'US' ? '+1' : country.code === 'AF' ? '+93' : country.code === 'CO' ? '+57' : '+1',
    emailVerified,
    mobileVerified,
    twoFactorEnabled,
    kycStatus,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    userType,
    createdAt: createdAt.toISOString(),
    balance: parseFloat(balance.toFixed(2)),
    totalDeposited: parseFloat(totalDeposited.toFixed(2)),
    totalWithdrawn: parseFloat(totalWithdrawn.toFixed(2)),
    totalInvest: parseFloat(totalInvest.toFixed(2)),
    totalReferralCommission: parseFloat((Math.random() * 1000).toFixed(2)),
    totalBinaryCommission: parseFloat((Math.random() * 500).toFixed(2)),
    totalBV: Math.floor(totalBV),
    rank,
    leaderId,
    transactions,
    country: country.name,
    countryCode: country.code,
    address: Math.random() > 0.3 ? `${Math.floor(Math.random() * 9999)} Main St` : '',
    city: Math.random() > 0.3 ? `City${i}` : '',
    state: Math.random() > 0.3 ? `State${i}` : '',
    zip: Math.random() > 0.3 ? `${Math.floor(Math.random() * 99999)}` : '',
  });
}

