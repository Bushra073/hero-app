import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Home, AppWindow, HardDrive, Cpu, ExternalLink, 
  Download, Star, Search, Filter, Loader2, ArrowLeft, X, CheckCircle, ArrowRight 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';



const GITHUB_PROFILE_URL = "https://github.com/Bushra073";
const APP_STORE_URL = "https://www.apple.com/app-store/";
const PLAY_STORE_URL = "https://play.google.com/store";


const MOCK_APPS = [
    { 
        id: 1, 
        title: "ChronoSync Pro", 
        image: "https://placehold.co/100x100/1e40af/ffffff?text=CS", 
        downloads: 125340, 
        rating: 4.8, 
        reviews: 2580,
        description: "A professional-grade time synchronization and backup utility. ChronoSync ensures all your devices are precisely aligned, preventing data corruption and timeline anomalies.",
        reviewData: [
            { name: '1 Star', count: 120 },
            { name: '2 Stars', count: 50 },
            { name: '3 Stars', count: 210 },
            { name: '4 Stars', count: 800 },
            { name: '5 Stars', count: 1400 },
        ]
    },
    { 
        id: 2, 
        title: "AuraFlow VPN", 
        image: "https://placehold.co/100x100/a855f7/ffffff?text=AF", 
        downloads: 89123, 
        rating: 4.5, 
        reviews: 1560,
        description: "Secure your digital presence with military-grade encryption. AuraFlow provides seamless, lightning-fast virtual private networking across all continents.",
        reviewData: [
            { name: '1 Star', count: 90 },
            { name: '2 Stars', count: 80 },
            { name: '3 Stars', count: 300 },
            { name: '4 Stars', count: 600 },
            { name: '5 Stars', count: 490 },
        ]
    },
    { 
        id: 3, 
        title: "PixelForge Editor", 
        image: "https://placehold.co/100x100/059669/ffffff?text=PF", 
        downloads: 3050, 
        rating: 4.9, 
        reviews: 512,
        description: "The ultimate tool for high-fidelity raster and vector graphic editing. Create stunning visuals with AI-powered brushes and non-destructive layers.",
        reviewData: [
            { name: '1 Star', count: 5 },
            { name: '2 Stars', count: 7 },
            { name: '3 Stars', count: 30 },
            { name: '4 Stars', count: 170 },
            { name: '5 Stars', count: 300 },
        ]
    },
    { 
        id: 4, 
        title: "DataWave Analytics", 
        image: "https://placehold.co/100x100/dc2626/ffffff?text=DW", 
        downloads: 50020, 
        rating: 4.2, 
        reviews: 980,
        description: "Real-time data visualization platform for massive datasets. Identify trends, predict outcomes, and share insights with dynamic, interactive dashboards.",
        reviewData: [
            { name: '1 Star', count: 150 },
            { name: '2 Stars', count: 100 },
            { name: '3 Stars', count: 250 },
            { name: '4 Stars', count: 300 },
            { name: '5 Stars', count: 180 },
        ]
    }
];



const usePageNavigation = (initialPage) => {
    const [history, setHistory] = useState([{ page: initialPage, data: null }]);
    const [isNavigating, setIsNavigating] = useState(false);

    const currentPage = history[history.length - 1];

    const navigate = (page, data = null) => {
        setIsNavigating(true);
        setTimeout(() => { 
            setHistory(prev => [...prev, { page, data }]);
            setIsNavigating(false);
        }, 300);
    };

    const goBack = () => {
        if (history.length > 1) {
            setIsNavigating(true);
            setTimeout(() => { 
                setHistory(prev => prev.slice(0, -1));
                setIsNavigating(false);
            }, 300);
        }
    };

    return { currentPage, navigate, goBack, isNavigating, historyLength: history.length };
};

const useLocalStorageState = (key, defaultValue) => {
    const [state, setState] = useState(() => {
        try {
            const storedValue = window.localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : defaultValue;
        } catch (error) {
            console.error("Error reading localStorage key “" + key + "”:", error);
            return defaultValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(state));
        } catch (error) {
            console.error("Error writing localStorage key “" + key + "”:", error);
        }
    }, [key, state]);

    return [state, setState];
};



