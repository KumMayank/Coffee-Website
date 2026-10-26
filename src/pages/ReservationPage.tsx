import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useUserStore, TableBooking } from '../store/useUserStore';
import { useToast } from '../components/common/ToastContainer';

export const ReservationPage: React.FC = () => {
  const addReservation = useUserStore((s) => s.addReservation);
  const user = useUserStore((s) => s.user);
  const { showToast } = useToast();

  const [date, setDate] = useState('2026-10-30');
  const [time, setTime] = useState('18:30');
  const [guests, setGuests] = useState(2);
  const [area, setArea] = useState<TableBooking['area']>('Velvet Lounge');
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [specialRequests, setSpecialRequests] = useState('Quiet corner table if possible');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedBooking, setConfirmedBooking] = useState<TableBooking | null>(null);

  const timeSlots = [
    '08:30', '10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '18:30', '20:00', '21:00'
  ];

  const areas: { id: TableBooking['area']; label: string; desc: string; icon: string }[] = [
    {
      id: 'Velvet Lounge',
      label: 'Velvet Lounge',
      desc: 'Deep leather armchairs, low ambient lighting, vinyl acoustics',
      icon: '🛋️',
    },
    {
      id: 'Main Bar',
      label: 'Barista Counter',
      desc: 'Front-row view of lever extractions and manual pourovers',
      icon: '☕',
    },
    {
      id: 'Garden Patio',
      label: 'Botanical Patio',
      desc: 'Open-air courtyard with Japanese maple and heating lamps',
      icon: '🌿',
    },
    {
      id: 'Private Roastery Booth',
      label: 'Private Roaster Booth',
      desc: 'Acoustic glass sanctuary overlooking the roasting drum',
      icon: '✨',
    },
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!phone.trim()) errs.phone = 'Valid phone is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email is required';
    if (!date) errs.date = 'Please select a date';
    if (!time) errs.time = 'Please select a time slot';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const booking = addReservation({
      date,
      time,
      guests,
      area,
      specialRequests,
      name,
      phone,
      email,
    });

    confetti({
      particleCount: 70,
      spread: 60,
      colors: ['#C08A55', '#E9C46A', '#F3E7D8'],
    });

    setConfirmedBooking(booking);
    showToast('Table Reserved', `Reservation #${booking.id} confirmed for ${guests} guests`, 'success');
  };

  return (
    <div className="pt-28 pb-24 min-h-screen relative overflow-hidden">
      {/* Background Parallax Word */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 parallax-bg-word text-[130px] sm:text-[220px] md:text-[320px] opacity-[0.025] pointer-events-none select-none">
        RESERVE
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-caramel/20 border border-caramel/40 text-xs font-bold text-caramel tracking-wider uppercase">
            <Calendar className="w-3.5 h-3.5" />
            <span>Table Reservations</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream">
            Reserve Your <span className="gold-gradient-text italic font-normal">Sanctuary</span>
          </h1>
          <p className="text-xs sm:text-sm text-cream/70 font-sans">
            Secure a bespoke table at our SoHo flagship. Every booking includes a complimentary single-origin palate-cleansing infusion.
          </p>
        </div>

        {confirmedBooking ? (
          /* RESERVATION CONFIRMATION CARD */
          <div className="glass-card rounded-3xl p-8 sm:p-12 border border-caramel/40 shadow-2xl text-center space-y-6 animate-in zoom-in-95">
            <div className="w-20 h-20 mx-auto rounded-full bg-caramel/20 border-2 border-caramel flex items-center justify-center shadow-gold-glow">
              <CheckCircle2 className="w-10 h-10 text-caramel" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-caramel uppercase tracking-widest">
                Reservation Confirmed
              </span>
              <h2 className="font-serif text-3xl font-bold text-cream">
                We Await You, {confirmedBooking.name}
              </h2>
              <p className="text-xs text-cream/70 max-w-sm mx-auto">
                A confirmation has been dispatched to <span className="text-caramel">{confirmedBooking.email}</span>.
              </p>
            </div>

            {/* Ticket Pass */}
            <div className="max-w-md mx-auto p-6 rounded-2xl bg-espresso-950/80 border border-cream/15 text-left text-xs space-y-3 shadow-glass">
              <div className="flex justify-between items-center border-b border-cream/10 pb-3">
                <span className="font-serif text-sm font-bold text-cream">Booking Reference</span>
                <span className="font-mono text-sm font-bold text-caramel">{confirmedBooking.id}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-cream/80">
                <div>
                  <span className="text-[10px] text-cream/50 uppercase block">Date & Time</span>
                  <span className="font-medium text-cream mt-0.5 block">
                    {confirmedBooking.date} at {confirmedBooking.time}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-cream/50 uppercase block">Party Size</span>
                  <span className="font-medium text-cream mt-0.5 block">
                    {confirmedBooking.guests} {confirmedBooking.guests === 1 ? 'Guest' : 'Guests'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-cream/50 uppercase block">Seating Area</span>
                  <span className="font-medium text-caramel mt-0.5 block">{confirmedBooking.area}</span>
                </div>
                <div>
                  <span className="text-[10px] text-cream/50 uppercase block">Sanctuary Location</span>
                  <span className="font-medium text-cream mt-0.5 block">SoHo Flagship NYC</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setConfirmedBooking(null)}
              className="px-8 py-3.5 gold-pill-btn text-xs font-bold shadow-gold-glow"
            >
              Reserve Another Table
            </button>
          </div>
        ) : (
          /* RESERVATION FORM */
          <form
            onSubmit={handleSubmit}
            className="glass-card rounded-3xl p-6 sm:p-10 border border-caramel/25 shadow-2xl space-y-8"
          >
            {/* Step 1: Area Selection */}
            <div className="space-y-3">
              <label className="font-bold text-cream text-xs uppercase tracking-wider block">
                1. Select Atmosphere
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {areas.map((a) => {
                  const isSelected = area === a.id;
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => setArea(a.id)}
                      className={`p-4 rounded-2xl text-left border transition-all ${
                        isSelected
                          ? 'bg-caramel/20 border-caramel text-cream shadow-gold-glow'
                          : 'bg-espresso-950/60 border-cream/10 text-cream/70 hover:border-caramel/40'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{a.icon}</span>
                        <h4 className="font-serif text-sm font-bold text-cream">{a.label}</h4>
                      </div>
                      <p className="text-[11px] text-cream/60 leading-relaxed">{a.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Date, Time & Guests */}
            <div className="space-y-4">
              <label className="font-bold text-cream text-xs uppercase tracking-wider block">
                2. Timing & Party Size
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Date Picker */}
                <div>
                  <label className="text-[11px] text-cream/60 block mb-1">Reservation Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-espresso-950/80 border border-cream/15 text-cream text-xs focus:outline-none focus:border-caramel"
                  />
                  {errors.date && <p className="text-[10px] text-amber-400 mt-1">{errors.date}</p>}
                </div>

                {/* Guest Stepper */}
                <div>
                  <label className="text-[11px] text-cream/60 block mb-1">Number of Guests</label>
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-espresso-950/80 border border-cream/15">
                    <button
                      type="button"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="px-2 py-0.5 text-cream/70 hover:text-cream text-sm font-bold"
                    >
                      -
                    </button>
                    <span className="font-serif font-bold text-xs text-cream">
                      {guests} {guests === 1 ? 'Guest' : 'Guests'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuests(Math.min(8, guests + 1))}
                      className="px-2 py-0.5 text-cream/70 hover:text-cream text-sm font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Time Slots Chips */}
              <div>
                <label className="text-[11px] text-cream/60 block mb-2">Available Time Slots</label>
                <div className="flex flex-wrap gap-2">
                  {timeSlots.map((slot) => {
                    const isSelected = time === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTime(slot)}
                        className={`px-3 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                          isSelected
                            ? 'bg-caramel text-espresso-950 font-bold shadow-sm'
                            : 'bg-espresso-950/70 border border-cream/15 text-cream/80 hover:border-caramel/40'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
                {errors.time && <p className="text-[10px] text-amber-400 mt-1">{errors.time}</p>}
              </div>
            </div>

            {/* Step 3: Contact Details */}
            <div className="space-y-3">
              <label className="font-bold text-cream text-xs uppercase tracking-wider block">
                3. Connoisseur Details
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] text-cream/60 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-espresso-950/80 border border-cream/15 text-cream text-xs focus:outline-none focus:border-caramel"
                  />
                  {errors.name && <p className="text-[10px] text-amber-400 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-[11px] text-cream/60 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-espresso-950/80 border border-cream/15 text-cream text-xs focus:outline-none focus:border-caramel"
                  />
                  {errors.phone && <p className="text-[10px] text-amber-400 mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="text-[11px] text-cream/60 block mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-espresso-950/80 border border-cream/15 text-cream text-xs focus:outline-none focus:border-caramel"
                  />
                  {errors.email && <p className="text-[10px] text-amber-400 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="text-[11px] text-cream/60 block mb-1">Special Occasion or Notes</label>
                <input
                  type="text"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Anniversary, coffee flight preference..."
                  className="w-full px-3.5 py-2 rounded-xl bg-espresso-950/80 border border-cream/15 text-cream text-xs focus:outline-none focus:border-caramel"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 gold-pill-btn text-xs font-bold shadow-gold-glow flex items-center justify-center gap-2"
              >
                <span>Confirm Table Reservation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
