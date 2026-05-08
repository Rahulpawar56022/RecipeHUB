import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import RecipeCard from '../components/RecipeCard'
import { getFeaturedRecipes, getCategoryCounts, getTotalCount } from '../services/recipeDataService'
import { FiSearch, FiArrowRight, FiStar, FiTrendingUp } from 'react-icons/fi'
import { GiCookingPot, GiBroccoli, GiMeat, GiCakeSlice, GiHeartBeats, GiHamburger } from 'react-icons/gi'

const categoryIcons = [
  { name: 'Veg', key: 'Veg', icon: GiBroccoli, color: 'from-green-500 to-emerald-600' },
  { name: 'Non-Veg', key: 'Non-Veg', icon: GiMeat, color: 'from-red-500 to-rose-600' },
  { name: 'Desserts', key: 'Desserts', icon: GiCakeSlice, color: 'from-pink-500 to-fuchsia-600' },
  { name: 'Healthy', key: 'Healthy', icon: GiHeartBeats, color: 'from-cyan-500 to-teal-600' },
  { name: 'Fast Food', key: 'Fast Food', icon: GiHamburger, color: 'from-orange-500 to-amber-600' },
]

const trendingChefs = [
  { name: 'Priya Sharma', specialty: 'Indian Cuisine', followers: '12.5K', avatar: '👩‍🍳' },
  { name: 'Marco Rossi', specialty: 'Italian', followers: '9.8K', avatar: '👨‍🍳' },
  { name: 'Yuki Tanaka', specialty: 'Japanese', followers: '8.2K', avatar: '🧑‍🍳' },
  { name: 'Sophie Laurent', specialty: 'French Pastry', followers: '11.3K', avatar: '👩‍🍳' },
]

