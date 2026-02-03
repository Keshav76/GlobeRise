import React from 'react';
import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer id="contact" className="pt-16 pb-8 border-t" style={{ backgroundColor: '#393E46', borderColor: '#111827' }}>
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Info */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-lg transform rotate-45" style={{ background: 'linear-gradient(to top right, #00ADB5, #14b8a6)' }}></div>
                            <span className="text-2xl font-bold font-sans tracking-tight text-white">Globe<span style={{ color: '#00ADB5' }}>Rise</span></span>
                        </div>
                        <p className="leading-relaxed" style={{ color: '#9ca3af' }}>
                            Forward-driven solutions provider operating across energy, technology, logistics, and emerging sectors.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
                        </div>
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold text-white">Contact Us</h4>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <Mail className="w-5 h-5 mt-1 mr-3" style={{ color: '#00ADB5' }} />
                                <div>
                                    <p className="text-sm text-gray-400">General Inquiry</p>
                                    <a href="mailto:usersupport@globerise.eu" className="text-white hover:text-[#00ADB5] transition-colors">usersupport@globerise.eu</a>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Mail className="w-5 h-5 mt-1 mr-3" style={{ color: '#00ADB5' }} />
                                <div>
                                    <p className="text-sm text-gray-400">Leadership</p>
                                    <a href="mailto:leaders@globerise.eu" className="text-white hover:text-[#00ADB5] transition-colors">leaders@globerise.eu</a>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Phone className="w-5 h-5 mt-1 mr-3" style={{ color: '#00ADB5' }} />
                                <div>
                                    <p className="text-sm text-gray-400">Call / WhatsApp</p>
                                    <a href="tel:+447440051778" className="text-white hover:text-[#00ADB5] transition-colors">+44 7440 051778</a>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <MapPin className="w-5 h-5 mt-1 mr-3" style={{ color: '#00ADB5' }} />
                                <span className="text-white">UK / Global Operations</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold text-white">Company</h4>
                        <ul className="space-y-3">
                            <li><a href="#about" className="text-gray-400 hover:text-[#00ADB5] transition-colors">About Us</a></li>
                            <li><a href="#services" className="text-gray-400 hover:text-[#00ADB5] transition-colors">Services</a></li>
                            <li><a href="#differentiators" className="text-gray-400 hover:text-[#00ADB5] transition-colors">Partners</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#00ADB5] transition-colors">Policies</a></li>
                        </ul>
                    </div>

                    {/* Compliance Badge */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold text-white">Compliance</h4>
                        <div className="p-4 rounded-xl border" style={{ backgroundColor: '#222831', borderColor: '#111827' }}>
                            <div className="flex items-center space-x-2 mb-2">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span className="text-sm font-bold text-white">ESG Aligned</span>
                            </div>
                            <p className="text-xs text-gray-400">
                                Commitment to ethical business practices and sustainable innovation.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Legal Disclaimer */}
                <div className="border-t pt-8 pb-8" style={{ borderColor: '#111827' }}>
                    <div className="p-4 border rounded-lg" style={{ backgroundColor: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                        <h5 className="font-bold text-xs uppercase tracking-wider mb-2" style={{ color: '#f87171' }}>Legal Disclaimer</h5>
                        <p className="text-xs leading-relaxed text-justify" style={{ color: '#6b7280' }}>
                            GlobeRise Investments is a decentralized platform where all services, features, and investment plans operate through blockchain-based smart contracts that may be modified or discontinued without prior notice. Participation in cryptocurrency and digital asset investments carries significant risks, including volatility, regulatory changes, and potential financial loss. GlobeRise does not provide financial, legal, or investment advice, and no assurance of profit or guaranteed returns is given; all decisions are solely the responsibility of the user.
                        </p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm pt-8 border-t" style={{ color: '#6b7280', borderColor: '#111827' }}>
                    <p>&copy; 2025 GlobeRise Investments. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
