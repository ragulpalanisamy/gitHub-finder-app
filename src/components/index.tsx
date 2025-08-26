import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import Header from "./Header";
import Footer from "./Footer";
import SearchSection from "./SearchSection";
import StatsSection from "./StatsSection";
import ThemeToggle from "./ThemeToggle";

interface GitHubUser {
  avatar_url: string;
  login: string;
  name: string;
  location: string;
  company: string;
  bio: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
  created_at: string;
  updated_at: string;
  blog: string;
  twitter_username: string;
  email: string;
  hireable: boolean;
  type: string;
}

interface SearchFilters {
  sortBy: 'followers' | 'repos' | 'joined' | 'name';
  order: 'asc' | 'desc';
  minFollowers: number;
  minRepos: number;
}

function GithubFinder() {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularUsers, setPopularUsers] = useState<GitHubUser[]>([]);
  const [searchResults, setSearchResults] = useState<GitHubUser[]>([]);
  const [isSearchingMultiple, setIsSearchingMultiple] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    sortBy: 'followers',
    order: 'desc',
    minFollowers: 0,
    minRepos: 0
  });

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Load user data from local storage on page load
  useEffect(() => {
    const githubUsername = localStorage.getItem("githubUsername");
    if (githubUsername) {
      handleSearch(githubUsername);
    }
  }, []);

  // Fetch popular developers on component mount
  useEffect(() => {
    fetchPopularDevelopers();
  }, []);

  const fetchPopularDevelopers = async () => {
    const popularUsernames = [
      'balshaer', 'torvalds', 'gaearon', 'addyosmani', 'sindresorhus',
      'vuejs', 'facebook', 'microsoft', 'google', 'netflix',
      'vercel', 'prisma', 'tailwindlabs', 'framer', 'vercel'
    ];

    try {
      const users = await Promise.all(
        popularUsernames.slice(0, 12).map(async (username) => {
          try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (response.ok) {
              return await response.json();
            }
          } catch (error) {
            console.error(`Error fetching ${username}:`, error);
          }
          return null;
        })
      );

      const validUsers = users.filter(user => user !== null);
      setPopularUsers(validUsers);
    } catch (error) {
      console.error('Error fetching popular developers:', error);
    }
  };

  // Event listener for clear button
  const handleClear = () => {
    setSearchInputValue("");
    setUserData(null);
    setError(null);
    setSearchResults([]);
    localStorage.removeItem("githubUsername");
  };

  // Event listener for reset button
  const handleReset = () => {
    window.location.reload();
  };

  // Event listener for search button
  const handleSearch = async (username?: string) => {
    const searchTerm = username || searchInputValue;
    
    if (!searchTerm.trim()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.github.com/users/${searchTerm}`
      );
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("User not found! Please check the username and try again.");
        } else if (response.status === 403) {
          throw new Error("API rate limit exceeded. Please try again later.");
        } else {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
      }

      const userData: GitHubUser = await response.json();
      setUserData(userData);
      
      // Save to localStorage
      localStorage.setItem("githubUsername", searchTerm);
      
      // Add to recent searches
      const updatedSearches = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      
      // Update search input if not called with username parameter
      if (!username) {
        setSearchInputValue(searchTerm);
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      setError(errorMessage);
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Search for multiple users
  const handleSearchMultiple = async () => {
    if (!searchInputValue.trim()) {
      toast.error('Please enter a search term');
      return;
    }

    setIsSearchingMultiple(true);
    setError(null);

    try {
      // Search for users (GitHub API doesn't support user search directly, so we'll simulate it)
      // For now, we'll search for users with similar usernames
      const searchTerm = searchInputValue.trim();
      const similarUsers = popularUsers.filter(user => 
        user.login.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );

      // Apply filters
      const filteredResults = similarUsers.filter(user => 
        user.followers >= filters.minFollowers && 
        user.public_repos >= filters.minRepos
      );

      // Sort results
      filteredResults.sort((a, b) => {
        let aValue: any, bValue: any;
        
        switch (filters.sortBy) {
          case 'followers':
            aValue = a.followers || 0;
            bValue = b.followers || 0;
            break;
          case 'repos':
            aValue = a.public_repos || 0;
            bValue = b.public_repos || 0;
            break;
          case 'joined':
            aValue = new Date(a.created_at || '').getTime();
            bValue = new Date(b.created_at || '').getTime();
            break;
          case 'name':
            aValue = (a.name || a.login).toLowerCase();
            bValue = (b.name || b.login).toLowerCase();
            break;
          default:
            aValue = a.followers || 0;
            bValue = b.followers || 0;
        }

        if (filters.order === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });

      setSearchResults(filteredResults);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      setError(errorMessage);
      setSearchResults([]);
    } finally {
      setIsSearchingMultiple(false);
    }
  };

  // Handle recent search click
  const handleRecentSearch = (username: string) => {
    handleSearch(username);
  };

  // Handle popular developer click
  const handlePopularDeveloperClick = (username: string) => {
    handleSearch(username);
  };

  // Update filters
  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--toast-bg)',
            color: 'var(--toast-color)',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
          },
        }}
      />
      
      <Header />
      <ThemeToggle />

      <main>
        {/* Hero and Search Section */}
        <SearchSection
          onSearch={handleSearch}
          onClear={handleClear}
          onReset={handleReset}
          isLoading={isLoading}
          userData={userData}
        />

        {/* Search Filters and Multiple Results */}
        {!userData && (
          <motion.section 
            className="px-3 sm:px-4 pb-8 sm:pb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="max-w-6xl mx-auto">
              <div className="glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl mx-2 sm:mx-0">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 sm:mb-6 text-center">
                  Advanced Search & Filters
                </h3>
                
                {/* Search Input */}
                <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <input
                    type="text"
                    placeholder="Search for developers..."
                    value={searchInputValue}
                    onChange={(e) => setSearchInputValue(e.target.value)}
                    className="input-field flex-1"
                  />
                  <motion.button
                    onClick={handleSearchMultiple}
                    disabled={isSearchingMultiple}
                    className="btn-primary px-6 sm:px-8"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSearchingMultiple ? 'Searching...' : 'Search Multiple'}
                  </motion.button>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Sort By
                    </label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => updateFilters({ sortBy: e.target.value as any })}
                      className="input-field"
                    >
                      <option value="followers">Followers</option>
                      <option value="repos">Repositories</option>
                      <option value="joined">Join Date</option>
                      <option value="name">Name</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Order
                    </label>
                    <select
                      value={filters.order}
                      onChange={(e) => updateFilters({ order: e.target.value as any })}
                      className="input-field"
                    >
                      <option value="desc">Descending</option>
                      <option value="asc">Ascending</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Min Followers
                    </label>
                    <input
                      type="number"
                      value={filters.minFollowers}
                      onChange={(e) => updateFilters({ minFollowers: parseInt(e.target.value) || 0 })}
                      className="input-field"
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Min Repos
                    </label>
                    <input
                      type="number"
                      value={filters.minRepos}
                      onChange={(e) => updateFilters({ minRepos: parseInt(e.target.value) || 0 })}
                      className="input-field"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Search Results */}
                {searchResults.length > 0 && (
                  <div className="mt-4 sm:mt-6">
                    <h4 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3 sm:mb-4">
                      Search Results ({searchResults.length})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {searchResults.map((user, index) => (
                        <motion.div
                          key={user.login}
                          className="glass-effect rounded-lg sm:rounded-xl p-3 sm:p-4 cursor-pointer hover:bg-white/90 dark:hover:bg-slate-700/90 transition-all duration-300"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, y: -5 }}
                          onClick={() => handlePopularDeveloperClick(user.login)}
                        >
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <img 
                              src={user.avatar_url} 
                              alt={`${user.login}'s avatar`}
                              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                            />
                            <div className="flex-1 min-w-0">
                              <h5 className="font-semibold text-slate-800 dark:text-slate-200 truncate text-sm sm:text-base">
                                {user.name || user.login}
                              </h5>
                              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 truncate">
                                @{user.login}
                              </p>
                              <div className="flex space-x-2 sm:space-x-4 mt-1 sm:mt-2 text-xs text-slate-500 dark:text-slate-400">
                                <span>{user.followers} followers</span>
                                <span>{user.public_repos} repos</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        )}

        {/* Popular Developers Section */}
        {!userData && !isLoading && (
          <motion.section 
            className="px-3 sm:px-4 pb-8 sm:pb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <div className="max-w-6xl mx-auto">
              <div className="glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl mx-2 sm:mx-0">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-3 sm:mb-4">
                    Popular Developers to Explore
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-2">
                    Discover some of the most influential developers and open source contributors on GitHub
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {popularUsers.map((user, index) => (
                    <motion.div
                      key={user.login}
                      className="glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6 cursor-pointer hover:bg-white/90 dark:hover:bg-slate-700/90 transition-all duration-300 shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -10 }}
                      onClick={() => handlePopularDeveloperClick(user.login)}
                    >
                      <div className="text-center">
                        <motion.div 
                          className="mb-3 sm:mb-4"
                          whileHover={{ scale: 1.1 }}
                        >
                          <img 
                            src={user.avatar_url} 
                            alt={`${user.login}'s avatar`}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto border-4 border-primary-200 dark:border-primary-800 shadow-lg"
                          />
                        </motion.div>
                        
                        <h4 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                          {user.name || user.login}
                        </h4>
                        
                        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-2 sm:mb-3">
                          @{user.login}
                        </p>
                        
                        {user.bio && (
                          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-3 sm:mb-4 leading-relaxed line-clamp-2">
                            {user.bio}
                          </p>
                        )}
                        
                        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                          <div className="text-center">
                            <div className="text-sm sm:text-lg font-bold text-primary-600 dark:text-primary-400">
                              {user.followers?.toLocaleString() || '0'}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Followers</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm sm:text-lg font-bold text-primary-600 dark:text-primary-400">
                              {user.public_repos?.toLocaleString() || '0'}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Repos</div>
                          </div>
                        </div>
                        
                        {user.location && (
                          <div className="flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-2 sm:mb-3">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{user.location}</span>
                          </div>
                        )}
                        
                        <motion.button
                          className="w-full btn-primary text-xs sm:text-sm py-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          View Profile
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Recent Searches */}
        {recentSearches.length > 0 && !userData && (
          <motion.section 
            className="px-3 sm:px-4 pb-8 sm:pb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className="max-w-4xl mx-auto">
              <div className="glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl mx-2 sm:mx-0">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 sm:mb-6 text-center">
                  Recent Searches
                </h3>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                  {recentSearches.map((username, index) => (
                    <motion.button
                      key={username}
                      onClick={() => handleRecentSearch(username)}
                      className="px-3 sm:px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-full text-xs sm:text-sm font-medium transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      @{username}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="px-3 sm:px-4 pb-8 sm:pb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-4xl mx-auto">
                <div className="glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border-l-4 border-red-500 mx-2 sm:mx-0">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-red-800 dark:text-red-200">
                        Search Error
                      </h3>
                      <p className="text-sm sm:text-base text-red-600 dark:text-red-400">
                        {error}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Section */}
        <StatsSection />
      </main>

      <Footer />
    </div>
  );
}

export default GithubFinder;
