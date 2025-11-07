import SilverIcon from '../assets/UserRankings/Silver.png';
import SilverProIcon from '../assets/UserRankings/Silver Pro.png';
import GoldIcon from '../assets/UserRankings/Gold.png';
import GoldProIcon from '../assets/UserRankings/Gold Pro.png';
import PlatinumIcon from '../assets/UserRankings/Platinum.png';

export const mockRankings = [
  {
    id: '1',
    level: 1,
    name: 'Silver',
    bvLeft: 1000,
    bvRight: 1000,
    bonus: 10.00,
    icon: SilverIcon,
    status: 'enabled',
  },
  {
    id: '2',
    level: 2,
    name: 'Silver Pro',
    bvLeft: 500,
    bvRight: 500,
    bonus: 5.00,
    icon: SilverProIcon,
    status: 'enabled',
  },
  {
    id: '3',
    level: 3,
    name: 'Gold',
    bvLeft: 200,
    bvRight: 200,
    bonus: 2.00,
    icon: GoldIcon,
    status: 'enabled',
  },
  {
    id: '4',
    level: 4,
    name: 'Gold Pro',
    bvLeft: 100,
    bvRight: 100,
    bonus: 1.00,
    icon: GoldProIcon,
    status: 'enabled',
  },
  {
    id: '5',
    level: 5,
    name: 'Platinum',
    bvLeft: 50,
    bvRight: 50,
    bonus: 0.50,
    icon: PlatinumIcon,
    status: 'enabled',
  },
];

