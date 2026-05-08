import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GiCookingPot } from 'react-icons/gi'
import { FiGithub, FiTwitter, FiInstagram, FiYoutube, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'

const footerLinks = {
  Explore: [
    { name: 'Recipes', path: '/recipes' },
    { name: 'AI Generator', path: '/ai-generator' },
    { name: 'Meal Planner', path: '/meal-planner' },
    { name: 'Community', path: '/community' },
  ],
  Categories: [
    { name: 'Vegetarian', path: '/recipes?category=veg' },
    { name: 'Non-Veg', path: '/recipes?category=nonveg' },
    { name: 'Desserts', path: '/recipes?category=desserts' },
    { name: 'Healthy', path: '/recipes?category=healthy' },
  ],
  Company: [
    { name: 'Careers', path: '#' },
    { name: 'Blog', path: '#' },
    { name: 'Privacy Policy', path: '#' },
    { name: 'Terms of Service', path: '#' },
  ],
}

const socialLinks = [
  { icon: FiGithub, href: '#', label: 'GitHub' },
  { icon: FiTwitter, href: '#', label: 'Twitter' },
  { icon: FiInstagram, href: '#', label: 'Instagram' },
  { icon: FiYoutube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/5">
      {/* Gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <GiCookingPot className="w-8 h-8 text-primary-400" />
              <span className="text-xl font-bold font-heading">
                <span className="gradient-text">Recipe</span>
                <span className="text-white">Hub</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Discover, create, and share delicious recipes with a community of food lovers. 
              Powered by AI for personalized meal planning.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <FiMail className="w-4 h-4 text-primary-400" />
                <span>hello@recipehub.com</span>
              </div>
              <div className="flex items-center gap-2">
                <FiMapPin className="w-4 h-4 text-primary-400" />
                <span>Mumbai, India</span>
              </div>
              <div className="flex items-center gap-2">
                <FiPhone className="w-4 h-4 text-primary-400" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>

          {/* Link Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-heading font-semibold mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-400 hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-white font-heading font-semibold mb-1">Subscribe to our newsletter</h4>
              <p className="text-sm text-gray-400">Get weekly recipe inspiration straight to your inbox.</p>
            </div>
            <form className="flex gap-2 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
              />
              <button type="submit" className="btn-primary text-sm !py-2.5 whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2026 RecipeHub. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary-400 hover:border-primary-500/50 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