const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <p className="ml-3 text-lg text-gray-500">Loading...</p>
    </div>
);

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => onClose(), 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const icon = type === 'success' ? <CheckCircle className="w-6 h-6 mr-3 text-green-500" /> : <X className="w-6 h-6 mr-3 text-red-500" />;
    const bgColor = type === 'success' ? 'bg-green-50' : 'bg-red-50';
    const borderColor = type === 'success' ? 'border-green-400' : 'border-red-400';

    return (
        <div className={`fixed bottom-5 right-5 p-4 rounded-xl shadow-2xl border ${bgColor} ${borderColor} flex items-center z-[100]`}>
            {icon}
            <span className="text-gray-800 font-medium">{message}</span>
            <button onClick={onClose} className="ml-4 text-gray-400 hover:text-gray-600">
                <X size={18} />
            </button>
        </div>
    );
};



const BannerSection = ({ navigate }) => (
    <div className="relative overflow-hidden bg-white rounded-xl shadow-2xl mt-8">
        <div className="absolute inset-0 opacity-10" 
             style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23a5b4fc\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Cg id=\'circle-grid\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'10\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}>
        </div>
        <div className="max-w-4xl mx-auto py-16 px-4 text-center relative z-10">
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                Discover Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Digital Tool</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Explore a curated selection of high-performance applications designed to enhance your productivity and creativity.
            </p>
            <div className="flex justify-center space-x-4">
                <button 
                    onClick={() => window.open(APP_STORE_URL, '_blank')}
                    className="flex items-center bg-black text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-800 transition-all transform hover:scale-[1.02] shadow-xl shadow-black/30"
                >
                    <ExternalLink className="w-5 h-5 mr-2" /> App Store
                </button>
                <button 
                    onClick={() => window.open(PLAY_STORE_URL, '_blank')}
                    className="flex items-center bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition-all transform hover:scale-[1.02] shadow-xl shadow-blue-500/30"
                >
                    <ExternalLink className="w-5 h-5 mr-2" /> Play Store
                </button>
            </div>
            <button 
                onClick={() => navigate('apps')}
                className="mt-12 text-blue-600 font-semibold hover:text-blue-700 transition-colors flex items-center mx-auto group"
            >
                Show All Apps 
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    </div>
);

const AppCard = ({ app, navigate, isInstalled = false, onUninstall }) => {
    const handleCardClick = () => {
        if (onUninstall) return; 
        navigate('details', app.id);
    };

    return (
        <div 
            className={`group bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col ${onUninstall ? '' : 'cursor-pointer hover:scale-[1.01]'}`}
            onClick={handleCardClick}
        >
            <div className="p-4 flex items-start space-x-4 border-b border-gray-100">
                <img 
                    src={app.image} 
                    alt={app.title} 
                    className="w-16 h-16 rounded-xl object-cover shadow-md flex-shrink-0" 
                />
                <div className="flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{app.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <span>{app.rating}</span>
                        <span className="mx-2">•</span>
                        <Download className="w-4 h-4 mr-1 text-gray-400" />
                        <span>{(app.downloads / 1000).toFixed(1)}K</span>
                    </div>
                </div>
            </div>
            
            {onUninstall && (
                <div className="p-4 pt-3 flex justify-end">
                    <button
                        onClick={(e) => { e.stopPropagation(); onUninstall(app.id); }}
                        className="flex items-center px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition-colors active:scale-95 shadow-md"
                    >
                        <X className="w-4 h-4 mr-1" /> Uninstall
                    </button>
                </div>
            )}
        </div>
    );
};



const HeaderNavbar = ({ currentPage, navigate, historyLength }) => {
    const navLinks = [
        { page: 'home', title: 'Home', icon: Home, path: '/home' },
        { page: 'apps', title: 'Apps', icon: AppWindow, path: '/apps' },
        { page: 'installations', title: 'My Installation', icon: HardDrive, path: '/installation' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center">
                       
                        {currentPage.page !== 'home' && historyLength > 1 && (
                            <button 
                                onClick={() => navigate('back')} // 
                                className="p-2 mr-4 text-gray-600 hover:text-blue-600 transition-colors rounded-full hover:bg-gray-100"
                            >
                                <ArrowLeft size={24} />
                            </button>
                        )}
                      
                        <div className="flex items-center cursor-pointer group" onClick={() => navigate('home')}>
                            <Cpu className="w-8 h-8 text-blue-600 mr-2 transform group-hover:rotate-12 transition-transform" />
                            <span className="text-2xl font-extrabold tracking-tight text-gray-900">
                                App<span className="text-blue-600">Bay</span>
                            </span>
                        </div>
                    </div>

                 
                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <button
                                key={link.page}
                                onClick={() => navigate(link.page)}
                                className={`flex items-center px-3 py-2 rounded-lg font-medium transition-all ${
                                    currentPage.page === link.page
                                        ? 'bg-blue-50 text-blue-600 font-bold shadow-inner'
                                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                                }`}
                            >
                                <link.icon className="w-5 h-5 mr-1" />
                                {link.title}
                            </button>
                        ))}
                    </div>

                  
                    <button 
                        onClick={() => window.open(GITHUB_PROFILE_URL, '_blank')}
                        className="bg-purple-600 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg hover:bg-purple-700 active:scale-95 transition-all hidden sm:flex items-center"
                    >
                        <ExternalLink className="w-4 h-4 mr-1" /> Contribution
                    </button>
                </div>
            </div>
        </nav>
    );
};

