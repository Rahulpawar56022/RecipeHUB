import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth APIs
export const authAPI = {
  login: (data) => API.post('/auth/login', data),
  signup: (data) => API.post('/auth/signup', data),
  googleLogin: (token) => API.post('/auth/google', { token }),
  forgotPassword: (email) => API.post('/auth/forgot-password', { email }),
}

// Recipe APIs
export const recipeAPI = {
  getAll: (params) => API.get('/recipes', { params }),
  getById: (id) => API.get(`/recipes/${id}`),
  create: (data) => API.post('/recipes', data),
  update: (id, data) => API.put(`/recipes/${id}`, data),
  delete: (id) => API.delete(`/recipes/${id}`),
  search: (query) => API.get('/recipes/search', { params: { q: query } }),
  getByCategory: (cat) => API.get(`/recipes/category/${cat}`),
  getFeatured: () => API.get('/recipes/featured'),
  getPopular: () => API.get('/recipes/popular'),
}

// User APIs
export const userAPI = {
  getProfile: (id) => API.get(`/users/${id}`),
  updateProfile: (data) => API.put('/users/profile', data),
  follow: (id) => API.post(`/users/${id}/follow`),
  unfollow: (id) => API.delete(`/users/${id}/follow`),
  saveRecipe: (id) => API.post(`/users/save/${id}`),
  unsaveRecipe: (id) => API.delete(`/users/save/${id}`),
  getSaved: () => API.get('/users/saved'),
}

// Review APIs
export const reviewAPI = {
  getByRecipe: (recipeId) => API.get(`/reviews/recipe/${recipeId}`),
  create: (data) => API.post('/reviews', data),
  delete: (id) => API.delete(`/reviews/${id}`),
}

// AI APIs
export const aiAPI = {
  generateRecipe: (ingredients) => API.post('/ai/generate', { ingredients }),
}

// Meal Plan APIs
export const mealPlanAPI = {
  get: (week) => API.get('/meal-plans', { params: { week } }),
  save: (data) => API.post('/meal-plans', data),
  generateGroceryList: (planId) => API.get(`/meal-plans/${planId}/grocery`),
}

// Community APIs
export const communityAPI = {
  getPosts: (params) => API.get('/community/posts', { params }),
  createPost: (data) => API.post('/community/posts', data),
  likePost: (id) => API.post(`/community/posts/${id}/like`),
  commentPost: (id, data) => API.post(`/community/posts/${id}/comments`, data),
  getLeaderboard: () => API.get('/community/leaderboard'),
}

// Admin APIs
export const adminAPI = {
  getUsers: () => API.get('/admin/users'),
  deleteUser: (id) => API.delete(`/admin/users/${id}`),
  getStats: () => API.get('/admin/stats'),
  approveRecipe: (id) => API.put(`/admin/recipes/${id}/approve`),
  getReports: () => API.get('/admin/reports'),
}

export default API
