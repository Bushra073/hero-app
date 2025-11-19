import React, { useState, useEffect, useMemo } from "react";
// Import necessary icons and Recharts components
import { Home, ShoppingCart, Info, Trash2, Package, TrendingUp, BarChart4, ChevronLeft } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * --- Application Data ---
 */
const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Teleportation Timer",
    tagline: "Finish tasks before you start them.",
    description: "A quantum-enhanced timer that tracks potential completion time across alternate timelines, helping you find the shortest path to done. Ideal for high-speed project management.",
    price: 99.99,
    rating: 4.8,
    stock: 12,
    hero: "The Chrononaut",
    imageUrl: "https://placehold.co/400x250/3b82f6/ffffff?text=Timer+Tech",
    chartData: [
      { month: 'Jan', sales: 400 },
      { month: 'Feb', sales: 300 },
      { month: 'Mar', sales: 500 },
      { month: 'Apr', sales: 620 },
    ]
  },
  {
    id: 2,
    name: "Invisibility Cloak Scheduler",
    tagline: "Keep your focus hidden from distractions.",
    description: "A distraction-free scheduling tool that temporarily hides your active projects from non-essential apps and notifications. Achieve deep work like never before.",
    price: 49.99,
    rating: 4.5,
    stock: 50,
    hero: "The Shadow",
    imageUrl: "https://placehold.co/400x250/10b981/ffffff?text=Stealth+Planner",
    chartData: [
      { month: 'Jan', sales: 250 },
      { month: 'Feb', sales: 350 },
      { month: 'Mar', sales: 320 },
      { month: 'Apr', sales: 480 },
    ]
  },
  {
    id: 3,
    name: "Super-Strength Habit Tracker",
    tagline: "Lift the heaviest habits with ease.",
    description: "Uses a gamified system to assign 'weight' to your habits, tracking your success rate like gym reps. Perfect for building powerful routines.",
    price: 29.99,
    rating: 4.9,
    stock: 200,
    hero: "Captain Resolve",
    imageUrl: "https://placehold.co/400x250/ef4444/ffffff?text=Habit+Power",
    chartData: [
      { month: 'Jan', sales: 800 },
      { month: 'Feb', sales: 750 },
      { month: 'Mar', sales: 900 },
      { month: 'Apr', sales: 1100 },
    ]
  },
  {
    id: 4,
    name: "Mind-Reading Meeting Filter",
    tagline: "Filter out the noise before the meeting starts.",
    description: "An AI-powered filter that analyzes meeting requests and summarizes the true intent and necessary action items, reducing meeting time by up to 50%.",
    price: 149.99,
    rating: 4.2,
    stock: 5,
    hero: "The Oracle",
    imageUrl: "https://placehold.co/400x250/f97316/ffffff?text=Insight+AI",
    chartData: [
      { month: 'Jan', sales: 150 },
      { month: 'Feb', sales: 200 },
      { month: 'Mar', sales: 250 },
      { month: 'Apr', sales: 300 },
    ]
  },
];

/**
 * --- Utility Components ---
 */

const formatPrice = (price) => {
  return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={`text-xl ${i < fullStars ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    );
  }
  return <div className="flex items-center space-x-0.5">{stars}</div>;
};

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 p-4 bg-gray-900 text-white rounded-xl shadow-xl animate-fade-in transition-opacity duration-300">
      {message}
    </div>
  );
};


/**
 * --- Page Components ---
 */

// 1. Home Page: Product List
const HomePage = ({ products, onAddToCart, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tagline.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  return (
    <div className="p-4 md:p-8 pt-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">The Hero Store</h1>
        <button
          onClick={() => onNavigate('cart')}
          className="bg-indigo-500 text-white py-2 px-4 rounded-xl shadow-lg hover:bg-indigo-600 transition duration-300 transform hover:scale-[1.02] flex items-center"
        >
          <ShoppingCart className="w-5 h-5 inline-block mr-1" />
          View Cart
        </button>
      </div>

      <input
        type="text"
        placeholder="Search product or hero..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-8 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm"
      />

      {filteredProducts.length === 0 ? (
        <div className="text-center p-10 bg-white rounded-2xl shadow-md">
          <p className="text-xl text-gray-500">No products found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col">
              <div className="h-48 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/400x250/6b7280/ffffff?text=${encodeURIComponent(product.name)}`;
                  }}
                />
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-1">{product.name}</h2>
                <p className="text-sm text-indigo-600 font-medium mb-3">{product.tagline}</p>

                <div className="flex items-center justify-between mb-4">
                  <StarRating rating={product.rating} />
                  <span className="text-2xl font-extrabold text-green-600">{formatPrice(product.price)}</span>
                </div>

                <p className="text-xs text-gray-500 mb-4 flex-grow">{product.description.substring(0, 80)}...</p>

                <div className="flex space-x-3 mt-auto">
                  <button
                    onClick={() => onNavigate('details', product.id)}
                    className="flex-1 flex items-center justify-center bg-gray-100 text-gray-700 py-2 rounded-xl text-sm font-semibold hover:bg-gray-200 transition duration-200"
                  >
                    <Info className="w-4 h-4 mr-1" /> Details
                  </button>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="flex-1 flex items-center justify-center bg-indigo-600 text-white py-2 rounded-xl text-sm font-semibold shadow-md hover:bg-indigo-700 transition duration-200"
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


