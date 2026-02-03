import React, { useState } from 'react';
import {
    Activity, Wind, Leaf, Brain,
    Coins, Building, GraduationCap, Truck,
    Boxes, Globe, ArrowUpRight
} from 'lucide-react';

const Services = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

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
            color: "#facc15"
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

    return (
        <section id="services" className="py-24 relative" style={{ backgroundColor: '#222831' }}>
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <span className="font-bold tracking-wider uppercase text-sm" style={{ color: '#00ADB5' }}>Our Expertise</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white">Core <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #00ADB5, #14b8a6)' }}>Capabilities</span></h2>
                    <p className="max-w-2xl mx-auto" style={{ color: '#9ca3af' }}>
                        Delivering practical, future-focused services across 10 strategic domains to drive global innovation.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative p-8 border rounded-2xl transition-all duration-300"
                            style={{
                                backgroundColor: '#393E46',
                                borderColor: hoveredIndex === index ? 'rgba(0, 173, 181, 0.5)' : '#111827',
                                transform: hoveredIndex === index ? 'translateY(-8px)' : 'translateY(0)',
                                boxShadow: hoveredIndex === index ? '0 10px 30px -10px rgba(0, 173, 181, 0.2)' : 'none'
                            }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="mb-6 p-4 rounded-xl w-fit transition-colors duration-300" style={{ backgroundColor: hoveredIndex === index ? '#222831' : 'rgba(17, 24, 39, 0.5)' }}>
                                <div className="transition-transform duration-300" style={{ color: service.color, transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)' }}>
                                    {service.icon}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-3 transition-colors" style={{ color: hoveredIndex === index ? '#00ADB5' : '#ffffff' }}>
                                {service.title}
                            </h3>

                            <p className="text-sm leading-relaxed mb-6" style={{ color: '#9ca3af' }}>
                                {service.description}
                            </p>

                            <div className="flex items-center text-sm font-medium text-white transition-opacity duration-300" style={{ opacity: hoveredIndex === index ? 1 : 0 }}>
                                <span>Learn more</span>
                                <ArrowUpRight className="w-4 h-4 ml-1" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
