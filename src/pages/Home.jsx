import React from 'react';
import { Link } from 'react-router-dom';
import { appsData } from '../data/appsData';
import { ArrowRight, Download, Star, Globe, Smartphone, Users } from 'lucide-react';

const Home = () => {
  // Get top 8 apps for the showcase
  const topApps = appsData.slice(0, 8);

  // Helper function to render star rating
  const RatingStars = ({ ratingAvg }) => {
    const stars = [];
    const fullStars = Math.floor(ratingAvg);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={14} 
          className={i < fullStars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
        />
      );
    }
    return <span className="flex items-center gap-0.5">{stars}</span>;
  };

  return (
    <div className="animate-fade-in">
      {/* 1. Banner Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">The Hero App Store</h1>
          <p className="text-xl text-indigo-100 mb-10 max-w-3xl mx-auto opacity-90">
            Find innovative applications built to maximize your productivity, health, and creativity.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#" className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-transform hover:scale-105 shadow-md">
              <Globe size={20} /> App Store
            </a>
            <a href="#" className="bg-indigo-800 text-white border border-indigo-500 px-8 py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-transform hover:scale-105 shadow-md">
              <Smartphone size={20} /> Play Store
            </a>
          </div>
        </div>
      </section>

      {/* 2. States Section */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Total Downloads", value: "15M+", icon: Download, color: "text-blue-600" },
            { label: "App Reviews", value: "35K+", icon: Users, color: "text-green-600" },
            { label: "Average Rating", value: "4.7/5", icon: Star, color: "text-yellow-600" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition-shadow hover:shadow-xl">
              <stat.icon size={28} className={`${stat.color} mb-3`} />
              <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Top Apps Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Top Rated & Trending</h2>
            <p className="text-gray-500 mt-1">Apps our users love the most.</p>
          </div>
          <Link to="/apps" className="text-indigo-600 font-bold flex items-center gap-1 hover:underline transition-colors">
            Show All Apps <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {topApps.map(app => (
            <Link to={`/app/${app.id}`} key={app.id} className="group bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-100 hover:border-indigo-200 block">
              <img src={app.image} alt={app.title} className="w-full h-40 object-cover rounded-lg mb-4 transform group-hover:scale-[1.02] transition-transform" />
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 truncate">{app.title}</h3>
              <p className="text-sm text-gray-500 mb-2 truncate">{app.companyName}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center gap-1 font-bold text-yellow-500"><RatingStars ratingAvg={app.ratingAvg} /> {app.ratingAvg}</span>
                <span className="flex items-center gap-1 text-gray-400"><Download size={14} /> {(app.downloads / 1000).toFixed(1)}K</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;