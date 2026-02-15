import React from 'react';
import { Target, Lightbulb } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="py-24 relative overflow-hidden" style={{ backgroundColor: '#f8fafc' }}>
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-50 z-0" style={{ background: 'linear-gradient(to left, #f1f5f9, transparent)' }}></div>

            <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* Text Content */}
                    <div className="lg:w-2/3 space-y-8">
                        <h2 className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: '#00ADB5' }}>Who We Are</h2>
                        <h3 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: '#0f172a' }}>
                            Empowering Innovation, <span style={{ color: '#00ADB5' }}>Globally</span>.
                        </h3>

                        <p className="text-lg leading-relaxed" style={{ color: '#64748b' }}>
                            GlobeRise Investments is a forward-driven solutions provider operating across energy, technology, logistics, and emerging sectors.
                        </p>

                        <div className="p-6 border-l-4 rounded-r-lg" style={{ backgroundColor: '#ffffff', borderColor: '#f97316', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)' }}>
                            <p className="italic text-lg" style={{ color: '#0f172a' }}>
                                "Our mission is to unlock growth opportunities through sustainable innovation, decentralized systems, and global partnerships."
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div className="space-y-2">
                                <h4 className="text-3xl font-bold" style={{ color: '#0f172a' }}>10+</h4>
                                <p className="text-sm uppercase tracking-wider" style={{ color: '#64748b' }}>Strategic Domains</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-3xl font-bold" style={{ color: '#0f172a' }}>Global</h4>
                                <p className="text-sm uppercase tracking-wider" style={{ color: '#64748b' }}>Reach & Impact</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual Cards */}
                    <div className="lg:w-1/3 space-y-6">
                        <div className="p-8 rounded-2xl border transition-colors group" style={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)' }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(0, 173, 181, 0.5)'}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                        >
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-colors" style={{ backgroundColor: 'rgba(0, 173, 181, 0.1)' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 173, 181, 0.15)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 173, 181, 0.1)'}
                            >
                                <Target className="w-6 h-6" style={{ color: '#00ADB5' }} />
                            </div>
                            <h4 className="text-xl font-bold mb-3" style={{ color: '#0f172a' }}>Our Mission</h4>
                            <p className="text-sm px-0" style={{ color: '#64748b' }}>Use sustainable innovation to deliver scalable solutions that empower communities worldwide.</p>
                        </div>

                        <div className="p-8 rounded-2xl border transition-colors group" style={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)' }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(20, 184, 166, 0.5)'}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                        >
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-colors" style={{ backgroundColor: 'rgba(20, 184, 166, 0.1)' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(20, 184, 166, 0.15)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(20, 184, 166, 0.1)'}
                            >
                                <Lightbulb className="w-6 h-6" style={{ color: '#14b8a6' }} />
                            </div>
                            <h4 className="text-xl font-bold mb-3" style={{ color: '#0f172a' }}>Our Vision</h4>
                            <p className="text-sm px-0" style={{ color: '#64748b' }}>Advancing global progress through smart, inclusive, impact-driven innovation.</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
