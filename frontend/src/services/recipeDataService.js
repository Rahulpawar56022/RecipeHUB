/**
 * Recipe Data Service
 * Provides search, filter, and retrieval operations on the pre-built recipe dataset.
 */
import recipesData from '../data/recipes.json'

// Cache for performance
let _allRecipes = null

function getAllRecipes() {
  if (!_allRecipes) {
    _allRecipes = recipesData
  }
  return _allRecipes
}

/**
 * Search recipes by query string (matches title and ingredients)
 */
export function searchRecipes(query) {
  if (!query || !query.trim()) return getAllRecipes()
  const q = query.toLowerCase().trim()
  const terms = q.split(/\s+/)
  
  return getAllRecipes().filter(recipe => {
    const titleLower = recipe.title.toLowerCase()
    const ingredientsText = (recipe.ingredients || []).join(' ').toLowerCase()
    const text = `${titleLower} ${ingredientsText} ${recipe.category || ''} ${recipe.cuisine || ''}`.toLowerCase()
    
    // All search terms must match somewhere
    return terms.every(term => text.includes(term))
  })
}

/**
 * Get a single recipe by ID
 */
export function getRecipeById(id) {
  const numId = parseInt(id, 10)
  return getAllRecipes().find(r => r.id === numId) || null
}

/**
 * Filter recipes by category
 */
export function getRecipesByCategory(category) {
  if (!category || category === 'All') return getAllRecipes()
  return getAllRecipes().filter(r => r.category === category)
}

/**
 * Get featured/popular recipes (top rated)
 */
export function getFeaturedRecipes(count = 6) {
  return [...getAllRecipes()]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, count)
}

/**
 * Get category counts
 */
export function getCategoryCounts() {
  const counts = {}
  getAllRecipes().forEach(r => {
    counts[r.category] = (counts[r.category] || 0) + 1
  })
  return counts
}

/**
 * Get total recipe count
 */
export function getTotalCount() {
  return getAllRecipes().length
}

/**
 * Combined search + filter + paginate
 */
export function queryRecipes({ search = '', category = 'All', page = 1, perPage = 12, sortBy = 'rating' }) {
  let results = getAllRecipes()
  
  // Filter by category
  if (category && category !== 'All') {
    results = results.filter(r => r.category === category)
  }
  
  // Search
  if (search && search.trim()) {
    const terms = search.toLowerCase().trim().split(/\s+/)
    results = results.filter(recipe => {
      const text = `${recipe.title} ${(recipe.ingredients || []).join(' ')} ${recipe.category} ${recipe.cuisine}`.toLowerCase()
      return terms.every(term => text.includes(term))
    })
  }
  
  // Sort
  if (sortBy === 'rating') {
    results = [...results].sort((a, b) => b.rating - a.rating)
  } else if (sortBy === 'calories-low') {
    results = [...results].sort((a, b) => a.calories - b.calories)
  } else if (sortBy === 'calories-high') {
    results = [...results].sort((a, b) => b.calories - a.calories)
  } else if (sortBy === 'name') {
    results = [...results].sort((a, b) => a.title.localeCompare(b.title))
  }
  
  const total = results.length
  const totalPages = Math.ceil(total / perPage)
  const start = (page - 1) * perPage
  const paginatedResults = results.slice(start, start + perPage)
  
  return {
    recipes: paginatedResults,
    total,
    totalPages,
    page,
    perPage,
  }
}

export default {
  searchRecipes,
  getRecipeById,
  getRecipesByCategory,
  getFeaturedRecipes,
  getCategoryCounts,
  getTotalCount,
  queryRecipes,
}
