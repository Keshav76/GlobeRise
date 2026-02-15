import React from 'react';
import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer id="contact" className="pt-16 pb-8 border-t" style={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0' }}>
            <div className="container mx-auto px-8 md:px-16 lg:px-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Info */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-lg transform rotate-45" style={{ background: 'linear-gradient(to top right, #00ADB5, #14b8a6)' }}></div>
                            <span className="text-2xl font-bold font-sans tracking-tight" style={{ color: '#0f172a' }}>Globe<span style={{ color: '#00ADB5' }}>Rise</span></span>
                        </div>
                        <p className="leading-relaxed" style={{ color: '#64748b' }}>
                            Forward-driven solutions provider operating across energy, technology, logistics, and emerging sectors.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" style={{ color: '#94a3b8' }} onMouseEnter={(e) => e.target.style.color = '#0f172a'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'} className="transition-colors"><Twitter size={20} /></a>
                            <a href="#" style={{ color: '#94a3b8' }} onMouseEnter={(e) => e.target.style.color = '#0f172a'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'} className="transition-colors"><Linkedin size={20} /></a>
                            <a href="#" style={{ color: '#94a3b8' }} onMouseEnter={(e) => e.target.style.color = '#0f172a'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'} className="transition-colors"><Facebook size={20} /></a>
                        </div>
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold" style={{ color: '#0f172a' }}>Contact Us</h4>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <Mail className="w-5 h-5 mt-1 mr-3" style={{ color: '#00ADB5' }} />
                                <div>
                                    <p className="text-sm" style={{ color: '#94a3b8' }}>General Inquiry</p>
                                    <a href="mailto:usersupport@globerise.eu" className="transition-colors" style={{ color: '#0f172a' }}
                                        onMouseEnter={(e) => e.target.style.color = '#00ADB5'}
                                        onMouseLeave={(e) => e.target.style.color = '#0f172a'}
                                    >usersupport@globerise.eu</a>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Mail className="w-5 h-5 mt-1 mr-3" style={{ color: '#00ADB5' }} />
                                <div>
                                    <p className="text-sm" style={{ color: '#94a3b8' }}>Leadership</p>
                                    <a href="mailto:leaders@globerise.eu" className="transition-colors" style={{ color: '#0f172a' }}
                                        onMouseEnter={(e) => e.target.style.color = '#00ADB5'}
                                        onMouseLeave={(e) => e.target.style.color = '#0f172a'}
                                    >leaders@globerise.eu</a>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Phone className="w-5 h-5 mt-1 mr-3" style={{ color: '#00ADB5' }} />
                                <div>
                                    <p className="text-sm" style={{ color: '#94a3b8' }}>Call / WhatsApp</p>
                                    <a href="tel:+447440051778" className="transition-colors" style={{ color: '#0f172a' }}
                                        onMouseEnter={(e) => e.target.style.color = '#00ADB5'}
                                        onMouseLeave={(e) => e.target.style.color = '#0f172a'}
                                    >+44 7440 051778</a>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <MapPin className="w-5 h-5 mt-1 mr-3" style={{ color: '#00ADB5' }} />
                                <span style={{ color: '#0f172a' }}>UK / Global Operations</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold" style={{ color: '#0f172a' }}>Company</h4>
                        <ul className="space-y-3">
                            <li><a href="#about" className="transition-colors" style={{ color: '#64748b' }} onMouseEnter={(e) => e.target.style.color = '#00ADB5'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>About Us</a></li>
                            <li><a href="#services" className="transition-colors" style={{ color: '#64748b' }} onMouseEnter={(e) => e.target.style.color = '#00ADB5'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>Services</a></li>
                            <li><a href="#differentiators" className="transition-colors" style={{ color: '#64748b' }} onMouseEnter={(e) => e.target.style.color = '#00ADB5'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>Partners</a></li>
                            <li><a href="#" className="transition-colors" style={{ color: '#64748b' }} onMouseEnter={(e) => e.target.style.color = '#00ADB5'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>Policies</a></li>
                        </ul>
                    </div>

                    {/* Compliance Badge */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold" style={{ color: '#0f172a' }}>Compliance</h4>
                        <div className="p-4 rounded-xl border" style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}>
                            <div className="flex items-center space-x-2 mb-2">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span className="text-sm font-bold" style={{ color: '#0f172a' }}>ESG Aligned</span>
                            </div>
                            <p className="text-xs" style={{ color: '#64748b' }}>
                                Commitment to ethical business practices and sustainable innovation.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Legal Disclaimer */}
                <div className="border-t pt-8 pb-8" style={{ borderColor: '#e2e8f0' }}>
                    <div className="p-4 border rounded-lg" style={{ backgroundColor: '#fef2f2', borderColor: '#fecaca' }}>
                        <h5 className="font-bold text-xs uppercase tracking-wider mb-2" style={{ color: '#dc2626' }}>Legal Disclaimer</h5>
                        <p className="text-xs leading-relaxed text-justify" style={{ color: '#6b7280' }}>
                            GlobeRise Investments is a decentralized platform where all services, features, and investment plans operate through blockchain-based smart contracts that may be modified or discontinued without prior notice. Participation in cryptocurrency and digital asset investments carries significant risks, including volatility, regulatory changes, and potential financial loss. GlobeRise does not provide financial, legal, or investment advice, and no assurance of profit or guaranteed returns is given; all decisions are solely the responsibility of the user.
                        </p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm pt-8 border-t" style={{ color: '#94a3b8', borderColor: '#e2e8f0' }}>
                    <p>&copy; 2025 GlobeRise Investments. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="transition-colors" style={{ color: '#94a3b8' }} onMouseEnter={(e) => e.target.style.color = '#0f172a'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>Privacy Policy</a>
                        <a href="#" className="transition-colors" style={{ color: '#94a3b8' }} onMouseEnter={(e) => e.target.style.color = '#0f172a'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
