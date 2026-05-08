import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import RecipeCard from '../components/RecipeCard'
import { queryRecipes, getCategoryCounts } from '../services/recipeDataService'
import { FiGrid, FiList, FiFilter, FiX, FiSearch, FiChevronDown } from 'react-icons/fi'

const categories = ['All', 'Veg', 'Non-Veg', 'Desserts', 'Healthy', 'Fast Food']

const sortOptions = [
  { value: 'rating', label: 'Top Rated' },
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'calories-low', label: 'Calories (Low)' },
  { value: 'calories-high', label: 'Calories (High)' },
]

export default function Recipes() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'All')
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [sortBy, setSortBy] = useState('rating')
  const [page, setPage] = useState(1)
  const [results, setResults] = useState({ recipes: [], total: 0, totalPages: 0, page: 1 })
  const categoryCounts = getCategoryCounts()

  // Re-query whenever filters change
  useEffect(() => {
    const result = queryRecipes({
      search: searchQuery,
      category: activeCategory,
      page,
      perPage: 12,
      sortBy,
    })
    setResults(result)
  }, [searchQuery, activeCategory, page, sortBy])

  // Sync URL params to state
  useEffect(() => {
    const urlSearch = searchParams.get('search') || ''
    const urlCategory = searchParams.get('category') || 'All'
    if (urlSearch !== searchQuery) setSearchQuery(urlSearch)
    if (urlCategory !== activeCategory) {
      // Normalize category from URL
      const normalized = categories.find(c => c.toLowerCase() === urlCategory.toLowerCase()) || 'All'
      setActiveCategory(normalized)
    }
  }, [searchParams])

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1)
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      if (searchQuery.trim()) {
        next.set('search', searchQuery)
      } else {
        next.delete('search')
      }
      return next
    })
  }

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat)
    setPage(1)
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      if (cat !== 'All') {
        next.set('category', cat.toLowerCase())
      } else {
        next.delete('category')
      }
      return next
    })
  }

  const handleLoadMore = () => {
    setPage(prev => prev + 1)
  }

  // For "load more" pattern, accumulate recipes
  const [allDisplayed, setAllDisplayed] = useState([])
  useEffect(() => {
    if (page === 1) {
      setAllDisplayed(results.recipes)
    } else {
      setAllDisplayed(prev => [...prev, ...results.recipes])
    }
  }, [results])

  // Reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [searchQuery, activeCategory, sortBy])

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-white mb-2">Discover <span className="gradient-text">Recipes</span></h1>
          <p className="text-gray-400">Browse through our collection of {results.total} delicious recipes.</p>
        </motion.div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative mb-8 max-w-2xl">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search recipes, ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            id="recipes-search-input"
            className="w-full pl-12 pr-28 py-3.5 rounded-2xl glass-strong text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary !rounded-xl !py-2 !px-5 text-sm">
            Search
          </button>
        </form>

        {/* Category + Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button key={cat} onClick={() => handleCategoryChange(cat)}
                id={`category-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === cat ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white' : 'glass text-gray-300 hover:text-white'}`}>
                {cat}
                {cat !== 'All' && categoryCounts[cat] && (
                  <span className="ml-1.5 text-xs opacity-70">({categoryCounts[cat]})</span>
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-gray-300 hover:text-white text-sm">
              <FiFilter className="w-4 h-4" /> Filters
            </button>
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-500/20 text-primary-400' : 'text-gray-400'}`}><FiGrid className="w-4 h-4" /></button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-500/20 text-primary-400' : 'text-gray-400'}`}><FiList className="w-4 h-4" /></button>
          </div>
        </div>

        {showFilters && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="glass rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-heading font-semibold">Filters</h3>
              <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-white"><FiX /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Difficulty</label>
                <select className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500">
                  <option className="bg-gray-900">All</option>
                  <option className="bg-gray-900">Easy</option>
                  <option className="bg-gray-900">Medium</option>
                  <option className="bg-gray-900">Hard</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Cuisine</label>
                <select className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500">
                  <option className="bg-gray-900">All</option>
                  <option className="bg-gray-900">Indian</option>
                  <option className="bg-gray-900">International</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value} className="bg-gray-900">{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* Search results info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-400">
            {searchQuery ? (
              <>Showing {allDisplayed.length} of {results.total} results for "<span className="text-primary-400">{searchQuery}</span>"</>
            ) : (
              <>{results.total} recipes found</>
            )}
          </p>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('')
                setSearchParams(prev => {
                  const next = new URLSearchParams(prev)
                  next.delete('search')
                  return next
                })
              }}
              className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1"
            >
              <FiX className="w-3.5 h-3.5" /> Clear search
            </button>
          )}
        </div>

        {/* Recipe Grid */}
        {allDisplayed.length > 0 ? (
          <>
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {allDisplayed.map((recipe, i) => <RecipeCard key={recipe.id} recipe={recipe} index={i} />)}
            </div>

            {/* Load More */}
            {page < results.totalPages && allDisplayed.length < results.total && (
              <div className="text-center mt-10">
                <button
                  onClick={handleLoadMore}
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  <FiChevronDown className="w-4 h-4" />
                  Load More Recipes
                </button>
              </div>
            )}
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="text-6xl mb-4">🍳</div>
            <h3 className="text-xl font-heading font-semibold text-white mb-2">No recipes found</h3>
            <p className="text-gray-400 text-sm">Try adjusting your search or filters to find what you're looking for.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
