import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Services', href: '#services' },
        { name: 'About', href: '#about' },
        { name: 'Why Us', href: '#differentiators' },
        { name: 'Contact', href: '#contact' },
    ];

    const handleLoginClick = () => {
        navigate(ROUTES.LOGIN);
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`} style={{ backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent' }}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <a href="#" className="flex items-center space-x-2 group">
                    <div className="w-8 h-8 rounded-lg transform rotate-45 group-hover:rotate-0 transition-transform duration-300" style={{ background: 'linear-gradient(to top right, #00ADB5, #14b8a6)' }}></div>
                    <span className="text-2xl font-bold font-sans tracking-tight" style={{ color: '#0f172a' }}>Globe<span style={{ color: '#00ADB5' }}>Rise</span></span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 items-center">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="font-medium transition-colors duration-200"
                            style={{ color: '#64748b' }}
                            onMouseEnter={(e) => e.target.style.color = '#00ADB5'}
                            onMouseLeave={(e) => e.target.style.color = '#64748b'}
                        >
                            {link.name}
                        </a>
                    ))}
                    <button
                        onClick={handleLoginClick}
                        className="px-6 py-2 font-bold rounded-full transition-all duration-300 transform hover:scale-105 text-white"
                        style={{
                            background: 'linear-gradient(to right, #00ADB5, #14b8a6)',
                            boxShadow: '0 0 20px rgba(0, 173, 181, 0.3)'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 0 30px rgba(0, 173, 181, 0.5)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 0 20px rgba(0, 173, 181, 0.3)'}
                    >
                        Login
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none" style={{ color: '#0f172a' }}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full border-b p-6 shadow-xl flex flex-col space-y-4" style={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0' }}>
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="font-medium text-lg transition-colors"
                            style={{ color: '#0f172a' }}
                            onClick={() => setIsOpen(false)}
                            onMouseEnter={(e) => e.target.style.color = '#00ADB5'}
                            onMouseLeave={(e) => e.target.style.color = '#0f172a'}
                        >
                            {link.name}
                        </a>
                    ))}
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            handleLoginClick();
                        }}
                        className="w-full text-center px-6 py-3 font-bold rounded-lg text-white"
                        style={{
                            background: 'linear-gradient(to right, #00ADB5, #14b8a6)',
                        }}
                    >
                        Login
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
