import { motion } from 'framer-motion';
import { Github, Heart, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      className="bg-slate-900 dark:bg-slate-950 text-white py-8 sm:py-12 mt-12 sm:mt-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="space-y-3 sm:space-y-4 text-center md:text-left">
            <motion.div 
              className="flex items-center justify-center md:justify-start space-x-2 sm:space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg">
                <Github className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">GitHub Finder</h3>
                <p className="text-xs text-slate-400">Discover Developers</p>
              </div>
            </motion.div>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              A modern tool to discover and explore GitHub profiles, repositories, and contributions. 
              Built with React, TypeScript, and Tailwind CSS.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4 text-center md:text-left">
            <h4 className="text-base sm:text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-primary-400 transition-colors duration-200 flex items-center justify-center md:justify-start space-x-2"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <a 
                  href="https://docs.github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-primary-400 transition-colors duration-200 flex items-center justify-center md:justify-start space-x-2"
                >
                  <span>GitHub API</span>
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <a 
                  href="/slack" 
                  className="text-slate-400 hover:text-primary-400 transition-colors duration-200"
                >
                  Contact Us
                </a>
              </motion.li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="space-y-3 sm:space-y-4 text-center md:text-left">
            <h4 className="text-base sm:text-lg font-semibold text-white">Built With</h4>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'].map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-2 sm:px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs sm:text-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          className="border-t border-slate-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-xs sm:text-sm text-slate-400">
            © {currentYear} GitHub Finder. Made with{' '}
            <Heart className="inline w-3 h-3 sm:w-4 sm:h-4 text-red-500 mx-1" />
            {' '}for the developer community.
          </p>
          <p className="text-xs text-slate-500 mt-1 sm:mt-2">
            Inspired by modern design principles and built with cutting-edge technologies.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
