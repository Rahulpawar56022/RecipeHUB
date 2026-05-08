import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiUsers, FiBook, FiBarChart2, FiCheck, FiX, FiTrendingUp, FiAlertTriangle } from 'react-icons/fi'

const stats = [
  { label: 'Total Users', value: '52,340', change: '+12%', icon: FiUsers, color: 'text-blue-400 bg-blue-400/10' },
  { label: 'Total Recipes', value: '10,892', change: '+8%', icon: FiBook, color: 'text-green-400 bg-green-400/10' },
  { label: 'Active Today', value: '3,210', change: '+24%', icon: FiTrendingUp, color: 'text-purple-400 bg-purple-400/10' },
  { label: 'Reports', value: '23', change: '-5%', icon: FiAlertTriangle, color: 'text-red-400 bg-red-400/10' },
]

const users = [
  { id: 1, name: 'Priya Sharma', email: 'priya@email.com', role: 'Chef', recipes: 45, status: 'Active' },
  { id: 2, name: 'Marco Rossi', email: 'marco@email.com', role: 'User', recipes: 12, status: 'Active' },
  { id: 3, name: 'Yuki Tanaka', email: 'yuki@email.com', role: 'Chef', recipes: 38, status: 'Active' },
  { id: 4, name: 'Test User', email: 'test@email.com', role: 'User', recipes: 0, status: 'Suspended' },
]

const pendingRecipes = [
  { id: 101, title: 'Spicy Ramen Bowl', author: 'Yuki T.', submitted: '2 hours ago' },
  { id: 102, title: 'Classic Tiramisu', author: 'Marco R.', submitted: '5 hours ago' },
  { id: 103, title: 'Vegan Pad Thai', author: 'Emma W.', submitted: '1 day ago' },
]

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('overview')

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-white mb-2">Admin <span className="gradient-text">Dashboard</span></h1>
          <p className="text-gray-400">Manage users, recipes, and platform analytics.</p>
        </motion.div>

        {/* Nav */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {['overview', 'users', 'recipes', 'reports'].map((s) => (
            <button key={s} onClick={() => setActiveSection(s)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium capitalize whitespace-nowrap transition-all ${activeSection === s ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white' : 'glass text-gray-300 hover:text-white'}`}>
              {s}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5 card-hover">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center`}><s.icon className="w-5 h-5" /></div>
                <span className={`text-xs font-medium ${s.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{s.change}</span>
              </div>
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Users Table */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-heading font-semibold text-white mb-4">Recent Users</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="text-gray-400 text-left border-b border-white/5">
                  <th className="pb-3 font-medium">User</th><th className="pb-3 font-medium">Role</th><th className="pb-3 font-medium">Recipes</th><th className="pb-3 font-medium">Status</th>
                </tr></thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3"><div><p className="text-white font-medium">{u.name}</p><p className="text-xs text-gray-500">{u.email}</p></div></td>
                      <td className="py-3 text-gray-400">{u.role}</td>
                      <td className="py-3 text-gray-400">{u.recipes}</td>
                      <td className="py-3"><span className={`px-2 py-0.5 rounded-md text-xs ${u.status === 'Active' ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'}`}>{u.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pending Approvals */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-heading font-semibold text-white mb-4">Pending Approvals</h3>
            <div className="space-y-3">
              {pendingRecipes.map((r) => (
                <div key={r.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <div>
                    <p className="text-white text-sm font-medium">{r.title}</p>
                    <p className="text-xs text-gray-500">by {r.author} · {r.submitted}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 flex items-center justify-center"><FiCheck className="w-4 h-4" /></button>
                    <button className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 flex items-center justify-center"><FiX className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Analytics Chart Placeholder */}
        <div className="glass rounded-2xl p-6 mt-6">
          <h3 className="text-lg font-heading font-semibold text-white mb-4 flex items-center gap-2"><FiBarChart2 className="text-primary-400" /> Analytics</h3>
          <div className="h-64 rounded-xl bg-gradient-to-br from-primary-500/5 to-accent-500/5 border border-white/5 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <p className="text-gray-400 text-sm">Analytics charts will render here</p>
              <p className="text-xs text-gray-500">Integrate Chart.js or Recharts for live data</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
