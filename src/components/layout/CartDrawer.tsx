import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, ShieldCheck, CheckCircle2, Sparkles, MapPin, CreditCard, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCartStore } from '../../store/useCartStore';
import { useUserStore } from '../../store/useUserStore';
import { useToast } from '../common/ToastContainer';

export const CartDrawer: React.FC = () => {
  const {
    isOpen,
    closeCart,
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getSubtotal,
    getDiscount,
    getTax,
    getTotal,
    promoCode,
    promoDiscountPct,
    promoMessage,
    applyPromo,
    removePromo,
  } = useCartStore();

  const addOrder = useUserStore((s) => s.addOrder);
  const { showToast } = useToast();

  const [promoInput, setPromoInput] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState<any | null>(null);

  // Checkout form state
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [formData, setFormData] = useState({
    name: 'Dev Gandhi',
    phone: '+1 (555) 789-2345',
    email: 'dev@codewithgandhi.com',
    address: '450 West Broadway, SoHo, NY 10012',
    notes: 'Please double cup hot espresso',
    paymentMethod: 'card', // 'card' | 'apple' | 'cash'
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const success = applyPromo(promoInput);
    if (success) {
      showToast('Promo Code Applied!', `${promoInput.toUpperCase()} discount activated`, 'deal');
      setPromoInput('');
    } else {
      showToast('Invalid Code', 'Try BREW10 (10%) or GANDHI20 (20%)', 'warning');
    }
  };

  const validateCheckout = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.phone.trim()) errors.phone = 'Valid phone number required';
    if (orderType === 'delivery' && !formData.address.trim()) {
      errors.address = 'Delivery address is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCheckout()) return;

    const sub = getSubtotal();
    const disc = getDiscount();
    const tx = getTax();
    const tot = getTotal();

    const placedOrder = addOrder({
      items,
      subtotal: sub,
      discount: disc,
      tax: tx,
      total: tot,
      type: orderType,
      deliveryAddress: orderType === 'delivery' ? formData.address : undefined,
    });

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C08A55', '#E9C46A', '#F3E7D8', '#FFFFFF'],
    });

    setOrderComplete(placedOrder);
    clearCart();
    showToast('Order Confirmed!', `Order #${placedOrder.id} is being handcrafted`, 'success');
  };

  const handleCloseAll = () => {
    setOrderComplete(null);
    setIsCheckingOut(false);
    closeCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={handleCloseAll}
        className="absolute inset-0 bg-espresso-950/80 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-in Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-mocha-900 border-l border-caramel/20 shadow-2xl flex flex-col z-10">
          {/* Header */}
          <div className="p-5 border-b border-cream/10 flex items-center justify-between bg-espresso-950/50">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">☕</span>
              <h2 className="font-serif text-lg font-bold text-cream">
                {orderComplete
                  ? 'Order Handcrafted!'
                  : isCheckingOut
                  ? 'Review & Checkout'
                  : 'Your Coffee Bag'}
              </h2>
            </div>
            <button
              onClick={handleCloseAll}
              className="p-1.5 rounded-full text-cream/60 hover:text-cream hover:bg-cardbrown transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {orderComplete ? (
              /* ORDER SUCCESS CONFIRMATION */
              <div className="py-6 text-center space-y-5 animate-in fade-in">
                <div className="w-20 h-20 mx-auto rounded-full bg-caramel/20 border-2 border-caramel flex items-center justify-center shadow-gold-glow">
                  <CheckCircle2 className="w-10 h-10 text-caramel" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-bold text-cream">
                    Thank You, {formData.name.split(' ')[0]}!
                  </h3>
                  <p className="text-xs text-cream/70 max-w-xs mx-auto">
                    Your order <span className="text-caramel font-semibold">#{orderComplete.id}</span> has been received by our master baristas.
                  </p>
                </div>

                {/* Receipt Card */}
                <div className="glass-card p-4 rounded-2xl text-left text-xs space-y-3">
                  <div className="flex justify-between text-cream/70">
                    <span>Pickup / Fulfillment:</span>
                    <span className="font-medium text-cream capitalize">
                      {orderComplete.type === 'pickup' ? 'Counter Pickup (12-15 mins)' : 'Express Courier'}
                    </span>
                  </div>
                  <div className="flex justify-between text-cream/70">
                    <span>Points Earned:</span>
                    <span className="font-bold text-gold-400">+{orderComplete.pointsEarned} PTS</span>
                  </div>
                  <div className="border-t border-cream/10 pt-2 flex justify-between font-bold text-sm text-cream">
                    <span>Total Paid:</span>
                    <span className="text-caramel">${orderComplete.total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCloseAll}
                  className="w-full py-3.5 gold-pill-btn text-sm font-bold shadow-gold-glow"
                >
                  Back to Experience
                </button>
              </div>
            ) : isCheckingOut ? (
              /* CHECKOUT FORM */
              <form onSubmit={handlePlaceOrder} className="space-y-4 animate-in fade-in">
                {/* Order Type Toggle */}
                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-espresso-950/80 border border-cream/10">
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      orderType === 'pickup'
                        ? 'bg-caramel text-espresso-950 shadow-sm'
                        : 'text-cream/70 hover:text-cream'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Cafe Pickup</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      orderType === 'delivery'
                        ? 'bg-caramel text-espresso-950 shadow-sm'
                        : 'text-cream/70 hover:text-cream'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Express Delivery</span>
                  </button>
                </div>

                {/* Form Fields */}
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-semibold text-cream/75 uppercase tracking-wider block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-espresso-950/70 border border-cream/15 text-cream text-xs focus:outline-none focus:border-caramel"
                      placeholder="e.g. John Doe"
                    />
                    {formErrors.name && (
                      <p className="text-[10px] text-amber-400 mt-1">{formErrors.name}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-cream/75 uppercase tracking-wider block mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-espresso-950/70 border border-cream/15 text-cream text-xs focus:outline-none focus:border-caramel"
                      />
                      {formErrors.phone && (
                        <p className="text-[10px] text-amber-400 mt-1">{formErrors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-cream/75 uppercase tracking-wider block mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-espresso-950/70 border border-cream/15 text-cream text-xs focus:outline-none focus:border-caramel"
                      />
                    </div>
                  </div>

                  {orderType === 'delivery' && (
                    <div>
                      <label className="text-[11px] font-semibold text-cream/75 uppercase tracking-wider block mb-1">
                        Delivery Address
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-espresso-950/70 border border-cream/15 text-cream text-xs focus:outline-none focus:border-caramel"
                        placeholder="Street, Apt, City, Zip"
                      />
                      {formErrors.address && (
                        <p className="text-[10px] text-amber-400 mt-1">{formErrors.address}</p>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="text-[11px] font-semibold text-cream/75 uppercase tracking-wider block mb-1">
                      Barista Notes
                    </label>
                    <input
                      type="text"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Extra hot, light foam"
                      className="w-full px-3.5 py-2 rounded-xl bg-espresso-950/70 border border-cream/15 text-cream text-xs focus:outline-none focus:border-caramel"
                    />
                  </div>

                  {/* Payment Method UI */}
                  <div>
                    <label className="text-[11px] font-semibold text-cream/75 uppercase tracking-wider block mb-1.5">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                        className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-[11px] font-medium transition-all ${
                          formData.paymentMethod === 'card'
                            ? 'bg-caramel/20 border-caramel text-caramel'
                            : 'bg-espresso-950/60 border-cream/10 text-cream/60'
                        }`}
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Card</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: 'apple' })}
                        className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-[11px] font-medium transition-all ${
                          formData.paymentMethod === 'apple'
                            ? 'bg-caramel/20 border-caramel text-caramel'
                            : 'bg-espresso-950/60 border-cream/10 text-cream/60'
                        }`}
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Apple Pay</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: 'cash' })}
                        className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-[11px] font-medium transition-all ${
                          formData.paymentMethod === 'cash'
                            ? 'bg-caramel/20 border-caramel text-caramel'
                            : 'bg-espresso-950/60 border-cream/10 text-cream/60'
                        }`}
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Counter Pay</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="flex-1 py-3 rounded-full border border-cream/20 text-cream text-xs font-semibold hover:bg-cardbrown"
                  >
                    Back to Items
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 gold-pill-btn text-xs font-bold shadow-gold-glow flex items-center justify-center gap-1.5"
                  >
                    <span>Confirm (${getTotal().toFixed(2)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : items.length === 0 ? (
              /* EMPTY CART */
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-cardbrown/40 border border-cream/10 flex items-center justify-center text-3xl">
                  ☕
                </div>
                <div className="space-y-1">
                  <p className="font-serif text-lg font-bold text-cream">Your bag is empty</p>
                  <p className="text-xs text-cream/60 max-w-xs mx-auto">
                    Explore our hand-roasted single-origin coffees and award-winning espressos.
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 gold-outline-btn text-xs font-semibold"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              /* CART ITEMS LIST */
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl glass-card flex gap-3 items-center group"
                  >
                    <img
                      src={item.drink.image}
                      alt={item.drink.name}
                      className="w-14 h-14 rounded-xl object-cover border border-cream/10 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="text-xs font-bold text-cream truncate">{item.drink.name}</h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-cream/40 hover:text-amber-400 p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Customization pills */}
                      <p className="text-[10px] text-cream/60 truncate mt-0.5">
                        Size {item.customization.size} • {item.customization.milk.split(' ')[0]} •{' '}
                        {item.customization.temperature}
                        {item.customization.extraShot ? ' • +Shot' : ''}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-bold text-caramel">
                          ${(item.unitPrice * item.quantity).toFixed(2)}
                        </span>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-espresso-950/60 border border-cream/10">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-0.5 text-cream/70 hover:text-cream"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-cream w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-0.5 text-cream/70 hover:text-cream"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="pt-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-caramel absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Promo code (BREW10, GANDHI20)"
                        className="w-full pl-8 pr-3 py-2 rounded-xl bg-espresso-950/70 border border-cream/15 text-cream text-xs placeholder:text-cream/40 uppercase focus:outline-none focus:border-caramel"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-xl bg-cardbrown hover:bg-cardbrown-light border border-caramel/30 text-caramel text-xs font-semibold"
                    >
                      Apply
                    </button>
                  </div>

                  {promoCode && (
                    <div className="mt-2 flex items-center justify-between px-3 py-1.5 rounded-lg bg-caramel/15 border border-caramel/30 text-xs">
                      <span className="text-caramel font-semibold">
                        Code {promoCode} active ({(promoDiscountPct * 100).toFixed(0)}% OFF)
                      </span>
                      <button
                        type="button"
                        onClick={removePromo}
                        className="text-cream/50 hover:text-cream text-[11px]"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  {promoMessage && !promoCode && (
                    <p className="text-[11px] text-amber-400 mt-1">{promoMessage}</p>
                  )}
                </form>
              </div>
            )}
          </div>

          {/* Bottom Total & Checkout CTA (when not checked out & not empty) */}
          {!orderComplete && items.length > 0 && !isCheckingOut && (
            <div className="p-5 border-t border-cream/10 bg-espresso-950/60 space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-cream/70">
                  <span>Subtotal</span>
                  <span className="text-cream font-medium">${getSubtotal().toFixed(2)}</span>
                </div>
                {promoDiscountPct > 0 && (
                  <div className="flex justify-between text-caramel font-medium">
                    <span>Promo Discount</span>
                    <span>-${getDiscount().toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-cream/70">
                  <span>Estimated Tax (8.25%)</span>
                  <span className="text-cream font-medium">${getTax().toFixed(2)}</span>
                </div>
                <div className="border-t border-cream/10 pt-2 flex justify-between text-sm font-bold text-cream">
                  <span>Total</span>
                  <span className="text-caramel font-serif text-lg">${getTotal().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3.5 gold-pill-btn text-xs font-bold shadow-gold-glow flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
