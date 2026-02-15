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
            <div className="absolute inset-0 opacity-50 z-0" style={{ background: 'linear-gradient(to bottom, #f8fafc, #f1f5f9)' }}></div>

            <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-8 text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: '#0f172a' }}>
                            Why Partners <span style={{ color: '#00ADB5' }}>Choose Us</span>
                        </h2>

                        <p className="text-lg leading-relaxed max-w-3xl mx-auto" style={{ color: '#64748b' }}>
                            GlobeRise brings more than just service—we bring reliability, scalability, and impact. Our unique blend of technical expertise and sustainable principles makes us the preferred partner for forward-thinking enterprises.
                        </p>

                        <div className="pt-4">
                            <a href="#contact" className="inline-block px-8 py-4 font-bold rounded-lg transition-colors shadow-lg text-white"
                                style={{
                                    backgroundColor: '#00ADB5',
                                    boxShadow: '0 10px 15px -3px rgba(0, 173, 181, 0.2)'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#0d9488'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#00ADB5'}
                            >
                                Start Your Journey
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {features.map((feature, index) => (
                            <div key={index} className="flex flex-col items-center text-center p-6 rounded-xl border transition-colors"
                                style={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)' }}
                                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#cbd5e1'}
                                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                            >
                                <div className="mb-4 p-2 rounded-lg" style={{ backgroundColor: '#f1f5f9' }}>
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold mb-2" style={{ color: '#0f172a' }}>{feature.title}</h3>
                                    <p className="text-sm" style={{ color: '#64748b' }}>{feature.description}</p>
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
