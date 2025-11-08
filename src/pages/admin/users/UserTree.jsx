import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaSearch, FaUser } from 'react-icons/fa';
import { userService } from '../../../services/userService';
import Loading from '../../../components/common/Loading';
import Button from '../../../components/common/Button';

const UserTree = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadUser();
  }, [id]);

  const loadUser = async () => {
    try {
      const data = await userService.getUserById(id);
      setUser(data);
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, this would filter the tree
    console.log('Searching for:', searchQuery);
  };

  if (loading) return <Loading size="lg" />;
  if (!user) return <div className="p-6 text-white">User not found</div>;

  // Mock tree structure - in a real app, this would come from the API
  const renderTreeLevel = (level, nodes) => {
    return (
      <div key={level} className="mb-8">
        <div className="flex justify-center items-start space-x-4">
          {nodes.map((node, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Connection lines */}
              {level > 1 && (
                <div className="w-px h-8 bg-gray-300 border-dashed"></div>
              )}
              {/* Node */}
              <div className="relative">
                <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center ${
                  node.user 
                    ? 'bg-blue-100 border-blue-500' 
                    : 'bg-gray-200 border-gray-400'
                }`}>
                  {node.user ? (
                    <FaUser className="text-2xl text-blue-600" />
                  ) : (
                    <FaUser className="text-2xl text-gray-400" />
                  )}
                </div>
                <div className="mt-2 text-center">
                  <div className="text-sm font-medium text-gray-800">
                    {node.user ? node.user.username : 'No User'}
                  </div>
                </div>
              </div>
              {/* Downward arrows */}
              {level < 3 && (
                <div className="mt-2 flex flex-col items-center">
                  <div className="w-px h-8 bg-gray-300 border-dashed"></div>
                  <div className="text-gray-400 text-xs">↓</div>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Branch connectors */}
        {level < 3 && (
          <div className="flex justify-center">
            <div className="flex space-x-16">
              {nodes.map((_, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-16 h-px bg-gray-300 border-dashed"></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Tree of {user.firstName} {user.lastName}
          </h1>
          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search by username"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-gray-50"
            />
            <Button
              type="submit"
              variant="primary"
              className="px-4 py-2 flex items-center space-x-2"
            >
              <FaSearch />
            </Button>
          </form>
        </div>

        {/* Tree Visualization */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 overflow-x-auto">
          <div className="flex flex-col items-center" style={{ minWidth: '800px' }}>
            {/* Level 1 - Root User */}
            <div className="mb-8">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-blue-100 border-4 border-blue-600 flex items-center justify-center">
                  <FaUser className="text-3xl text-blue-700" />
                </div>
                <div className="mt-2 text-center">
                  <div className="text-base font-semibold text-gray-800">{user.username}</div>
                </div>
              </div>
            </div>

            {/* Downward connection from root - dotted lines with arrows */}
            <div className="mb-8 flex justify-center relative" style={{ height: '60px' }}>
              <div className="absolute left-1/4 transform -translate-x-1/2">
                <div className="relative h-full flex flex-col items-center">
                  <div className="h-12 w-0.5 border-l-2 border-dashed border-gray-400"></div>
                  <div className="text-gray-400 text-xs mt-1">↓</div>
                </div>
              </div>
              <div className="absolute right-1/4 transform translate-x-1/2">
                <div className="relative h-full flex flex-col items-center">
                  <div className="h-12 w-0.5 border-l-2 border-dashed border-gray-400"></div>
                  <div className="text-gray-400 text-xs mt-1">↓</div>
                </div>
              </div>
            </div>

            {/* Level 2 - First Level Downline */}
            <div className="mb-8">
              <div className="flex justify-center items-start" style={{ gap: '180px' }}>
                {[1, 2].map((index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gray-300 border-2 border-gray-500 flex items-center justify-center">
                      <FaUser className="text-xl text-gray-500" />
                    </div>
                    <div className="mt-2 text-center">
                      <div className="text-sm font-medium text-gray-600">No User</div>
                    </div>
                    {/* Downward connections to level 3 */}
                    <div className="mt-6 flex justify-center" style={{ gap: '60px' }}>
                      <div className="relative h-12 flex flex-col items-center">
                        <div className="h-10 w-0.5 border-l-2 border-dashed border-gray-400"></div>
                        <div className="text-gray-400 text-xs mt-1">↓</div>
                      </div>
                      <div className="relative h-12 flex flex-col items-center">
                        <div className="h-10 w-0.5 border-l-2 border-dashed border-gray-400"></div>
                        <div className="text-gray-400 text-xs mt-1">↓</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Level 3 - Second Level Downline */}
            <div>
              <div className="flex justify-center items-start" style={{ gap: '40px' }}>
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gray-300 border-2 border-gray-500 flex items-center justify-center">
                      <FaUser className="text-xl text-gray-500" />
                    </div>
                    <div className="mt-2 text-center">
                      <div className="text-sm font-medium text-gray-600">No User</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTree;

