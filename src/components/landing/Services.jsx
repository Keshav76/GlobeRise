import React, { useState, useRef, useEffect } from 'react';
import {
    Activity, Wind, Leaf, Brain,
    Coins, Building, GraduationCap, Truck,
    Boxes, Globe, ArrowUpRight, ChevronLeft, ChevronRight
} from 'lucide-react';

const Services = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const scrollTimeout = useRef(null);
    const isScrolling = useRef(false);

    const services = [
        {
            icon: <Activity className="w-8 h-8" />,
            title: "Healthcare & MedTech",
            description: "Precision diagnostics, virtual health platforms, and AI-powered medical solutions.",
            color: "#ef4444"
        },
        {
            icon: <Wind className="w-8 h-8" />,
            title: "Renewable Energy",
            description: "Solar & wind projects, hybrid energy systems, and clean-tech advisory.",
            color: "#10b981"
        },
        {
            icon: <Leaf className="w-8 h-8" />,
            title: "Carbon Credit & ESG",
            description: "Verified carbon offset initiatives and strategic ESG compliance.",
            color: "#14b8a6"
        },
        {
            icon: <Brain className="w-8 h-8" />,
            title: "AI & Automation",
            description: "Predictive intelligence, process automation, and smart infrastructure.",
            color: "#a855f7"
        },
        {
            icon: <Coins className="w-8 h-8" />,
            title: "Crypto Infrastructure",
            description: "Mining advisory, blockchain node management, and institutional integration.",
            color: "#eab308"
        },
        {
            icon: <Building className="w-8 h-8" />,
            title: "Smart Real Estate",
            description: "Commercial assets, smart city development, and global expansion.",
            color: "#3b82f6"
        },
        {
            icon: <GraduationCap className="w-8 h-8" />,
            title: "EdTech Platforms",
            description: "E-learning ecosystems, upskilling tools, and immersive education.",
            color: "#6366f1"
        },
        {
            icon: <Truck className="w-8 h-8" />,
            title: "Supply Chain",
            description: "Smart warehousing, last-mile optimization, and sustainable transport.",
            color: "#f97316"
        },
        {
            icon: <Boxes className="w-8 h-8" />,
            title: "Web3 Solutions",
            description: "Smart contracts, DeFi economies, and NFT ecosystem advisory.",
            color: "#ec4899"
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: "Global Trade",
            description: "Strategic sourcing, compliance management, and end-to-end trade facilitation.",
            color: "#00ADB5"
        }
    ];

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % services.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
    };

    const getVisibleCards = () => {
        const cards = [];
        for (let i = -1; i <= 1; i++) {
            const index = (currentIndex + i + services.length) % services.length;
            cards.push({ ...services[index], position: i, originalIndex: index });
        }
        return cards;
    };

    const handleWheel = (e) => {
        e.preventDefault();

        // Prevent multiple rapid scrolls
        if (isScrolling.current) return;

        isScrolling.current = true;

        if (e.deltaY > 0) {
            nextSlide();
        } else if (e.deltaY < 0) {
            prevSlide();
        }

        // Reset scrolling flag after animation completes
        setTimeout(() => {
            isScrolling.current = false;
        }, 600); // Slightly longer than transition duration
    };

    return (
        <section id="services" className="py-24 relative" style={{ backgroundColor: '#f1f5f9' }}>
            <div className="container mx-auto px-8 md:px-16 lg:px-24">
                <div className="text-center mb-16 space-y-4">
                    <span className="font-bold tracking-wider uppercase text-sm" style={{ color: '#00ADB5' }}>Our Expertise</span>
                    <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#0f172a' }}>Core <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #00ADB5, #14b8a6)' }}>Capabilities</span></h2>
                    <p className="max-w-2xl mx-auto" style={{ color: '#64748b' }}>
                        Delivering practical, future-focused services across 10 strategic domains to drive global innovation.
                    </p>
                </div>

                {/* Carousel for Desktop */}
                <div
                    className="hidden lg:block relative"
                    onWheel={handleWheel}
                    style={{ cursor: 'grab' }}
                >
                    <div className="flex items-center justify-center gap-8 px-20">
                        {getVisibleCards().map((service, idx) => {
                            const isCentered = service.position === 0;
                            const isHovered = hoveredIndex === service.originalIndex;

                            return (
                                <div
                                    key={`${service.originalIndex}-${idx}`}
                                    className="relative transition-all duration-500 ease-out"
                                    style={{
                                        flex: isCentered ? '0 0 400px' : '0 0 280px',
                                        opacity: isCentered ? 1 : 0.5,
                                        transform: isCentered ? 'scale(1)' : 'scale(0.85)',
                                        zIndex: isCentered ? 10 : 1
                                    }}
                                    onMouseEnter={() => setHoveredIndex(service.originalIndex)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <div
                                        className="p-8 border rounded-2xl transition-all duration-300 h-full"
                                        style={{
                                            backgroundColor: '#ffffff',
                                            borderColor: (isCentered || isHovered) ? 'rgba(0, 173, 181, 0.4)' : '#e2e8f0',
                                            boxShadow: (isCentered || isHovered) ? '0 10px 30px -10px rgba(0, 173, 181, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.06)'
                                        }}
                                    >
                                        <div className="mb-6 p-4 rounded-xl w-fit transition-colors duration-300" style={{ backgroundColor: (isCentered || isHovered) ? '#f1f5f9' : '#f8fafc' }}>
                                            <div className="transition-transform duration-300" style={{ color: service.color, transform: (isCentered || isHovered) ? 'scale(1.1)' : 'scale(1)' }}>
                                                {service.icon}
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold mb-3 transition-colors" style={{ color: (isCentered || isHovered) ? '#00ADB5' : '#0f172a' }}>
                                            {service.title}
                                        </h3>

                                        <p className="text-sm leading-relaxed mb-6" style={{ color: '#64748b' }}>
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all"
                        style={{ backgroundColor: '#ffffff', color: '#00ADB5', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#00ADB5'; e.currentTarget.style.color = '#ffffff'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.color = '#00ADB5'; }}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all"
                        style={{ backgroundColor: '#ffffff', color: '#00ADB5', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#00ADB5'; e.currentTarget.style.color = '#ffffff'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.color = '#00ADB5'; }}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-8">
                        {services.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className="w-2 h-2 rounded-full transition-all"
                                style={{
                                    backgroundColor: currentIndex === index ? '#00ADB5' : '#cbd5e1',
                                    width: currentIndex === index ? '24px' : '8px'
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Grid for Mobile/Tablet */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:hidden">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative p-8 border rounded-2xl transition-all duration-300"
                            style={{
                                backgroundColor: '#ffffff',
                                borderColor: hoveredIndex === index ? 'rgba(0, 173, 181, 0.4)' : '#e2e8f0',
                                transform: hoveredIndex === index ? 'translateY(-8px)' : 'translateY(0)',
                                boxShadow: hoveredIndex === index ? '0 10px 30px -10px rgba(0, 173, 181, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.06)'
                            }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="mb-6 p-4 rounded-xl w-fit transition-colors duration-300" style={{ backgroundColor: hoveredIndex === index ? '#f1f5f9' : '#f8fafc' }}>
                                <div className="transition-transform duration-300" style={{ color: service.color, transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)' }}>
                                    {service.icon}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-3 transition-colors" style={{ color: hoveredIndex === index ? '#00ADB5' : '#0f172a' }}>
                                {service.title}
                            </h3>

                            <p className="text-sm leading-relaxed mb-6" style={{ color: '#64748b' }}>
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
