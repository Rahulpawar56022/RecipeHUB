import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiHeart, FiMessageCircle, FiShare2, FiTrendingUp, FiAward } from 'react-icons/fi'

const posts = [
  { id: 1, user: 'Priya Sharma', avatar: '👩‍🍳', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=400&fit=crop', caption: 'My homemade Margherita Pizza turned out amazing! 🍕', likes: 234, comments: 18, time: '2h ago' },
  { id: 2, user: 'Marco Rossi', avatar: '👨‍🍳', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&h=400&fit=crop', caption: 'Butter Paneer Masala - first time trying Indian cuisine! 🇮🇳', likes: 189, comments: 24, time: '4h ago' },
  { id: 3, user: 'Sophie Laurent', avatar: '👩‍🍳', image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&h=400&fit=crop', caption: 'Chocolate Lava Cake for a special evening 🍫✨', likes: 312, comments: 31, time: '6h ago' },
]

const leaderboard = [
  { rank: 1, name: 'Priya Sharma', points: 2450, badge: '🥇' },
  { rank: 2, name: 'Marco Rossi', points: 2120, badge: '🥈' },
  { rank: 3, name: 'Sophie Laurent', points: 1980, badge: '🥉' },
  { rank: 4, name: 'Yuki Tanaka', points: 1750, badge: '4th' },
  { rank: 5, name: 'Arun Kumar', points: 1620, badge: '5th' },
]

const challenges = [
  { title: '30-Minute Meals', desc: 'Create a delicious meal in under 30 minutes', participants: 156, endDate: 'Ends in 3 days', emoji: '⏰' },
  { title: 'Healthy Week', desc: 'Share your healthiest recipe this week', participants: 89, endDate: 'Ends in 5 days', emoji: '🥗' },
]

export default function Community() {
  const [likedPosts, setLikedPosts] = useState([])
  const toggleLike = (id) => setLikedPosts(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-white mb-2">Community <span className="gradient-text">Feed</span></h1>
          <p className="text-gray-400">Connect with food lovers around the world.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feed */}
          <div className="lg:col-span-2 space-y-6">
            {posts.map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl overflow-hidden">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center text-xl">{post.avatar}</div>
                  <div><p className="text-white font-medium text-sm">{post.user}</p><p className="text-xs text-gray-500">{post.time}</p></div>
                </div>
                <img src={post.image} alt={post.caption} className="w-full h-72 object-cover" />
                <div className="p-4">
                  <div className="flex items-center gap-4 mb-3">
                    <button onClick={() => toggleLike(post.id)} className={`flex items-center gap-1 text-sm transition-colors ${likedPosts.includes(post.id) ? 'text-red-400' : 'text-gray-400 hover:text-red-400'}`}>
                      <FiHeart className={likedPosts.includes(post.id) ? 'fill-current' : ''} /> {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                    </button>
                    <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-white"><FiMessageCircle /> {post.comments}</button>
                    <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-white"><FiShare2 /> Share</button>
                  </div>
                  <p className="text-gray-300 text-sm">{post.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-heading font-semibold text-white mb-4 flex items-center gap-2"><FiTrendingUp className="text-primary-400" /> Leaderboard</h3>
              <div className="space-y-3">
                {leaderboard.map((u) => (
                  <div key={u.rank} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors">
                    <span className="text-lg w-8 text-center">{u.badge}</span>
                    <div className="flex-1"><p className="text-white text-sm font-medium">{u.name}</p><p className="text-xs text-gray-500">{u.points} points</p></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-heading font-semibold text-white mb-4 flex items-center gap-2"><FiAward className="text-accent-400" /> Challenges</h3>
              <div className="space-y-3">
                {challenges.map((c) => (
                  <div key={c.title} className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-2 mb-1"><span>{c.emoji}</span><h4 className="text-white text-sm font-semibold">{c.title}</h4></div>
                    <p className="text-xs text-gray-400 mb-2">{c.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{c.participants} participants</span>
                      <span className="text-xs text-primary-400">{c.endDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
