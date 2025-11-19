import React, { useState } from 'react';
import { ShoppingCart, Package, Heart, User, Search, Menu, X, ArrowLeft, Plus, Minus } from 'lucide-react';

const products = [
    { id: 1, name: 'Quantum Shield', category: 'Defense', price: 1250, rating: 4.8, image: 'https://placehold.co/600x400/0f172a/e2e8f0?text=QUANTUM+SHIELD', description: 'Generates a temporary, near-impenetrable energy field.' },
    { id: 2, name: 'Sonic Gauntlets', category: 'Utility', price: 980, rating: 4.5, image: 'https://placehold.co/600x400/0f172a/e2e8f0?text=SONIC+GAUNTLETS', description: 'Releases focused sonic blasts capable of shattering concrete.' },
    { id: 3, name: 'Invisibility Cloak V2', category: 'Stealth', price: 3500, rating: 4.9, image: 'https://placehold.co/600x400/0f172a/e2e8f0?text=INVISIBILITY+CLOAK', description: 'Perfect optical camouflage with zero heat signature.' },
    { id: 4, name: 'Grappling Hook 3000', category: 'Mobility', price: 450, rating: 4.1, image: 'https://placehold.co/600x400/0f172a/e2e8f0?text=GRAPPLING+HOOK', description: 'High-tension cable and magnetic claw for rapid ascent.' },
];

const CategoryFilter = ({ activeCategory, setCategory }) => {
    const categories = ['All Gear', 'Defense', 'Utility', 'Stealth', 'Mobility'];

    return (
        <div className="flex space-x-3 overflow-x-auto py-2 mb-6 border-b border-gray-700/50">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`
                        px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out
                        ${activeCategory === cat
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50 rounded-lg'
                            : 'text-gray-300 hover:bg-gray-700/50 rounded-md'
                        }
                        whitespace-nowrap
                    `}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
};

