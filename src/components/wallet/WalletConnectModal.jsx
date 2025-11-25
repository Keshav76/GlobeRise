import { useState } from 'react';
import { useWallet } from '../../contexts/WalletContext';
import { formatWalletAddress } from '../../utils/formatters';
import { FaTimes, FaWallet, FaExclamationTriangle } from 'react-icons/fa';

const WalletConnectModal = ({ isOpen, onClose }) => {
  const {
    connectWallet,
    disconnect,
    isMetamaskInstalled,
    address,
    isConnected,
    isCorrectNetwork,
    switchNetwork,
    networkName,
    expectedChainId,
  } = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const [error, setError] = useState(null);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      await connectWallet();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSwitchNetwork = async () => {
    setIsSwitching(true);
    setError(null);
    try {
      await switchNetwork();
      // After switching, reconnect to update state
      await connectWallet();
    } catch (err) {
      setError(err.message || 'Failed to switch network');
    } finally {
      setIsSwitching(false);
    }
  };

  const handleDisconnect = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      await disconnect();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to disconnect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Connect Wallet</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {isConnected ? (
            <div className="space-y-4">
              {/* Connection Status */}
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Connected</p>
                <p className="font-mono font-semibold text-green-700">
                  {formatWalletAddress(address)}
                </p>
              </div>

              {/* Network Status */}
              {!isCorrectNetwork && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <FaExclamationTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-yellow-800 mb-1">
                        Wrong Network
                      </p>
                      <p className="text-xs text-yellow-700 mb-3">
                        Please switch to {networkName} (Chain ID: {expectedChainId})
                      </p>
                      <button
                        onClick={handleSwitchNetwork}
                        disabled={isSwitching}
                        className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      >
                        {isSwitching ? 'Switching...' : `Switch to ${networkName}`}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {isCorrectNetwork && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Network</p>
                  <p className="font-semibold text-green-700">{networkName}</p>
                </div>
              )}

              {/* Disconnect Button */}
              <button
                onClick={handleDisconnect}
                disabled={isConnecting}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isConnecting ? 'Disconnecting...' : 'Disconnect Wallet'}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Metamask Option */}
              <button
                onClick={handleConnect}
                disabled={isConnecting || !isMetamaskInstalled()}
                className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FaWallet className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">Metamask</p>
                    <p className="text-sm text-gray-500">Connect using Metamask wallet</p>
                  </div>
                </div>
                {!isMetamaskInstalled() && (
                  <span className="text-xs text-red-500">Not installed</span>
                )}
              </button>

              {isConnecting && (
                <div className="text-center py-2">
                  <p className="text-sm text-gray-600">Connecting...</p>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Don't have a wallet?{' '}
                  <a
                    href="https://metamask.io/download/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Install Metamask
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletConnectModal;
