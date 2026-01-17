import AllUsers from './AllUsers';
import { userService } from '../../../services/userService';

// Wrapper that reuses AllUsers with a custom loader to show users by location/country
const UsersByLocation = () => {
  const loadUsersByLocation = async (filters = {}) => {
    // If country filter is set, use it; otherwise show all users
    // Users can filter by country using the UserFilters component
    return await userService.getAllUsers(filters);
  };

  return <AllUsers loadUsersFn={loadUsersByLocation} title="Users By Location/Country" />;
};

export default UsersByLocation;
