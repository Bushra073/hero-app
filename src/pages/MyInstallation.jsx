import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Download, Package } from 'lucide-react';

const MyInstallation = () => {
  const [installedApps, setInstalledApps] = useState([]);
  const [sortOrder, setSortOrder] = useState('none'); // 'asc', 'desc', or 'none'
  const [showToast, setShowToast] = useState(null); // {message: string, type: 'success' | 'error'}
  const navigate = useNavigate();

  // Load installed apps from localStorage on mount
  useEffect(() => {
    loadApps();
  }, []);

  // Sort apps whenever the sort order changes
  useEffect(() => {
    if (sortOrder !== 'none') {
        applySort(sortOrder);
    } else {
        // Reload original order if sort is reset (requires storing original state, or sorting the full list)
        loadApps();
    }
  }, [sortOrder]);

  const loadApps = () => {
    const data = JSON.parse(localStorage.getItem('installedApps')) || [];
    setInstalledApps(data);
  };

  const applySort = (order) => {
    const sorted = [...installedApps].sort((a, b) => {
      if (order === 'desc') return b.downloads - a.downloads;
      return a.downloads - b.downloads;
    });
    setInstalledApps(sorted);
  };

  const handleUninstall = (id, title) => {
    // 1. Filter out the app
    const updatedList = installedApps.filter(app => app.id !== id);
    
    // 2. Update state and localStorage
    setInstalledApps(updatedList);
    localStorage.setItem('installedApps', JSON.stringify(updatedList));
    
    // 3. Show Toast
    setShowToast({ message: `Successfully uninstalled ${title}.`, type: 'success' });
    setTimeout(() => setShowToast(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in relative">
      {/* Custom Toast Message */}
      {showToast && (
        <div className={`fixed top-20 right-5 ${showToast.type === 'success' ? 'bg-indigo-600' : 'bg-red-500'} text-white px-6 py-3 rounded-xl shadow-xl z-50 transition-all duration-300`}>
          {showToast.message}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <Package size={32} className="text-indigo-600" />
            My Installations
        </h2>
        
        {/* Sort Dropdown */}
        <div className="flex items-center gap-3">
          <span className="text-gray-600 font-medium hidden sm:block">Sort by Downloads:</span>
          <select 
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 transition-shadow"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="none" disabled>Sort by Downloads</option>
            <option value="desc">High → Low</option>
            <option value="asc">Low → High</option>
          </select>
        </div>
      </div>

      {installedApps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {installedApps.map(app => (
            <div key={app.id} className="bg-white p-6 rounded-xl shadow-md flex flex-col border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex gap-4 mb-4 items-center">
                <img src={app.image} alt={app.title} className="w-20 h-20 min-w-20 rounded-xl object-cover shadow-sm" />
                <div>
                  <h3 className="font-bold text-xl text-gray-900 truncate">{app.title}</h3>
                  <p className="text-sm text-gray-500">{app.companyName}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                     <Download size={14} className="text-blue-400" /> Downloads: {(app.downloads / 1000).toFixed(1)}K
                  </div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-100 flex gap-3">
                <Link 
                  to={`/app/${app.id}`}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg text-center text-sm font-bold hover:bg-gray-200 transition-colors"
                >
                  View Details
                </Link>
                <button 
                  onClick={() => handleUninstall(app.id, app.title)}
                  className="flex-1 bg-red-50 text-red-600 py-3 rounded-lg text-center text-sm font-bold hover:bg-red-100 flex items-center justify-center gap-2 transition-colors"
                >
                  <Trash2 size={16} /> Uninstall
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-indigo-200 shadow-inner">
          <h3 className="text-2xl font-medium text-gray-400">
             You haven't installed any Hero Apps yet.
          </h3>
          <p className="text-gray-500 mt-2">Time to find your next productivity booster!</p>
          <button 
             onClick={() => navigate('/apps')}
             className="mt-6 bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700 transition-transform hover:-translate-y-0.5"
          >
            Explore App Catalog
          </button>
        </div>
      )}
    </div>
  );
};

export default MyInstallation;