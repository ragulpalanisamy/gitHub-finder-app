import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, GitBranch, Star, Eye, TrendingUp, Zap } from 'lucide-react';

const StatsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    {
      icon: Users,
      value: '10M+',
      label: 'Developers',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      iconColor: 'text-blue-500',
    },
    {
      icon: GitBranch,
      value: '100M+',
      label: 'Repositories',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      iconColor: 'text-green-500',
    },
    {
      icon: Star,
      value: '500M+',
      label: 'Stars Given',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-500/10',
      iconColor: 'text-yellow-500',
    },
    {
      icon: Eye,
      value: '1B+',
      label: 'Profile Views',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      iconColor: 'text-purple-500',
    },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Instant search results with optimized API calls',
      color: 'text-orange-500',
    },
    {
      icon: TrendingUp,
      title: 'Real-time Data',
      description: 'Always up-to-date information from GitHub',
      color: 'text-green-500',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built for developers, by developers',
      color: 'text-blue-500',
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        <motion.div 
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${stat.bgColor} mb-4`}>
                <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
              </div>
              <motion.div
                className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
              >
                {stat.value}
              </motion.div>
              <p className="text-slate-600 dark:text-slate-400 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-200 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Why Choose GitHub Finder?
          </motion.h2>
          <motion.p
            className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Experience the power of modern web development with our feature-rich GitHub profile discovery tool
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="glass-effect rounded-2xl p-8 text-center card-hover"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-700 mb-6`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              Ready to Discover Amazing Developers?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Start exploring GitHub profiles and find your next collaboration partner or inspiration.
            </p>
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('search-input')?.focus()}
            >
              Start Searching Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
