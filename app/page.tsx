'use client';

import { useState } from 'react';

export default function LandingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState({
    loading: false,
    error: '',
    success: '',
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: '' });

    try {
      const res = await window.fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus({
        loading: false,
        error: '',
        success: 'Enquiry submitted successfully! We will contact you soon.',
      });
      setShowPopup(true); // Open Glass Popup Modal
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      setStatus({ loading: false, error: errorMessage, success: '' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 relative">
      {/* Interactive Glassmorphism Success Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-[0_8px_32px_0_rgba(0,255,255,0.2)] max-w-md w-full text-center relative overflow-hidden transition-all transform scale-100">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
            <p className="text-slate-300 text-sm mb-6">{status.success}</p>
            <button
              onClick={() => setShowPopup(false)}
              className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition duration-300 shadow-lg shadow-cyan-500/30"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Error Toast Notification */}
      {status.error && (
        <div className="fixed top-6 right-6 z-50 bg-rose-600/90 backdrop-blur-md text-white px-6 py-4 rounded-xl shadow-2xl border border-rose-500/50 flex items-center gap-3">
          <span>⚠️</span>
          <p className="font-medium text-sm">{status.error}</p>
        </div>
      )}

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-slate-950/70 backdrop-blur-lg border-b border-white/10 px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-xl font-bold tracking-wider text-cyan-400">
          ETHIXWEB <span className="text-white">INDIA</span>
        </div>
        <div className="flex gap-6 text-sm font-medium text-slate-300">
          <a href="#services" className="hover:text-cyan-400 transition">Services</a>
          <a href="#about" className="hover:text-cyan-400 transition">About</a>
          <a href="#contact" className="hover:text-cyan-400 transition">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-24 md:py-32 flex flex-col items-center text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
          Building Digital Excellence for <span className="text-cyan-400">Modern Businesses</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl">
          We transform your ideas into powerful, high-performing, and scalable web applications tailored for growth.
        </p>
        <div className="flex gap-4">
          <a
            href="#contact"
            className="px-8 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/25 transform hover:-translate-y-0.5"
          >
            Get Started
          </a>
          <a
            href="#services"
            className="px-8 py-3.5 bg-slate-900/80 backdrop-blur-md hover:bg-slate-800 border border-white/10 text-slate-300 font-semibold rounded-xl transition hover:border-cyan-500/50"
          >
            Our Services
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-900">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Core Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Glass Card 1 */}
          <div className="bg-white/[0.03] backdrop-blur-lg p-8 rounded-2xl border border-white/10 transition-all duration-300 hover:bg-white/[0.07] hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:-translate-y-1.5">
            <div className="text-cyan-400 text-3xl mb-4">💻</div>
            <h3 className="text-xl font-bold mb-2 text-white">Web Development</h3>
            <p className="text-slate-400 text-sm">Custom, lightning-fast web applications built using modern frameworks like Next.js and React.</p>
          </div>

          {/* Glass Card 2 */}
          <div className="bg-white/[0.03] backdrop-blur-lg p-8 rounded-2xl border border-white/10 transition-all duration-300 hover:bg-white/[0.07] hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:-translate-y-1.5">
            <div className="text-cyan-400 text-3xl mb-4">🎨</div>
            <h3 className="text-xl font-bold mb-2 text-white">UI/UX Design</h3>
            <p className="text-slate-400 text-sm">Engaging, user-centric interface designs that deliver exceptional digital experiences.</p>
          </div>

          {/* Glass Card 3 */}
          <div className="bg-white/[0.03] backdrop-blur-lg p-8 rounded-2xl border border-white/10 transition-all duration-300 hover:bg-white/[0.07] hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:-translate-y-1.5">
            <div className="text-cyan-400 text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-2 text-white">Cloud & Performance</h3>
            <p className="text-slate-400 text-sm">Optimized cloud deployment and robust backend infrastructure to ensure 99.9% uptime.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 max-w-5xl mx-auto border-t border-slate-900 text-center">
        <div className="bg-white/[0.02] backdrop-blur-lg p-10 rounded-3xl border border-white/10 transition-all duration-300 hover:bg-white/[0.05] hover:border-cyan-400/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">
          <h2 className="text-3xl font-bold mb-6 text-white">About Ethixweb India</h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            At Ethixweb India, we are a dedicated team of engineers and innovators committed to delivering top-notch software solutions. Whether you are a startup scaling up or an enterprise looking for digital transformation, we turn complex challenges into seamless digital products.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 max-w-xl mx-auto border-t border-slate-900">
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_35px_rgba(34,211,238,0.2)]">
          <h2 className="text-3xl font-bold text-white mb-2 text-center">Get in Touch</h2>
          <p className="text-slate-400 text-center mb-8 text-sm">Fill out the form below and we will get back to you shortly.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition"
                placeholder="+91 9876543210"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Message</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status.loading}
              className="w-full py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/30 disabled:opacity-50"
            >
              {status.loading ? 'Submitting...' : 'Submit Enquiry'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-slate-500 text-sm">
        <p>&copy; 2026 Ethixweb India. All rights reserved.</p>
      </footer>
    </div>
  );
}