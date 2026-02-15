import React from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import About from '../components/landing/About';
import Services from '../components/landing/Services';
import Differentiators from '../components/landing/Differentiators';
import Footer from '../components/landing/Footer';

function Landing() {
    return (
        <div className="min-h-screen" style={{ backgroundColor: '#f8fafc', color: '#0f172a' }}>
            <Navbar />
            <Hero />
            <About />
            <Services />
            <Differentiators />
            <Footer />
        </div>
    )
}

export default Landing;
