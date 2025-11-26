import api from './api';

export const twoFactorService = {
  /**
   * Setup 2FA - Generate secret and QR code
   * @returns {Promise} { secret, qrCode, backupCodes }
   */
  async setup() {
    const response = await api.post('/2fa/setup');
    return response.data.data;
  },

  /**
   * Enable 2FA after verifying a token
   * @param {string} token - 6-digit code from authenticator app
   * @returns {Promise}
   */
  async enable(token) {
    const response = await api.post('/2fa/enable', { token });
    return response.data;
  },

  /**
   * Disable 2FA
   * @param {string} password - User's password
   * @param {string} token - 6-digit code from authenticator app
   * @returns {Promise}
   */
  async disable(password, token) {
    const response = await api.post('/2fa/disable', { password, token });
    return response.data;
  },

  /**
   * Verify 2FA code during login flow
   * @param {string} tempToken - Temporary token from login
   * @param {string} code - 6-digit code from authenticator app
   * @returns {Promise} { user, token, refreshToken }
   */
  async verifyLogin(tempToken, code) {
    const response = await api.post('/2fa/verify-login', { tempToken, code });
    return response.data.data;
  },

  /**
   * Regenerate backup codes
   * @returns {Promise} { backupCodes }
   */
  async regenerateBackupCodes() {
    const response = await api.post('/2fa/backup-codes/regenerate');
    return response.data.data;
  },
};