const HomePage = ({ navigate }) => (
    <div className="py-8">
        <BannerSection navigate={navigate} />
        
        <div className="max-w-7xl mx-auto mt-16 px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">Featured Apps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_APPS.slice(0, 4).map(app => (
                    <AppCard key={app.id} app={app} navigate={navigate} />
                ))}
            </div>
        </div>
    </div>
);

const AllAppsPage = ({ navigate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('high-low');

    const handleSearchChange = useCallback((e) => {
        setSearchTerm(e.target.value);
    }, []);

    const sortedAndFilteredApps = useMemo(() => {
        let apps = MOCK_APPS.filter(app => 
            app.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

      
        if (sortBy === 'high-low') {
            apps.sort((a, b) => b.downloads - a.downloads);
        } else if (sortBy === 'low-high') {
            apps.sort((a, b) => a.downloads - b.downloads);
        }

        return apps;
    }, [searchTerm, sortBy]);

    return (
        <div className="py-8">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">The App Catalog</h1>
                <p className="text-lg text-gray-600">Browse all available applications for every platform.</p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mb-8 p-4 bg-white rounded-xl shadow-md border border-gray-100">
                <p className="text-md font-semibold text-gray-700 mb-4 md:mb-0">
                    Total Apps: <span className="text-blue-600">{MOCK_APPS.length}</span> / Displaying: <span className="text-blue-600">{sortedAndFilteredApps.length}</span>
                </p>

                <div className="flex space-x-4 w-full md:w-auto">
                   
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search apps by title..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                        />
                    </div>

                  
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:ring-blue-500 focus:border-blue-500 cursor-pointer text-gray-700"
                        >
                            <option value="high-low">Downloads: High-Low</option>
                            <option value="low-high">Downloads: Low-High</option>
                        </select>
                        <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

           
            {sortedAndFilteredApps.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {sortedAndFilteredApps.map(app => (
                        <AppCard key={app.id} app={app} navigate={navigate} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl shadow-lg border border-dashed border-gray-300 mt-8">
                    <X className="w-10 h-10 text-red-400 mx-auto mb-4" />
                    <p className="text-xl font-medium text-gray-600">No App Found matching "{searchTerm}".</p>
                </div>
            )}
        </div>
    );
};

const AppDetailsPage = ({ appId, navigate, installedApps, handleInstall }) => {
    const app = MOCK_APPS.find(a => a.id === appId);
    const isInstalled = installedApps.some(item => item.id === appId);

    if (!app) {
        return (
            <div className="text-center py-20 bg-white rounded-xl shadow-lg border border-dashed border-gray-300 mt-8">
                <p className="text-xl font-medium text-gray-600">Error: App with ID "{appId}" Not Found.</p>
                <button onClick={() => navigate('apps')} className="mt-4 text-blue-600 hover:underline">
                    Back to All Apps
                </button>
            </div>
        );
    }

    const { title, image, rating, downloads, reviews, description, reviewData } = app;

    return (
        <div className="py-8">
           
            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100 mb-10 flex flex-col lg:flex-row gap-8">
               
                <div className="flex flex-col items-center lg:items-start lg:w-1/3">
                    <img 
                        src={image} 
                        alt={title} 
                        className="w-32 h-32 rounded-2xl object-cover shadow-2xl mb-6" 
                    />
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2 text-center lg:text-left">{title}</h1>
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="flex items-center text-lg text-gray-700">
                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
                            <span className="font-semibold">{rating}</span>
                        </div>
                        <div className="flex items-center text-lg text-gray-700">
                            <Download className="w-5 h-5 mr-1 text-blue-500" />
                            <span className="font-semibold">{downloads.toLocaleString()} Downloads</span>
                        </div>
                        <div className="text-lg text-gray-700">
                            <span className="font-semibold">{reviews.toLocaleString()} Reviews</span>
                        </div>
                    </div>
                    
                    <button
                        onClick={() => handleInstall(app)}
                        disabled={isInstalled}
                        className={`w-full lg:w-auto px-8 py-3 rounded-full font-bold text-lg transition-all active:scale-95 shadow-lg ${
                            isInstalled 
                                ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                                : 'bg-green-600 text-white hover:bg-green-700 shadow-green-500/30'
                        }`}
                    >
                        {isInstalled ? 'Installed' : 'Install'}
                    </button>
                </div>

                <div className="lg:w-2/3">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Review Distribution</h2>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart 
                                data={reviewData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="name" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip 
                                    contentStyle={{ 
                                        borderRadius: '8px', 
                                        border: '1px solid #e5e7eb', 
                                        backgroundColor: '#ffffff' 
                                    }}
                                    formatter={(value) => [`${value} votes`, 'Count']}
                                />
                                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

          
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Description</h2>
                <p className="text-gray-700 leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};

const MyInstallationPage = ({ installedApps, handleUninstall }) => {
    return (
        <div className="py-8">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">My Installations</h1>
                <p className="text-lg text-gray-600">The apps currently installed on your local system.</p>
            </div>

            {installedApps.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl shadow-lg border border-dashed border-gray-300 mt-8">
                    <HardDrive className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-xl font-medium text-gray-600">You don't have any apps installed yet.</p>
                    <p className="text-gray-500 mt-2">Visit the App Catalog to get started.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {installedApps.map(app => (
                        <AppCard key={app.id} app={app} onUninstall={handleUninstall} />
                    ))}
                </div>
            )}
        </div>
    );
};

const ErrorPage = ({ navigate }) => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-8xl font-extrabold text-red-500">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mt-4 mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8">
            The route you were looking for doesn't exist.
        </p>
        <button
            onClick={() => navigate('home')}
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg active:scale-95"
        >
            Go Home
        </button>
    </div>
);




const App = () => {
    
    const { currentPage, navigate: internalNavigate, isNavigating, historyLength, goBack } = usePageNavigation('home');
   
    const [installedApps, setInstalledApps] = useLocalStorageState('installedApps', []);

    
    const [toast, setToast] = useState(null);

    const navigate = useCallback((page, data) => {
        if (page === 'back') {
            goBack();
        } else {
            internalNavigate(page, data);
        }
    }, [internalNavigate, goBack]);

    const handleInstall = (app) => {
        if (!installedApps.some(item => item.id === app.id)) {
            const newInstalledApp = { id: app.id, title: app.title, image: app.image, downloads: app.downloads, rating: app.rating };
            setInstalledApps(prev => [...prev, newInstalledApp]);
            setToast({ message: `${app.title} installed successfully!`, type: 'success' });
        }
    };

   
    const handleUninstall = (appId) => {
        const uninstalledApp = installedApps.find(a => a.id === appId);
        if (uninstalledApp) {
            setInstalledApps(prev => prev.filter(app => app.id !== appId));
            setToast({ message: `${uninstalledApp.title} has been uninstalled.`, type: 'success' });
        }
    };

    let content;
    if (isNavigating) {
        content = <LoadingSpinner />;
    } else {
        switch (currentPage.page) {
            case 'home':
                content = <HomePage navigate={navigate} />;
                break;
            case 'apps':
                content = <AllAppsPage navigate={navigate} />;
                break;
            case 'details':
                content = <AppDetailsPage 
                            appId={currentPage.data} 
                            navigate={navigate} 
                            installedApps={installedApps}
                            handleInstall={handleInstall}
                          />;
                break;
            case 'installations':
                content = <MyInstallationPage installedApps={installedApps} handleUninstall={handleUninstall} />;
                break;
            default:
                content = <ErrorPage navigate={navigate} />;
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <HeaderNavbar currentPage={currentPage} navigate={navigate} historyLength={historyLength} />
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                {content}
            </main>

            {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        </div>
    );
};

export default App;