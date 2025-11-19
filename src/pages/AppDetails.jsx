import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { appsData } from '../data/appsData';
import { Star, Download, Users, HardDrive, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Loading from '../components/Loading';

const AppDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showToast, setShowToast] = useState(false);

  
  useEffect(() => {
    setIsLoading(true);
    const foundApp = appsData.find(a => a.id === parseInt(id));
    
    setTimeout(() => {
        if (foundApp) {
            setApp(foundApp);
          
            const installedApps = JSON.parse(localStorage.getItem('installedApps')) || [];
            const exists = installedApps.some(a => a.id === foundApp.id);
            setIsInstalled(exists);
        }
        setIsLoading(false);
    }, 500);

  }, [id]);

 
  const handleInstall = () => {
    if (!app) return;

    let installedApps = JSON.parse(localStorage.getItem('installedApps')) || [];
    
  
    if (installedApps.some(a => a.id === app.id)) return;
    

    const newInstallList = [...installedApps, app];
    localStorage.setItem('installedApps', JSON.stringify(newInstallList));
    
    setIsInstalled(true);
    

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (isLoading) return <Loading />;
  if (!app) return (
    <div className="p-20 text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Relevant Not Found</h1>
      <p className="text-lg text-gray-500">The application ID `{id}` could not be found in our database.</p>
      <button 
        onClick={() => navigate('/apps')}
        className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-700"
      >
        Browse All Apps
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in relative">
      
      {showToast && (
        <div className="fixed top-20 right-5 bg-green-500 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-2 z-50 transition-all duration-300">
          <CheckCircle size={20} />
          <span>"{app.title}" Successfully Installed!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      
        <div className="lg:col-span-1 sticky top-24 self-start">
          <img src={app.image} alt={app.title} className="w-full max-w-sm mx-auto lg:max-w-full rounded-2xl shadow-xl mb-6 object-cover" />
          
          <div className="flex flex-col gap-2">
            
            <button
              onClick={handleInstall}
              disabled={isInstalled}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                isInstalled 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-[1.01]'
              }`}
            >
              {isInstalled ? 'Installed' : 'Install App'}
            </button>
            <p className="text-sm text-center text-gray-400">
                {isInstalled ? "View your installation on the 'Installation' page." : "Install instantly to your device."}
            </p>
          </div>
        </div>

      
        <div className="lg:col-span-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">{app.title}</h1>
          <p className="text-xl text-indigo-600 font-medium mb-8">{app.companyName}</p>

         
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            <StatCard icon={Star} value={app.ratingAvg} label="Rating Avg" color="text-yellow-500" />
            <StatCard icon={Download} value={`${(app.downloads / 1000).toFixed(0)}K+`} label="Downloads" color="text-blue-500" />
            <StatCard icon={Users} value={app.reviews} label="Total Reviews" color="text-green-500" />
            <StatCard icon={HardDrive} value={`${app.size}MB`} label="App Size" color="text-purple-500" />
          </div>

          <div className="mb-10 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold mb-4 text-indigo-600 border-b pb-2">App Description</h3>
            <p className="text-gray-700 leading-relaxed text-base">{app.description}</p>
          </div>

        
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">User Ratings Breakdown</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={app.ratings} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis type="number" stroke="#ccc" />
                  <YAxis dataKey="name" type="category" width={70} tick={{fontSize: 12, fill: '#6B7280'}} />
                  <Tooltip 
                    formatter={(value, name, props) => [`${value} votes`, name]} 
                    contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                  />
                  <Bar dataKey="count" radius={[0, 8, 8, 0]} barSize={20}>
                     {/* Color the 5-star bar prominently */}
                     {app.ratings.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#4F46E5' : '#D1D5DB'} />
                     ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, value, label, color }) => (
    <div className="bg-white p-4 rounded-xl border border-gray-100 text-center shadow-sm">
        <Icon className={`mx-auto ${color} mb-2`} size={24} />
        <span className="block font-bold text-xl text-gray-900">{value}</span>
        <span className="text-xs text-gray-500">{label}</span>
    </div>
);

export default AppDetails;