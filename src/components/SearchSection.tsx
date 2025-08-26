import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Github, Users, MapPin, Building, User, Calendar, Star, GitBranch, Sparkles, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

interface SearchSectionProps {
  onSearch: (username: string) => void;
  onClear: () => void;
  onReset: () => void;
  isLoading: boolean;
  userData: any;
}

const SearchSection = ({ onSearch, onClear, onReset, isLoading, userData }: SearchSectionProps) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = () => {
    if (!searchInput.trim()) {
      toast.error('Please enter a GitHub username');
      return;
    }
    onSearch(searchInput.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="pt-20 sm:pt-24 pb-8 sm:pb-12 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative Elements - Hidden on mobile for performance */}
          <motion.div
            className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </motion.div>

          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl md:rounded-3xl mb-6 sm:mb-8 shadow-2xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <Github className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
          </motion.div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent px-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover GitHub Developers
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Find and explore GitHub profiles, repositories, and contributions with our powerful search tool
          </motion.p>

          {/* Feature Pills - Responsive grid */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 sm:mt-8 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {[
              { icon: Zap, text: "Lightning Fast", color: "from-orange-500 to-red-500" },
              { icon: Sparkles, text: "Real-time Data", color: "from-purple-500 to-pink-500" },
              { icon: Github, text: "GitHub API", color: "from-blue-500 to-cyan-500" }
            ].map((feature, index) => (
              <motion.div
                key={feature.text}
                className={`inline-flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r ${feature.color} text-white text-xs sm:text-sm font-medium shadow-lg`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <feature.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">{feature.text}</span>
                <span className="xs:hidden">{feature.text.split(' ')[0]}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Search Container */}
        <motion.div 
          className="glass-effect rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl border border-white/30 dark:border-slate-700/30 mx-2 sm:mx-0"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-3 sm:mb-4">
              Search for Developers
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Enter a GitHub username to discover their profile and contributions
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center space-y-4 sm:space-y-6 lg:space-y-0 lg:space-x-6">
            <div className="relative flex-1 w-full max-w-2xl">
              <Search className="absolute left-3 sm:left-5 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 sm:w-6 sm:h-6" />
              <input
                type="text"
                placeholder="Enter GitHub username (e.g., balshaer, torvalds)..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="input-field pl-10 sm:pl-14 pr-4 sm:pr-6 text-base sm:text-lg h-12 sm:h-16 shadow-lg"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
              <motion.button
                onClick={handleSearch}
                disabled={isLoading}
                className="btn-primary flex-1 lg:flex-none flex items-center justify-center space-x-2 sm:space-x-3 h-12 sm:h-16 px-6 sm:px-8 text-base sm:text-lg shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? (
                  <div className="w-4 h-4 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Search className="w-4 h-4 sm:w-6 sm:h-6" />
                    <span>Search</span>
                  </>
                )}
              </motion.button>
              
              <motion.button
                onClick={onClear}
                className="btn-secondary flex-1 lg:flex-none h-12 sm:h-16 px-6 sm:px-8 text-base sm:text-lg shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear
              </motion.button>
              
              <motion.button
                onClick={onReset}
                className="btn-secondary flex-1 lg:flex-none h-12 sm:h-16 px-6 sm:px-8 text-base sm:text-lg shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* User Data Display */}
        {userData && (
          <motion.div 
            className="mt-8 sm:mt-12 glass-effect rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl border border-white/30 dark:border-slate-700/30 mx-2 sm:mx-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
              {/* Profile Section */}
              <div className="text-center lg:text-left">
                <motion.div 
                  className="mb-6 sm:mb-8"
                  whileHover={{ scale: 1.05 }}
                >
                  <img 
                    src={userData.avatar_url} 
                    alt={`${userData.login}'s avatar`}
                    className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full mx-auto lg:mx-0 border-4 border-primary-200 dark:border-primary-800 shadow-2xl"
                  />
                </motion.div>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-2 sm:mb-3">
                  {userData.name || userData.login}
                </h2>
                
                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-4 sm:mb-6">
                  @{userData.login}
                </p>
                
                {userData.bio && (
                  <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 mb-4 sm:mb-6 leading-relaxed">
                    {userData.bio}
                  </p>
                )}
                
                <div className="space-y-2 sm:space-y-3">
                  {userData.location && (
                    <div className="flex items-center justify-center lg:justify-start space-x-2 sm:space-x-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>{userData.location}</span>
                    </div>
                  )}
                  
                  {userData.company && (
                    <div className="flex items-center justify-center lg:justify-start space-x-2 sm:space-x-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                      <Building className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>{userData.company}</span>
                    </div>
                  )}
                  
                  {userData.created_at && (
                    <div className="flex items-center justify-center lg:justify-start space-x-2 sm:space-x-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Joined {new Date(userData.created_at).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats Section */}
              <div className="space-y-6 sm:space-y-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4 sm:mb-6 text-center lg:text-left">
                  Statistics
                </h3>
                
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                  <motion.div 
                    className="glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-lg"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <Users className="w-8 h-8 sm:w-10 sm:h-10 text-primary-500 mx-auto mb-2 sm:mb-3" />
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200">
                      {userData.followers?.toLocaleString() || '0'}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Followers</div>
                  </motion.div>
                  
                  <motion.div 
                    className="glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-lg"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <User className="w-8 h-8 sm:w-10 sm:h-10 text-primary-500 mx-auto mb-2 sm:mb-3" />
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200">
                      {userData.following?.toLocaleString() || '0'}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Following</div>
                  </motion.div>
                  
                  <motion.div 
                    className="glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-lg"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <GitBranch className="w-8 h-8 sm:w-10 sm:h-10 text-primary-500 mx-auto mb-2 sm:mb-3" />
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200">
                      {userData.public_repos?.toLocaleString() || '0'}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Repositories</div>
                  </motion.div>
                  
                  <motion.div 
                    className="glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-lg"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <Star className="w-8 h-8 sm:w-10 sm:h-10 text-primary-500 mx-auto mb-2 sm:mb-3" />
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200">
                      {userData.public_gists?.toLocaleString() || '0'}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Gists</div>
                  </motion.div>
                </div>
                
                <motion.a
                  href={userData.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full flex items-center justify-center space-x-2 sm:space-x-3 h-12 sm:h-16 text-base sm:text-lg shadow-lg"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>View Profile on GitHub</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchSection;
