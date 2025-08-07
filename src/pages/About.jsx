
import { motion } from 'framer-motion';

const skills = [
  { name: "Python", level: 95, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Flask", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
  { name: "React", level: 50, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Tailwind CSS", level: 50, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Docker", level: 70, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Home Assistant", level: 85, icon: "https://upload.wikimedia.org/wikipedia/en/4/49/Home_Assistant_logo_%282023%29.svg" }
];

const experiences = [
  // {
  //   role: "Example",
  //   company: "Company Name",
  //   period: "2023 - Present",
  //   description: "Example Description that explains what this role entailed.",
  //   technologies: ["C", "Python", "Assembly", "Git", "Docker"]
  // }
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function About() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <motion.div 
        className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24">
          <motion.div 
            className="text-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-4xl">
              👨‍💻
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                About
              </span>{' '}
              <span className="text-white">byNolo</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Passionate developer crafting digital experiences with modern technologies. 
              Turning ideas into reality, one line of code at a time.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Story Section */}
      <motion.section 
        className="py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
              My <span className="text-blue-400">Journey</span>
            </h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                I’m Sam - a Computer Science student at the University of Guelph and the creator of <strong>byNolo</strong>, a homegrown dev label for building self-hosted, creative, and fun digital projects. What started at a young age as a curiosity about how things work has become a constant drive to build smarter systems, automate everything, and make my own programs I use every day.
              </p>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                Whether it's designing a custom authentication platform for all my sites (<em>KeyN</em>), building a gamified task engine (<em>SideQuest</em>), rating music weekly with friends (<em>Vinyl Vote</em>), or building/running an ever-growing Discord bot (<em>The Problemed Child</em>), I pour a lot into making ideas real and fun.
              </p>
              <p className="text-xl text-gray-300 leading-relaxed">
                Outside of writing code, I love filming and editing videos, making smart home automations, and pushing myself to see what can be built next. Whether you’re here to collaborate, get inspired, or just take a look at what I have done, welcome to byNolo.
              </p>

            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        className="py-20 bg-gray-900/30"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px", amount: 0.1 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Technical <span className="text-blue-400">Skills</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Technologies and tools I work with to bring ideas to life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center p-1">
                    <img 
                      src={skill.icon}
                      alt={`${skill.name} logo`}
                      className="w-6 h-6"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
                    <span className="text-blue-400 font-medium">{skill.level}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full"
                    role="progressbar"
                    aria-valuenow={skill.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${skill.name} proficiency: ${skill.level} out of 100`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section 
        className="py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px", amount: 0.1 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Professional <span className="text-blue-400">Experience</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A timeline of my professional growth and contributions
            </p>
          </motion.div>

          {experiences.length === 0 ? (
            // Coming Soon Section
            <div className="flex flex-col items-center justify-center py-20">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-center"
              >
                {/* Coming Soon Icon */}
                <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                  <svg 
                    className="w-12 h-12 text-blue-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                </div>
                
                {/* Coming Soon Text */}
                <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Coming Soon
                </h3>
                
                <p className="text-gray-400 text-lg mb-6 max-w-md mx-auto leading-relaxed">
                  I'm currently building my professional portfolio. Check back soon for exciting updates!
                </p>
                
                {/* Animated dots */}
                <div className="flex items-center justify-center space-x-2">
                  {[0, 1, 2].map((index) => (
                    <motion.div
                      key={index}
                      className="w-2 h-2 bg-blue-400 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          ) : (
            // Experiences List
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative"
                >
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:border-blue-500/30 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
                        <p className="text-blue-400 font-medium text-lg">{exp.company}</p>
                      </div>
                      <span className="text-gray-400 text-sm md:text-base mt-2 md:mt-0">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              Core <span className="text-blue-400">Values</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🧠",
                  title: "Resourcefulness",
                  description: "I love solving problems with whatever tools are available. Whether it’s a home server, cloud service, or open source software, I make it work."
                },
                {
                  icon: "🎮",
                  title: "Entertainment",
                  description: "I enjoy building tools and sites that are not only functional but also fun to use. From Discord games to interactive web apps, I try to make things that people enjoy using."
                },
                {
                  icon: "🔐",
                  title: "Control",
                  description: "Controlling my own infrastructure and data is at the heart of everything I do. Self-hosting isn’t just a skill, it’s a mindset that shapes my work. But of course if you need a cloud solution, I can help with that too!"
                }
              ]
              .map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let's <span className="text-blue-400">Connect</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              I'm always interested in discussing new opportunities, interesting projects, 
              or just chatting about the latest in tech. Don't hesitate to reach out!
            </p>
            <motion.a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white font-medium rounded-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