// 2. Product Details Page
const AppDetailsPage = ({ products, productId, onAddToCart, onNavigate }) => {
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-3xl text-red-600">Product Not Found</h1>
        <button onClick={() => onNavigate('home')} className="mt-4 text-indigo-600 flex items-center justify-center mx-auto">
          <ChevronLeft className="w-5 h-5 mr-1" /> Back to Store
        </button>
      </div>
    );
  }

  const chartData = useMemo(() => product.chartData, [product.chartData]);

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <button onClick={() => onNavigate('home')} className="mb-6 text-indigo-600 hover:text-indigo-800 flex items-center transition">
        <ChevronLeft className="w-5 h-5 mr-1" /> Back to Store
      </button>

      <div className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column: Image and Details */}
          <div>
            <div className="rounded-2xl overflow-hidden mb-6 shadow-xl aspect-video">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/600x400/6b7280/ffffff?text=${encodeURIComponent(product.name)}`;
                }}
              />
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold text-gray-900">{product.name}</h1>
              <p className="text-xl text-indigo-600 font-semibold">{product.tagline}</p>

              <div className="flex items-center space-x-6 text-lg">
                <StarRating rating={product.rating} />
                <span className="text-gray-500">({product.rating.toFixed(1)} out of 5)</span>
              </div>

              <p className="text-3xl font-extrabold text-green-600 pt-2">{formatPrice(product.price)}</p>

              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 text-sm font-semibold rounded-full flex items-center ${
                  product.stock > 10 ? 'bg-green-100 text-green-700' :
                  product.stock > 0 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  <Package className="w-4 h-4 inline-block mr-1" />
                  {product.stock > 0 ? `${product.stock} in Stock` : 'Out of Stock'}
                </span>
                <span className="text-gray-500 text-sm">Hero: {product.hero}</span>
              </div>

              <button
                onClick={() => onAddToCart(product)}
                className="w-full flex items-center justify-center bg-indigo-600 text-white p-3 mt-4 rounded-xl text-lg font-bold shadow-xl hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.01]"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="w-6 h-6 mr-2" />
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>

          {/* Right Column: Description and Chart */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Product Overview</h2>
            <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-pink-500" />
              Quarterly Sales Trend
            </h2>
            <div className="bg-gray-50 p-4 rounded-xl h-64 shadow-inner">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="month" stroke="#4b5563" />
                  <YAxis stroke="#4b5563" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }}
                    labelStyle={{ fontWeight: 'bold', color: '#333' }}
                    formatter={(value) => [`${value} units`, 'Sales']}
                  />
                  <Bar dataKey="sales" fill="#818CF8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">Sales units over the last four months.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Shopping Cart Page
const CartPage = ({ cart, onUpdateCart, onNavigate }) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const shipping = subtotal > 100 ? 0.00 : 15.00;
  const finalTotal = subtotal + tax + shipping;

  const handleRemove = (productId) => {
    onUpdateCart(cart.filter(item => item.id !== productId));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const quantity = parseInt(newQuantity);
    if (quantity < 1) return;

    onUpdateCart(cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 flex items-center">
        <ShoppingCart className="w-8 h-8 mr-3 text-indigo-600" />
        Your Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items (Left/Top) */}
        <div className="lg:col-span-2 space-y-4">
          {cart.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <p className="text-xl text-gray-500 mb-4">Your Hero Store cart is empty.</p>
              <button
                onClick={() => onNavigate('home')}
                className="text-indigo-600 font-semibold hover:text-indigo-800 transition"
              >
                Go find your superpowers!
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl shadow-lg flex items-center space-x-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/64x64/6b7280/ffffff?text=${encodeURIComponent(item.name)}`;
                  }}
                />
                <div className="flex-grow">
                  <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
                  <p className="text-sm text-gray-500">{item.hero}</p>
                  <p className="text-base font-semibold text-green-600">{formatPrice(item.price)}</p>
                </div>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  className="w-16 p-2 border border-gray-300 rounded-lg text-center"
                />
                <p className="text-lg font-bold text-gray-900 w-24 text-right">
                  {formatPrice(item.price * item.quantity)}
                </p>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="p-2 text-red-500 hover:text-red-700 transition"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Cart Summary (Right/Bottom) */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-xl h-fit sticky top-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Order Summary</h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Items ({totalItems})</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between border-b pb-3">
              <span>Tax (8%)</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between text-xl font-extrabold text-gray-900 pt-2">
              <span>Order Total</span>
              <span>{formatPrice(finalTotal)}</span>
            </div>
          </div>
          <button
            className="w-full bg-pink-600 text-white p-3 mt-6 rounded-xl text-lg font-bold shadow-lg hover:bg-pink-700 transition duration-300 disabled:bg-pink-300"
            onClick={() => {
              if (cart.length > 0) {
                setToastMessage("Checkout successful! Thank you for boosting your productivity!");
                setCart([]); // Clear the cart
                onNavigate('home');
              }
            }}
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
      <button
        onClick={() => onNavigate('home')}
        className="mt-8 text-indigo-600 font-semibold hover:text-indigo-800 flex items-center justify-center mx-auto transition"
      >
        <ChevronLeft className="w-5 h-5 mr-1" /> Continue Shopping
      </button>
    </div>
  );
};


