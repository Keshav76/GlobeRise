// Wallet Type Constants
export const WALLET_TYPES = {
    FIAT: 'FIAT',
    DEPOSIT: 'DEPOSIT',
    STAKING: 'STAKING',
    REWARD: 'REWARD',
    WITHDRAWAL: 'WITHDRAWAL'
};

// Wallet Display Names (aliased as WALLET_LABELS for component compatibility)
export const WALLET_LABELS = {
    FIAT: 'Fiat Wallet',
    DEPOSIT: 'Deposit Wallet',
    STAKING: 'Staking Wallet',
    REWARD: 'Reward Wallet',
    WITHDRAWAL: 'Withdrawal Wallet'
};

// Keep WALLET_NAMES as alias for backward compatibility
export const WALLET_NAMES = WALLET_LABELS;

// Wallet Descriptions
export const WALLET_DESCRIPTIONS = {
    FIAT: 'Gateway for deposits - Transfer to Deposit or Staking',
    DEPOSIT: 'Active MLM packages generating ROI',
    STAKING: 'Fixed-term locked deposits',
    REWARD: 'All earnings - Transfer to Deposit (reinvest) or Withdrawal (cashout)',
    WITHDRAWAL: 'Ready for cashout - Request payout on Mondays'
};

// Allowed Transfer Paths
export const ALLOWED_TRANSFERS = {
    FIAT: ['DEPOSIT', 'STAKING'],
    REWARD: ['DEPOSIT', 'WITHDRAWAL'],
    DEPOSIT: [],  // Locked
    STAKING: [],  // Locked
    WITHDRAWAL: []  // Locked
};

// Wallet Colors
export const WALLET_COLORS = {
    FIAT: 'green',
    DEPOSIT: 'blue',
    STAKING: 'purple',
    REWARD: 'yellow',
    WITHDRAWAL: 'red'
};
