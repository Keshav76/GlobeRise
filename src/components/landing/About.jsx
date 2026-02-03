import React from 'react';
import { Target, Lightbulb } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="py-24 relative overflow-hidden" style={{ backgroundColor: '#222831' }}>
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-50 z-0" style={{ background: 'linear-gradient(to left, #393E46, transparent)' }}></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row gap-16 items-center">

                    {/* Text Content */}
                    <div className="md:w-1/2 space-y-8">
                        <h2 className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: '#00ADB5' }}>Who We Are</h2>
                        <h3 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                            Empowering Innovation, <span style={{ color: '#00ADB5' }}>Globally</span>.
                        </h3>

                        <p className="text-lg leading-relaxed" style={{ color: '#9ca3af' }}>
                            GlobeRise Investments is a forward-driven solutions provider operating across energy, technology, logistics, and emerging sectors.
                        </p>

                        <div className="p-6 border-l-4 rounded-r-lg" style={{ backgroundColor: '#393E46', borderColor: '#f97316' }}>
                            <p className="text-white italic text-lg">
                                "Our mission is to unlock growth opportunities through sustainable innovation, decentralized systems, and global partnerships."
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div className="space-y-2">
                                <h4 className="text-3xl font-bold text-white">10+</h4>
                                <p className="text-sm uppercase tracking-wider" style={{ color: '#9ca3af' }}>Strategic Domains</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-3xl font-bold text-white">Global</h4>
                                <p className="text-sm uppercase tracking-wider" style={{ color: '#9ca3af' }}>Reach & Impact</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual Cards */}
                    <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="p-8 rounded-2xl border transition-colors group" style={{ backgroundColor: '#393E46', borderColor: '#111827' }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(0, 173, 181, 0.5)'}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#111827'}
                        >
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-colors" style={{ backgroundColor: 'rgba(0, 173, 181, 0.1)' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 173, 181, 0.2)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 173, 181, 0.1)'}
                            >
                                <Target className="w-6 h-6" style={{ color: '#00ADB5' }} />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3">Our Mission</h4>
                            <p className="text-sm px-0" style={{ color: '#9ca3af' }}>Use sustainable innovation to deliver scalable solutions that empower communities worldwide.</p>
                        </div>

                        <div className="p-8 rounded-2xl border transition-colors group mt-8 sm:mt-12" style={{ backgroundColor: '#393E46', borderColor: '#111827' }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(20, 184, 166, 0.5)'}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#111827'}
                        >
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-colors" style={{ backgroundColor: 'rgba(20, 184, 166, 0.1)' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(20, 184, 166, 0.2)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(20, 184, 166, 0.1)'}
                            >
                                <Lightbulb className="w-6 h-6" style={{ color: '#14b8a6' }} />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3">Our Vision</h4>
                            <p className="text-sm px-0" style={{ color: '#9ca3af' }}>Advancing global progress through smart, inclusive, impact-driven innovation.</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
