import React from 'react';
import { CheckCircle2, ShieldCheck, BarChart3, Globe2, Leaf, Layers } from 'lucide-react';

const Differentiators = () => {
    const features = [
        {
            icon: <Layers className="w-6 h-6" style={{ color: '#00ADB5' }} />,
            title: "Multisector Expertise",
            description: "Deep knowledge across energy, tech, logistics, and finance."
        },
        {
            icon: <Leaf className="w-6 h-6" style={{ color: '#14b8a6' }} />,
            title: "Sustainability-First",
            description: "Eco-centric approach driving green growth and long-term impact."
        },
        {
            icon: <ShieldCheck className="w-6 h-6" style={{ color: '#f97316' }} />,
            title: "Tailored Solutions",
            description: "Custom strategies designed for specific market needs and goals."
        },
        {
            icon: <CheckCircle2 className="w-6 h-6" style={{ color: '#3b82f6' }} />,
            title: "Trusted Partnerships",
            description: "Building long-term value through transparency and reliability."
        },
        {
            icon: <Globe2 className="w-6 h-6" style={{ color: '#a855f7' }} />,
            title: "Global Access",
            description: "Connecting local projects to international markets and resources."
        },
        {
            icon: <BarChart3 className="w-6 h-6" style={{ color: '#ec4899' }} />,
            title: "Data-Driven Growth",
            description: "Leveraging analytics and AI for smarter decision making."
        }
    ];

    return (
        <section id="differentiators" className="py-24 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 opacity-50 z-0" style={{ background: 'linear-gradient(to bottom, #222831, #393E46)' }}></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    <div className="lg:w-1/2 space-y-8">
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            Why Partners <br />
                            <span style={{ color: '#00ADB5' }}>Choose Us</span>
                        </h2>

                        <p className="text-lg leading-relaxed" style={{ color: '#9ca3af' }}>
                            GlobeRise brings more than just service—we bring reliability, scalability, and impact. Our unique blend of technical expertise and sustainable principles makes us the preferred partner for forward-thinking enterprises.
                        </p>

                        <div className="pt-8">
                            <a href="#contact" className="px-8 py-4 font-bold rounded-lg transition-colors shadow-lg"
                                style={{
                                    backgroundColor: '#00ADB5',
                                    color: '#222831',
                                    boxShadow: '0 10px 15px -3px rgba(0, 173, 181, 0.2)'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#ffffff'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#00ADB5'}
                            >
                                Start Your Journey
                            </a>
                        </div>
                    </div>

                    <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-start p-6 rounded-xl border transition-colors"
                                style={{ backgroundColor: '#222831', borderColor: '#111827' }}
                                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#4b5563'}
                                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#111827'}
                            >
                                <div className="mr-4 mt-1 p-2 rounded-lg" style={{ backgroundColor: '#1f2937' }}>
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                                    <p className="text-sm" style={{ color: '#9ca3af' }}>{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Differentiators;
