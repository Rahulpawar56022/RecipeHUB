import { useState } from 'react'
import { motion } from 'framer-motion'
import RecipeCard from '../components/RecipeCard'
import { FiEdit2, FiSettings, FiGrid, FiBookmark, FiUsers, FiAward } from 'react-icons/fi'

const profileData = {
  username: 'DemoUser', bio: 'Passionate home cook & food explorer 🍳', followers: 1250, following: 340,
  badges: ['🏆 Top Chef', '⭐ Rising Star', '🔥 100 Recipes'],
  recipes: [
    { id: 1, title: 'Butter Paneer Masala', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop', cookTime: '35 min', difficulty: 'Medium', rating: 4.8, calories: 380, category: 'Veg', author: { name: 'DemoUser' } },
    { id: 7, title: 'Mushroom Risotto', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop', cookTime: '40 min', difficulty: 'Medium', rating: 4.7, calories: 310, category: 'Veg', author: { name: 'DemoUser' } },
  ],
  saved: [
    { id: 3, title: 'Chocolate Lava Cake', image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop', cookTime: '45 min', difficulty: 'Hard', rating: 4.9, calories: 450, category: 'Desserts', author: { name: 'Sophie L.' } },
  ],
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState('recipes')

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-5xl font-bold text-white font-heading">
              {profileData.username.charAt(0)}
            </div>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-3xl font-heading font-bold text-white mb-1">{profileData.username}</h1>
              <p className="text-gray-400 mb-4">{profileData.bio}</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-6 mb-4">
                <div className="text-center"><span className="text-xl font-bold text-white">{profileData.recipes.length}</span><p className="text-xs text-gray-400">Recipes</p></div>
                <div className="text-center"><span className="text-xl font-bold text-white">{profileData.followers.toLocaleString()}</span><p className="text-xs text-gray-400">Followers</p></div>
                <div className="text-center"><span className="text-xl font-bold text-white">{profileData.following}</span><p className="text-xs text-gray-400">Following</p></div>
              </div>
              <div className="flex flex-wrap gap-2">
                {profileData.badges.map((b) => <span key={b} className="px-3 py-1 rounded-lg bg-primary-500/10 text-primary-400 text-xs font-medium">{b}</span>)}
              </div>
            </div>
            <button className="btn-secondary flex items-center gap-2 text-sm"><FiEdit2 className="w-4 h-4" /> Edit Profile</button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 glass rounded-xl w-fit">
          {[{ key: 'recipes', icon: FiGrid, label: 'My Recipes' }, { key: 'saved', icon: FiBookmark, label: 'Saved' }, { key: 'badges', icon: FiAward, label: 'Badges' }].map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.key ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white' : 'text-gray-400 hover:text-white'}`}>
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'recipes' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profileData.recipes.map((r, i) => <RecipeCard key={r.id} recipe={r} index={i} />)}
          </div>
        )}
        {activeTab === 'saved' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profileData.saved.map((r, i) => <RecipeCard key={r.id} recipe={r} index={i} />)}
          </div>
        )}
        {activeTab === 'badges' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {profileData.badges.map((b) => (
              <div key={b} className="glass rounded-2xl p-6 text-center card-hover">
                <div className="text-4xl mb-3">{b.split(' ')[0]}</div>
                <p className="text-white font-heading font-semibold">{b.split(' ').slice(1).join(' ')}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
