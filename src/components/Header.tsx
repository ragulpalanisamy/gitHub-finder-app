import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, MessageCircle, Home, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header 
      className="fixed top-0 right-0 left-0 z-40 border-b glass-effect border-white/20 dark:border-slate-700/50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2 sm:space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="p-1.5 sm:p-2 bg-gradient-to-r rounded-lg from-primary-500 to-primary-600">
              <Github className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
                GitHub Finder
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Discover Developers</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
                GitHub Finder
              </h1>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/" 
                className="flex items-center space-x-2 transition-colors duration-200 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/slack" 
                className="flex items-center space-x-2 transition-colors duration-200 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Contact</span>
              </Link>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 dark:hover:bg-slate-700/10 transition-colors duration-200"
            onClick={toggleMobileMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-700 dark:text-slate-300" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700 dark:text-slate-300" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 glass-effect border-t border-white/20 dark:border-slate-700/50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-4 space-y-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Link 
                  to="/" 
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 dark:hover:bg-slate-700/10 transition-colors duration-200 text-slate-700 dark:text-slate-300"
                >
                  <Home className="w-5 h-5" />
                  <span className="font-medium">Home</span>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Link 
                  to="/slack" 
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 dark:hover:bg-slate-700/10 transition-colors duration-200 text-slate-700 dark:text-slate-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">Contact</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
