import React from 'react';
import { ArrowRight, Globe } from 'lucide-react';
import heroBg from '../../assets/hero_background.png';

const Hero = () => {
    return (
        <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden" style={{ backgroundColor: '#222831' }}>
            {/* Background with overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${heroBg})` }}></div>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #222831, rgba(34, 40, 49, 0.9), #222831)' }}></div>

                {/* Animated grid overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div className="text-left space-y-8">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border" style={{ backgroundColor: '#393E46', borderColor: 'rgba(0, 173, 181, 0.3)' }}>
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#00ADB5' }}></span>
                        <span className="text-sm font-medium tracking-wide" style={{ color: '#00ADB5' }}>TRANSFORMING INDUSTRIES</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                        <span className="text-white">Impact-Driven</span>
                        <br />
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #00ADB5, #14b8a6, #f97316)' }}>
                            Global Innovation
                        </span>
                    </h1>

                    <p className="text-xl max-w-lg leading-relaxed" style={{ color: '#9ca3af' }}>
                        One Platform. Infinite Possibilities. Operating across energy, technology, logistics, and emerging sectors to unlock sustainable growth.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <a href="#services" className="group relative px-8 py-4 font-bold rounded-lg overflow-hidden transition-all" style={{ backgroundColor: '#f3f4f6', color: '#222831' }}
                            onMouseEnter={(e) => e.target.style.boxShadow = '0 0 30px rgba(255,255,255,0.3)'}
                            onMouseLeave={(e) => e.target.style.boxShadow = 'none'}
                        >
                            <span className="relative z-10 flex items-center">
                                Explore Our Services
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </a>

                        <a href="#contact" className="px-8 py-4 border font-medium rounded-lg transition-colors flex items-center justify-center"
                            style={{ borderColor: 'rgba(0, 173, 181, 0.5)', color: '#00ADB5' }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0, 173, 181, 0.1)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                            Partner With Us
                        </a>
                    </div>
                </div>

                {/* Visual Element / 3D Abstract representation */}
                <div className="hidden md:block relative">
                    <div className="relative w-full aspect-square max-w-lg mx-auto">
                        {/* Abstract globe circles */}
                        <div className="absolute inset-0 border rounded-full animate-[spin_10s_linear_infinite]" style={{ borderColor: 'rgba(0, 173, 181, 0.2)' }}></div>
                        <div className="absolute inset-4 border rounded-full animate-[spin_15s_linear_infinite_reverse]" style={{ borderColor: 'rgba(20, 184, 166, 0.2)' }}></div>
                        <div className="absolute inset-12 border rounded-full animate-[spin_20s_linear_infinite]" style={{ borderColor: 'rgba(249, 115, 22, 0.1)' }}></div>

                        {/* Center Glow */}
                        <div className="absolute inset-0 rounded-full blur-3xl animate-pulse" style={{ background: 'linear-gradient(to top right, rgba(0, 173, 181, 0.2), rgba(20, 184, 166, 0.2))' }}></div>

                        {/* Floating cards */}
                        <div className="absolute top-1/4 -right-4 p-4 border rounded-xl shadow-xl backdrop-blur-sm animate-[bounce_3s_infinite]" style={{ backgroundColor: '#393E46', borderColor: 'rgba(0, 173, 181, 0.3)' }}>
                            <Globe className="w-8 h-8 mb-2" style={{ color: '#00ADB5' }} />
                            <div className="text-xs text-gray-400">Global Reach</div>
                            <div className="text-lg font-bold text-white">4 Continents</div>
                        </div>

                        <div className="absolute bottom-1/4 -left-4 p-4 border rounded-xl shadow-xl backdrop-blur-sm animate-[bounce_4s_infinite] delay-700" style={{ backgroundColor: '#393E46', borderColor: 'rgba(249, 115, 22, 0.3)' }}>
                            <div className="w-8 h-8 rounded-full mb-2" style={{ background: 'linear-gradient(to right, #f97316, #ef4444)' }}></div>
                            <div className="text-xs text-gray-400">Sustainable Growth</div>
                            <div className="text-lg font-bold text-white">+25% YOY</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