const ProductCard = ({ product, onAddToCart, onToggleWishlist, isInWishlist }) => (
    <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden hover:shadow-indigo-500/30 transition-shadow duration-300 transform hover:scale-[1.02]">
        <div className="relative">
            <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover object-center" 
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/0f172a/e2e8f0?text=IMAGE+MISSING" }}
            />
            <button
                onClick={() => onToggleWishlist(product.id)}
                className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
                    isInWishlist ? 'bg-red-500 text-white' : 'bg-gray-900/50 text-gray-300 hover:text-red-400'
                }`}
            >
                <Heart size={18} fill={isInWishlist ? 'white' : 'none'} />
            </button>
        </div>
        
        <div className="p-5">
            <span className="text-xs font-semibold uppercase text-indigo-400 tracking-wider">{product.category}</span>
            <h3 className="mt-1 text-xl font-bold text-gray-100">{product.name}</h3>
            <p className="mt-2 text-gray-400 text-sm h-10 overflow-hidden">{product.description}</p>
            
            <div className="flex justify-between items-center mt-4">
                <span className="text-2xl font-extrabold text-white">
                    ${product.price.toLocaleString()}
                </span>
                <button
                    onClick={() => onAddToCart(product)}
                    className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-500/50"
                >
                    <ShoppingCart size={16} />
                    <span className="hidden sm:inline">Add to Cart</span>
                </button>
            </div>
        </div>
    </div>
);

const CartModal = ({ cartItems, onClose, onUpdateQuantity, onRemoveItem }) => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-end">
            <div className="bg-gray-900 w-full md:w-96 h-full p-6 flex flex-col transform transition-transform duration-300 ease-in-out">
                <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                    <h2 className="text-3xl font-bold text-white flex items-center">
                        <ShoppingCart className="mr-3 text-indigo-400" size={28} />
                        Your Cart ({cartItems.length})
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white p-2 rounded-full bg-gray-800 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto mt-4 space-y-4">
                    {cartItems.length === 0 ? (
                        <p className="text-gray-500 text-lg mt-10 text-center">Your hero gear collection is empty!</p>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className="flex items-center bg-gray-800 p-4 rounded-lg shadow-md">
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-16 h-16 object-cover rounded-md mr-4" 
                                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/0f172a/e2e8f0?text=IMG" }}
                                />
                                <div className="flex-grow">
                                    <h4 className="text-lg font-semibold text-white">{item.name}</h4>
                                    <p className="text-indigo-400 font-bold">${item.price.toLocaleString()}</p>
                                </div>
                                <div className="flex items-center space-x-2 ml-4">
                                    <button 
                                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                        className="p-1 text-gray-300 bg-gray-700 rounded-full hover:bg-gray-600 disabled:opacity-50"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="text-white w-5 text-center">{item.quantity}</span>
                                    <button 
                                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                        className="p-1 text-gray-300 bg-gray-700 rounded-full hover:bg-gray-600"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <button 
                                    onClick={() => onRemoveItem(item.id)}
                                    className="ml-4 text-red-400 hover:text-red-500 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xl font-medium text-gray-300">Total:</span>
                        <span className="text-3xl font-extrabold text-indigo-400">${total.toLocaleString()}</span>
                    </div>
                    <button className="w-full bg-indigo-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/50">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

const Header = ({ cartCount, onOpenCart }) => (
    <header className="bg-gray-900/90 backdrop-blur-md sticky top-0 z-40 shadow-lg border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-8">
                <a href="#" className="text-2xl font-extrabold text-indigo-400 tracking-wider">
                    HERO.STORE
                </a>
                <nav className="hidden lg:flex space-x-6 text-gray-300">
                    <a href="#" className="hover:text-white transition-colors">Home</a>
                    <a href="#" className="hover:text-white transition-colors">New Arrivals</a>
                    <a href="#" className="hover:text-white transition-colors">Sale</a>
                </nav>
            </div>
            
            <div className="flex items-center space-x-4">
                <button className="text-gray-300 hover:text-white p-2 rounded-full transition-colors hidden sm:block">
                    <Search size={20} />
                </button>
                <button className="text-gray-300 hover:text-white p-2 rounded-full transition-colors hidden sm:block">
                    <User size={20} />
                </button>
                <button className="text-gray-300 hover:text-white p-2 rounded-full transition-colors relative">
                    <Heart size={20} />
                </button>
                
                <button 
                    onClick={onOpenCart}
                    className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-500 transition-colors relative shadow-lg shadow-indigo-500/50"
                >
                    <ShoppingCart size={20} />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-600 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-900">
                            {cartCount}
                        </span>
                    )}
                </button>
                
                <button className="text-gray-300 hover:text-white p-2 rounded-full transition-colors lg:hidden">
                    <Menu size={20} />
                </button>
            </div>
        </div>
    </header>
);

const App = () => {
    const [activeCategory, setActiveCategory] = useState('All Gear');
    const [cartItems, setCartItems] = useState([]);
    const [wishlist, setWishlist] = useState([2]); // Example item in wishlist
    const [isCartOpen, setIsCartOpen] = useState(false);

    const filteredProducts = products.filter(product => 
        activeCategory === 'All Gear' || product.category === activeCategory
    );

    const handleAddToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
        setIsCartOpen(true);
    };

    const handleUpdateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return handleRemoveItem(id);
        setCartItems(prevItems => 
            prevItems.map(item => 
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const handleRemoveItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };
    
    const handleToggleWishlist = (id) => {
        setWishlist(prevList => 
            prevList.includes(id) 
                ? prevList.filter(itemId => itemId !== id) 
                : [...prevList, id]
        );
    };

 
    return (
        <div className="min-h-screen bg-gray-900 text-gray-200">
            <Header cartCount={cartItems.length} onOpenCart={() => setIsCartOpen(true)} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <section className="mb-10">
                    <h1 className="text-5xl font-extrabold text-white leading-tight">
                        Arm yourself for the <span className="text-indigo-400">next mission.</span>
                    </h1>
                    <p className="mt-3 text-xl text-gray-400">
                        The highest-grade tactical and experimental gear available to registered heroes.
                    </p>
                </section>

                <CategoryFilter activeCategory={activeCategory} setCategory={setActiveCategory} />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            onAddToCart={handleAddToCart}
                            onToggleWishlist={handleToggleWishlist}
                            isInWishlist={wishlist.includes(product.id)}
                        />
                    ))}
                </div>
                
                {filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <Package size={48} className="mx-auto text-gray-600 mb-4" />
                        <p className="text-xl text-gray-500">No gear found in the selected category.</p>
                    </div>
                )}
            </main>

            <footer className="bg-gray-800/70 border-t border-gray-700/50 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-400 text-sm">
                    &copy; 2024 HERO.STORE. All rights reserved. | For Hero Use Only.
                </div>
            </footer>

            {isCartOpen && (
                <CartModal 
                    cartItems={cartItems} 
                    onClose={() => setIsCartOpen(false)} 
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveItem={handleRemoveItem}
                />
            )}
        </div>
    );
};

export default App;