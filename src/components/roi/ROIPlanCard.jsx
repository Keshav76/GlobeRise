import Button from '../common/Button';
import { FaCheckCircle } from 'react-icons/fa';

const ROIPlanCard = ({ plan, onInvest }) => {
    return (
        <div className="bg-[#393E46] rounded-xl border border-[#4b5563] overflow-hidden hover:border-[#00ADB5] transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
            <div className="p-6 text-center border-b border-[#4b5563] bg-gradient-to-b from-[#393E46] to-[#393E46]">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-[#00ADB5] mb-1">
                    {plan.roi}%
                    <span className="text-sm text-gray-400 font-normal ml-1">/ day</span>
                </div>
                <p className="text-gray-400 text-sm">for {plan.duration} days</p>
            </div>

            <div className="p-6">
                <ul className="space-y-3 mb-6">
                    <li className="flex items-center text-gray-300">
                        <FaCheckCircle className="text-[#10b981] mr-2 flex-shrink-0" />
                        <span>Min Investment: ${plan.minAmount}</span>
                    </li>
                    <li className="flex items-center text-gray-300">
                        <FaCheckCircle className="text-[#10b981] mr-2 flex-shrink-0" />
                        <span>Max Investment: ${plan.maxAmount}</span>
                    </li>
                    <li className="flex items-center text-gray-300">
                        <FaCheckCircle className="text-[#10b981] mr-2 flex-shrink-0" />
                        <span>Total Return: {plan.roi * plan.duration}%</span>
                    </li>
                    <li className="flex items-center text-gray-300">
                        <FaCheckCircle className="text-[#10b981] mr-2 flex-shrink-0" />
                        <span>Principal Returned: {plan.principalReturned ? 'Yes' : 'No'}</span>
                    </li>
                </ul>

                <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => onInvest(plan)}
                >
                    Invest Now
                </Button>
            </div>
        </div>
    );
};

export default ROIPlanCard;
