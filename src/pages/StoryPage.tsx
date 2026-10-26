import React, { useState } from 'react';
import { Sparkles, MapPin, Clock, Mail, Phone, Send, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { useToast } from '../components/common/ToastContainer';

export const StoryPage: React.FC = () => {
  const { showToast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: 'Wholesale & Private Events',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      showToast('Missing Fields', 'Please complete all required fields', 'warning');
      return;
    }
    setSubmitted(true);
    showToast('Message Dispatched', 'Our concierge will contact you within 24 hours', 'success');
  };

  const timeline = [
    {
      year: '2020',
      title: 'The Volcanic Vision',
      desc: 'Founded on the philosophy that coffee should be experienced like fine horology and modernist architecture.',
    },
    {
      year: '2022',
      title: 'Direct-Trade Alliances',
      desc: 'Established private agreements with 14 micro-lot estates in Huila, Yirgacheffe, and Cerrado Mineiro, paying 250% over Fair Trade minimums.',
    },
    {
      year: '2024',
      title: 'Bespoke Lever Alchemy',
      desc: 'Commissioned custom Italian spring-lever machines with PID thermal accuracy to pull unmatched 9.2 bar velvety crema.',
    },
    {
      year: 'Today',
      title: 'The Digital Sanctuary',
      desc: 'Merging real-time 3D spatial coffee exploration with ultra-luxurious brick-and-mortar sanctuaries.',
    },
  ];

  return (
    <div className="pt-28 pb-24 min-h-screen relative overflow-hidden">
      {/* Background Parallax Word */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 parallax-bg-word text-[140px] sm:text-[220px] md:text-[320px] opacity-[0.025] pointer-events-none select-none">
        HERITAGE
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-caramel/20 border border-caramel/40 text-xs font-bold text-caramel tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Manifesto</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream">
            Architecture of the <br />
            <span className="gold-gradient-text italic font-normal">Perfect Extraction</span>
          </h1>
          <p className="text-xs sm:text-sm text-cream/70 font-sans leading-relaxed">
            We don’t make commercial fuel. We craft meditative moments suspended in ceramic and steam.
          </p>
        </div>

        {/* Feature Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-24">
          <div className="lg:col-span-6 space-y-5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cream">
              Born from Obsession, <br />
              Refined by Geometry.
            </h2>
            <p className="text-xs sm:text-sm text-cream/75 leading-relaxed">
              [CODE WITH GANDHI] began as an underground roastery project in a SoHo basement. Frustrated by over-roasted commercial beans and clinical coffee shops, we set out to build a sanctuary: dark mocha woodwork, brass lever machines, and coffees sourced from single steep volcanic ridges where clouds drift through the branches.
            </p>
            <p className="text-xs sm:text-sm text-cream/75 leading-relaxed">
              Every bean we roast has a pedigree. We record roast curves to tenths of a second, tracking exothermic development to liberate crisp jasmine florals, stone fruit sweetness, and dense cocoa solids.
            </p>

            <div className="pt-2 flex items-center gap-6 text-xs text-cream/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-caramel" />
                <span>100% Direct-Trade</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-caramel" />
                <span>Zero Synthetic Additives</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass-card border border-caramel/30 shadow-luxury">
              <img
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=80"
                alt="Roastery Lever Extraction"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-cream">
                <p className="font-serif text-sm font-bold">Custom Spring-Lever Calibration</p>
                <p className="text-[11px] text-caramel mt-0.5">SoHo Flagship Roast Lab</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-24">
          <div className="text-center max-w-md mx-auto mb-12 space-y-1">
            <h3 className="font-serif text-2xl font-bold text-cream">The Journey So Far</h3>
            <p className="text-xs text-cream/70">From a single 2kg drum to an international standard.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {timeline.map((item) => (
              <div
                key={item.year}
                className="glass-card rounded-3xl p-6 border border-cream/10 space-y-3 relative overflow-hidden"
              >
                <span className="font-serif text-3xl font-extrabold text-caramel/40 block">
                  {item.year}
                </span>
                <h4 className="font-serif text-base font-bold text-cream">{item.title}</h4>
                <p className="text-xs text-cream/70 leading-relaxed font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form & Sanctuaries Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-caramel uppercase tracking-widest">
                Get in Touch
              </span>
              <h3 className="font-serif text-2xl font-bold text-cream">
                Sanctuary Inquiries & <br />
                Wholesale Allocations
              </h3>
              <p className="text-xs text-cream/70 leading-relaxed">
                Interested in stocking [CODE WITH GANDHI] whole beans at your Michelin-rated dining room or luxury hotel? Speak directly with our master roaster.
              </p>
            </div>

            <div className="space-y-4 text-xs text-cream/80">
              <div className="p-4 rounded-2xl glass-card flex items-start gap-3">
                <MapPin className="w-4 h-4 text-caramel flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-cream">Flagship Roastery</h4>
                  <p className="text-cream/60 mt-0.5">450 West Broadway, SoHo, New York, NY 10012</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl glass-card flex items-start gap-3">
                <Clock className="w-4 h-4 text-caramel flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-cream">Tasting Bar Hours</h4>
                  <p className="text-cream/60 mt-0.5">Monday – Sunday: 6:30 AM – 10:00 PM EST</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl glass-card flex items-start gap-3">
                <Mail className="w-4 h-4 text-caramel flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-cream">Direct Dispatch</h4>
                  <p className="text-cream/60 mt-0.5">concierge@codewithgandhi.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 border border-caramel/25 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 mx-auto rounded-full bg-caramel/20 border border-caramel flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-caramel" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-cream">Message Received</h4>
                <p className="text-xs text-cream/70 max-w-sm mx-auto">
                  Thank you for reaching out. A partner roaster will respond shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 gold-outline-btn text-xs font-semibold"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h4 className="font-serif text-lg font-bold text-cream">Direct Inquiry Form</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-cream/70 block mb-1">Your Name</label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Maya Lin"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-espresso-950/80 border border-cream/15 text-cream text-xs focus:outline-none focus:border-caramel"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-cream/70 block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="maya@atelier.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-espresso-950/80 border border-cream/15 text-cream text-xs focus:outline-none focus:border-caramel"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-cream/70 block mb-1">Inquiry Topic</label>
                  <select
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-espresso-950/80 border border-cream/15 text-cream text-xs focus:outline-none focus:border-caramel"
                  >
                    <option value="Wholesale & Private Events">Wholesale & Michelin Dining Inquiries</option>
                    <option value="Private Cupping Session">Private Cupping & Roastery Tour</option>
                    <option value="Online Order Support">Online Order & Delivery Support</option>
                    <option value="Press & Collaborations">Press, Media & Design Collaborations</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-cream/70 block mb-1">Your Message</label>
                  <textarea
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Tell us about your establishment, questions, or taste preferences..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-espresso-950/80 border border-cream/15 text-cream text-xs focus:outline-none focus:border-caramel"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 gold-pill-btn text-xs font-bold shadow-gold-glow flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
