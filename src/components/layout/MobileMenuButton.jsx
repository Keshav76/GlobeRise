import { FaBars, FaTimes } from 'react-icons/fa';

const MobileMenuButton = ({ isOpen, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-300 hover:bg-[#393E46] transition-colors touch-target"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
        >
            {isOpen ? (
                <FaTimes className="w-5 h-5" />
            ) : (
                <FaBars className="w-5 h-5" />
            )}
        </button>
    );
};

export default MobileMenuButton;
