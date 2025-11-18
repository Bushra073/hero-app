import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { appsData } from '../data/appsData';
import { Search, Star, Download, ArrowDownUp } from 'lucide-react';
import Loading from '../components/Loading';

// Helper component for app card display
const AppCard = ({ app }) => (
  <Link to={`/app/${app.id}`} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-100 hover:border-indigo-200 block">
    <div className="relative">
      <img src={app.image} alt={app.title} className="w-full h-48 object-cover rounded-lg mb-4" />
      <span className="absolute top-2 right-2 bg-indigo-500 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-md">
        {app.companyName}
      </span>
    </div>
    <h3 className="font-bold text-lg text-gray-900 truncate">{app.title}</h3>
    <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
      <span className="flex items-center gap-1 font-bold text-yellow-500"><Star size={14} className="fill-yellow-500" /> {app.ratingAvg}</span>
      <span className="flex items-center gap-1 text-gray-400"><Download size={14} /> {(app.downloads / 1000).toFixed(1)}K</span>
    </div>
  </Link>
);


const AllApps = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apps, setApps] = useState(appsData);
  const [sortOrder, setSortOrder] = useState(''); // 'desc' (High-Low) or 'asc' (Low-High)

  // Live Search Effect (with loading)
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate navigation/search delay as per requirements
    const timer = setTimeout(() => {
      let results = appsData.filter(app => 
        app.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      // Apply sorting after filtering
      if (sortOrder) {
        results.sort((a, b) => {
          if (sortOrder === 'desc') return b.downloads - a.downloads;
          return a.downloads - b.downloads;
        });
      }

      setApps(results);
      setIsLoading(false);
    }, 300); 

    return () => clearTimeout(timer);
  }, [searchTerm, sortOrder]);


  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
      {/* Title Section */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-900">The App Catalog</h2>
        <p className="text-gray-600 mt-2 text-lg">Browse our complete collection of Hero Apps.</p>
      </div>

      {/* Search & States Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Total Apps Count */}
        <span className="font-semibold text-gray-700 text-lg">
          <span className="text-indigo-600 font-extrabold">{appsData.length}</span> Total Apps Available
        </span>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search apps by title..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-shadow"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <ArrowDownUp size={18} className="text-indigo-600" />
          <select 
            className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort by Downloads</option>
            <option value="desc">Downloads: High → Low</option>
            <option value="asc">Downloads: Low → High</option>
          </select>
        </div>
      </div>

      {/* App Section */}
      {isLoading ? (
        <Loading />
      ) : apps.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {apps.map(app => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
          <p className="text-2xl text-gray-500">
            No Apps Found matching "{searchTerm}"
          </p>
          <button 
            onClick={() => setSearchTerm('')}
            className="mt-4 text-indigo-600 font-semibold hover:underline"
          >
            Clear Search to see all apps
          </button>
        </div>
      )}
    </div>
  );
};

export default AllApps;