/**
 * --- Main Application Component ---
 * Handles state, routing (using a switch/case block), and data management.
 */
const App = () => {
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState('home'); // 'home', 'cart', or 'details'
  const [detailProductId, setDetailProductId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const handleNavigate = (newPage, productId = null) => {
    setDetailProductId(productId);
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
      setToastMessage(`${product.name} quantity increased in cart!`);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      setToastMessage(`${product.name} added to cart!`);
    }
  };

  const renderPage = () => {
    switch (page) {
      case 'cart':
        return <CartPage cart={cart} onUpdateCart={setCart} onNavigate={handleNavigate} />;
      case 'details':
        return (
          <AppDetailsPage
            products={INITIAL_PRODUCTS}
            productId={detailProductId}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
          />
        );
      case 'home':
      default:
        return (
          <HomePage
            products={INITIAL_PRODUCTS}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  // Internal Navigation Bar component (defined here for self-contained file)
  const Navbar = () => (
    <nav className="bg-white shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => handleNavigate('home')}>
            <BarChart4 className="h-7 w-7 text-indigo-600 mr-2" />
            <span className="text-2xl font-bold text-gray-900">HeroStore</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleNavigate('home')}
              className={`flex items-center px-3 py-2 rounded-xl text-sm font-medium transition duration-150 ${
                page === 'home' ? 'bg-indigo-100 text-indigo-800' : 'text-gray-600 hover:text-indigo-800 hover:bg-gray-50'
              }`}
            >
              <Home className="w-5 h-5 mr-1" /> Store
            </button>
            <button
              onClick={() => handleNavigate('cart')}
              className={`flex items-center px-3 py-2 rounded-xl text-sm font-medium transition duration-150 ${
                page === 'cart' ? 'bg-indigo-100 text-indigo-800' : 'text-gray-600 hover:text-indigo-800 hover:bg-gray-50'
              } relative`}
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full min-w-5 h-5">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
              <span className="ml-1 hidden sm:inline">Cart</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  // Internal Footer component (defined here for self-contained file)
  const Footer = () => (
    <footer className="w-full bg-white border-t border-gray-200 mt-12 py-6">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} HeroStore. All productivity solutions reserved.
      </div>
    </footer>
  );


  return (
    <div className="min-h-screen bg-gray-50 antialiased">
      <Navbar />
      <main className="max-w-7xl mx-auto flex-grow">
        {renderPage()}
      </main>
      <Footer />

      {/* Toast Notification */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
};

export default App;