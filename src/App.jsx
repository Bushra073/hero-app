import React, { useState } from 'react';
import { ShoppingCart, Store, Plus, Minus, Trash2, ArrowRight, Star, Shield, Zap, Heart, Search } from 'lucide-react';

// --- DATA ---
const HEROES = [
  { id: 1, name: "Quantum Shield", category: "Defense", price: 1250, rating: 5.0, image: "https://images.unsplash.com/photo-1614726365723-498aa67c5f7b?w=500&q=80", desc: "Generates a forcefield that absorbs 99.9% of kinetic energy." },
  { id: 2, name: "Sonic Boots", category: "Mobility", price: 850, rating: 4.7, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", desc: "Hover capability and silent movement for stealth missions." },
  { id: 3, name: "Plasma Gauntlets", category: "Offense", price: 2100, rating: 4.9, image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=500&q=80", desc: "Concentrated plasma beams capable of melting steel." },
  { id: 4, name: "Neural Visor", category: "Intel", price: 1600, rating: 4.6, image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&q=80", desc: "Heads-up display with thermal vision and threat analysis." },
  { id: 5, name: "Nanofiber Suit", category: "Defense", price: 3500, rating: 5.0, image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&q=80", desc: "Lightweight armor that hardens on impact." },
  { id: 6, name: "Grapple Gun", category: "Mobility", price: 450, rating: 4.2, image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&q=80", desc: "High-tensile cable for rapid vertical traversal." },
];

// --- COMPONENTS ---

const Navbar = ({ cartCount, setView, currentView }) => (
  <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer group" 
          onClick={() => setView('shop')}
        >
          <div className="bg-black text-white p-2 rounded-lg mr-3 transition-transform transform group-hover:scale-110">
            <Shield size={24} />
          </div>
          <span className="text-2xl font-extrabold tracking-tighter text-gray-900">
            HERO<span className="text-blue-600">.IO</span>
          </span>
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setView('shop')}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              currentView === 'shop' 
                ? 'bg-gray-100 text-gray-900' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Catalog
          </button>
          
          <button 
            onClick={() => setView('cart')}
            className="relative group p-3 rounded-full bg-black text-white hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  </nav>
);

const HeroCard = ({ hero, addToCart }) => (
  <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
    <div className="relative h-64 overflow-hidden">
      <img 
        src={hero.image} 
        alt={hero.name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-gray-800 shadow-sm">
        {hero.category}
      </div>
    </div>
    
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-900 leading-tight">{hero.name}</h3>
        <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-md">
          <Star size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
          <span className="text-sm font-bold text-yellow-700">{hero.rating}</span>
        </div>
      </div>
      
      <p className="text-gray-500 text-sm mb-6 line-clamp-2">{hero.desc}</p>
      
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-2xl font-extrabold text-gray-900">${hero.price}</span>
        <button 
          onClick={() => addToCart(hero)}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 active:scale-95 transition-all shadow-md hover:shadow-blue-200 flex items-center gap-2"
        >
          <Plus size={18} /> Add
        </button>
      </div>
    </div>
  </div>
);

const CartItem = ({ item, updateQuantity, removeFromCart }) => (
  <div className="flex items-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm mb-4 hover:shadow-md transition-shadow">
    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg border border-gray-100" />
    
    <div className="ml-6 flex-grow">
      <h4 className="font-bold text-gray-900 text-lg">{item.name}</h4>
      <p className="text-sm text-gray-500">{item.category} Gear</p>
    </div>

    <div className="flex items-center space-x-6 mr-6">
      <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-200">
        <button 
          onClick={() => updateQuantity(item.id, -1)}
          className="p-2 hover:bg-white rounded-md transition-colors text-gray-600"
          disabled={item.quantity <= 1}
        >
          <Minus size={16} />
        </button>
        <span className="w-8 text-center font-bold text-gray-900">{item.quantity}</span>
        <button 
          onClick={() => updateQuantity(item.id, 1)}
          className="p-2 hover:bg-white rounded-md transition-colors text-gray-600"
        >
          <Plus size={16} />
        </button>
      </div>
      <div className="text-right w-24">
        <p className="font-bold text-lg text-gray-900">${(item.price * item.quantity).toLocaleString()}</p>
      </div>
    </div>

    <button 
      onClick={() => removeFromCart(item.id)}
      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
    >
      <Trash2 size={20} />
    </button>
  </div>
);

// --- MAIN APP ---
const App = () => {
  const [view, setView] = useState('shop');
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const addToCart = (hero) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === hero.id);
      if (existing) {
        return prev.map(item => item.id === hero.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...hero, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredHeroes = HEROES.filter(h => h.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-blue-100">
      <Navbar cartCount={cartCount} setView={setView} currentView={view} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'shop' ? (
          <>
            <div className="mb-12 text-center max-w-2xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
                Gear Up for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Glory</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Elite tactical equipment for the modern superhero. Next-day delivery to your secret lair.
              </p>
              
              <div className="relative max-w-md mx-auto group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                <div className="relative bg-white rounded-xl shadow-xl flex items-center p-2">
                  <Search className="ml-3 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search for gear..." 
                    className="w-full p-3 outline-none text-gray-700 placeholder-gray-400"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredHeroes.map(hero => (
                <HeroCard key={hero.id} hero={hero} addToCart={addToCart} />
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <ShoppingCart className="mr-3" /> Your Requisitions
            </h2>
            
            {cart.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                <p className="text-xl text-gray-500">Your cart is empty, hero.</p>
                <button 
                  onClick={() => setView('shop')}
                  className="mt-4 text-blue-600 font-bold hover:underline"
                >
                  Return to Catalog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  {cart.map(item => (
                    <CartItem 
                      key={item.id} 
                      item={item} 
                      updateQuantity={updateQuantity} 
                      removeFromCart={removeFromCart} 
                    />
                  ))}
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
                    <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                    <div className="space-y-3 mb-6 text-gray-600">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${cartTotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="text-green-600">Free</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax (5%)</span>
                        <span>${(cartTotal * 0.05).toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xl">Total</span>
                        <span className="font-extrabold text-2xl text-gray-900">
                          ${(cartTotal * 1.05).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <button className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-lg active:scale-95">
                      Checkout Now
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;