const testimonials = [
  { text: "RecipeHub transformed my cooking game! The AI recipe generator is mind-blowing.", name: 'Ananya R.', role: 'Home Cook', rating: 5 },
  { text: "Best meal planning app I've ever used. Saves me hours every week.", name: 'David K.', role: 'Fitness Enthusiast', rating: 5 },
  { text: "The community is amazing. I've learned so many techniques from fellow chefs!", name: 'Maria G.', role: 'Food Blogger', rating: 5 },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15 } }),
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const navigate = useNavigate()

  const featuredRecipes = getFeaturedRecipes(6)
  const categoryCounts = getCategoryCounts()
  const totalRecipes = getTotalCount()

  const categories = categoryIcons.map(c => ({
    ...c,
    count: categoryCounts[c.key] || 0,
  }))

  useEffect(() => {
    const timer = setInterval(() => setCurrentTestimonial((p) => (p + 1) % testimonials.length), 5000)
    return () => clearInterval(timer)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/recipes?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  // Pick the best recipe for "featured" section
  const featuredRecipe = featuredRecipes[0]

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-500/20 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-500/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary-500/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
              <span className="text-sm text-primary-300 font-medium">AI-Powered Recipe Platform</span>
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="text-5xl sm:text-6xl lg:text-8xl font-heading font-bold leading-tight mb-6">
              <span className="text-white">Cook </span><span className="gradient-text-warm">Smarter,</span><br />
              <span className="text-white">Eat </span><span className="gradient-text">Better</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Discover {totalRecipes}+ recipes, generate personalized meals with AI, and connect with a passionate community of food lovers.
            </motion.p>
            <motion.form variants={fadeUp} custom={3} className="max-w-xl mx-auto relative mb-10" onSubmit={handleSearch}>
              <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for recipes, ingredients, chefs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="hero-search-input"
                className="w-full pl-14 pr-36 py-4 rounded-2xl glass-strong text-white placeholder-gray-500 text-base focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary !rounded-xl !py-2.5 !px-6 text-sm">Search</button>
            </motion.form>
            <motion.div variants={fadeUp} custom={4} className="flex flex-wrap justify-center gap-4">
              <Link to="/recipes" className="btn-primary flex items-center gap-2 text-base">Explore Recipes <FiArrowRight /></Link>
              <Link to="/ai-generator" className="btn-secondary flex items-center gap-2 text-base"><GiCookingPot /> Try AI Generator</Link>
            </motion.div>
            <motion.div variants={fadeUp} custom={5} className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-16">
              {[{ label: 'Recipes', value: `${totalRecipes}+` }, { label: 'Users', value: '50K+' }, { label: 'Chefs', value: '2K+' }, { label: 'Countries', value: '45+' }].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold gradient-text font-heading">{s.value}</div>
                  <div className="text-sm text-gray-400 mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-3">Explore <span className="gradient-text">Categories</span></h2>
            <p className="text-gray-400 max-w-lg mx-auto">Browse through our curated collection of recipes.</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <motion.div key={cat.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Link to={`/recipes?category=${cat.key.toLowerCase()}`} className="group block glass rounded-2xl p-6 text-center card-hover">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <cat.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-heading font-semibold mb-1">{cat.name}</h3>
                  <p className="text-xs text-gray-400">{cat.count} recipes</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR RECIPES */}
      <section className="py-20 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-[120px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-3">Popular <span className="gradient-text-warm">Recipes</span></h2>
              <p className="text-gray-400">Trending recipes loved by our community.</p>
            </div>
            <Link to="/recipes" className="hidden sm:flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium">View All <FiArrowRight /></Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRecipes.map((recipe, i) => <RecipeCard key={recipe.id} recipe={recipe} index={i} />)}
          </div>
        </div>
      </section>

      {/* FEATURED RECIPE */}
      {featuredRecipe && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative glass rounded-3xl overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <div className="relative h-72 lg:h-auto">
                  <img src={featuredRecipe.image} alt={featuredRecipe.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0f0f23]/80 hidden lg:block" />
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-accent-500 text-white text-sm font-bold flex items-center gap-1">
                    <FiStar className="fill-current" /> Recipe of the Day
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="text-accent-400 text-sm font-semibold uppercase tracking-wider mb-2">Featured</span>
                  <h3 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">{featuredRecipe.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {featuredRecipe.ingredients?.slice(0, 5).join(', ')}...
                  </p>
                  <div className="flex flex-wrap gap-4 mb-6">
                    <span className="px-3 py-1 rounded-lg bg-white/5 text-sm text-gray-300">⏱ {featuredRecipe.cookTime}</span>
                    <span className="px-3 py-1 rounded-lg bg-white/5 text-sm text-gray-300">🔥 {featuredRecipe.calories} cal</span>
                    <span className="px-3 py-1 rounded-lg bg-yellow-400/10 text-sm text-yellow-400">⭐ {featuredRecipe.rating}</span>
                  </div>
                  <Link to={`/recipes/${featuredRecipe.id}`} className="btn-primary self-start flex items-center gap-2">View Recipe <FiArrowRight /></Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* TRENDING CHEFS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-3">Trending <span className="gradient-text">Chefs</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingChefs.map((chef, i) => (
              <motion.div key={chef.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="glass rounded-2xl p-6 text-center card-hover">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center text-4xl">{chef.avatar}</div>
                <h3 className="text-white font-heading font-semibold mb-1">{chef.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{chef.specialty}</p>
                <div className="flex items-center justify-center gap-1 text-sm text-primary-400 mb-4"><FiTrendingUp className="w-3.5 h-3.5" />{chef.followers}</div>
                <button className="w-full py-2 rounded-xl border border-primary-500/30 text-primary-400 text-sm font-medium hover:bg-primary-500/10 transition-colors">Follow</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative glass rounded-3xl p-8 sm:p-12 lg:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-accent-500/10" />
            <div className="relative">
              <div className="text-6xl mb-6">🤖</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">AI Recipe <span className="gradient-text-warm">Generator</span></h2>
              <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">Tell us what ingredients you have, and our AI will create the perfect recipe for you.</p>
              <Link to="/ai-generator" className="btn-primary text-lg !py-4 !px-10 inline-flex items-center gap-2">Try It Now <FiArrowRight /></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-3">What Our <span className="gradient-text">Users Say</span></h2>
          </motion.div>
          <motion.div key={currentTestimonial} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-2xl p-8 sm:p-12 text-center">
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-lg sm:text-xl text-gray-200 italic mb-6">"{testimonials[currentTestimonial].text}"</p>
            <p className="text-white font-heading font-semibold">{testimonials[currentTestimonial].name}</p>
            <p className="text-sm text-gray-400">{testimonials[currentTestimonial].role}</p>
          </motion.div>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setCurrentTestimonial(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentTestimonial ? 'bg-primary-400 w-8' : 'bg-white/20'}`} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
