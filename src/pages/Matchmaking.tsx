import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, MapPin, Heart, Search, X, MessageCircle, Info, ChevronDown } from 'lucide-react';
import PhotoSphere from '../components/PhotoSphere';

const INITIAL_USERS = [
  { id: 1, name: "陈子轩", age: 26, location: "上海", mbti: "INTJ", match: 95, tags: ["摄影", "独立音乐", "猫奴"], image: "https://picsum.photos/seed/man1/400/500", bio: "平时喜欢带着相机到处走走，记录生活。希望能遇到一个愿意和我一起探索世界的女孩。", isLiked: false },
  { id: 2, name: "林悦", age: 24, location: "杭州", mbti: "ENFP", match: 88, tags: ["探店", "剧本杀", "乐观"], image: "https://picsum.photos/seed/woman1/400/500", bio: "资深吃货，周末不是在探店就是在去探店的路上。性格开朗，希望能找个能接住我奇思妙想的人。", isLiked: false },
  { id: 3, name: "张宇航", age: 28, location: "北京", mbti: "ENTJ", match: 82, tags: ["创业", "健身", "自律"], image: "https://picsum.photos/seed/man2/400/500", bio: "目前在创业阶段，比较忙但会平衡好生活。坚持健身5年，相信自律带来自由。", isLiked: false },
  { id: 4, name: "苏婉", age: 25, location: "成都", mbti: "ISFJ", match: 91, tags: ["烘焙", "古典乐", "温柔"], image: "https://picsum.photos/seed/woman2/400/500", bio: "喜欢安静的周末，烤点饼干听听音乐。希望能遇到一个温柔体贴，懂得互相照顾的人。", isLiked: false },
  { id: 5, name: "李明哲", age: 27, location: "深圳", mbti: "INTP", match: 79, tags: ["极客", "科幻", "慢热"], image: "https://picsum.photos/seed/man3/400/500", bio: "程序员一枚，业余喜欢看科幻小说和折腾数码产品。比较慢热，但熟了之后话很多。", isLiked: false },
  { id: 6, name: "王语嫣", age: 23, location: "广州", mbti: "ESFP", match: 85, tags: ["旅行", "美食", "派对"], image: "https://picsum.photos/seed/woman3/400/500", bio: "人生苦短，及时行乐！喜欢尝试新鲜事物，希望能找个能陪我一起疯一起闹的伴侣。", isLiked: false },
];

export default function Matchmaking() {
  const [showFilters, setShowFilters] = useState(false);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const toggleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setUsers(users.map(u => u.id === id ? { ...u, isLiked: !u.isLiked } : u));
  };

  return (
    <div className="relative">
      {/* 3D Photo Sphere Hero Section */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-dark-ink">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-soft-rose/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-peach/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative z-10 w-full flex-grow flex flex-col items-center justify-center pt-8">
          <div className="text-center space-y-4 mb-4 pointer-events-none relative z-20">
            <h1 className="text-4xl md:text-6xl font-serif text-white font-bold tracking-wider drop-shadow-lg">
              遇见 <span className="text-accent-peach italic">心动</span>
            </h1>
            <p className="text-white/70 text-lg tracking-widest drop-shadow-md">转动星球，发现你的缘分</p>
          </div>
          <PhotoSphere />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-8 z-20 flex flex-col items-center text-white/70 cursor-pointer hover:text-white transition-colors"
          onClick={() => {
            document.getElementById('explore-matches')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-sm font-medium tracking-widest mb-2">下滑探索更多</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      <div className="relative">
        {/* Smooth Gradient Transition */}
        <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-dark-ink to-transparent pointer-events-none -mt-1 z-0"></div>

        <div id="explore-matches" className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 relative z-10 pt-12 md:pt-16">
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-4xl font-serif text-white drop-shadow-md">相亲匹配</h2>
            <p className="text-white/80 mt-2 text-lg drop-shadow-md">基于性格与兴趣的深度契合度推荐</p>
          </div>
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="text" 
                placeholder="搜索昵称或标签..." 
                className="w-full md:w-72 pl-12 pr-4 py-3 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-accent-peach bg-white/90 backdrop-blur-sm shadow-lg transition-all text-dark-ink placeholder:text-gray-500"
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`p-3 rounded-full transition-all shadow-lg backdrop-blur-sm ${showFilters ? 'bg-accent-peach text-white' : 'bg-white/90 text-dark-ink hover:bg-white'}`}
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            className="glass-card p-8 rounded-[2rem] grid grid-cols-1 md:grid-cols-4 gap-6 overflow-hidden"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-dark-ink">性别要求</label>
              <select className="w-full p-3 rounded-xl border border-gray-200 bg-white/50 outline-none focus:ring-2 focus:ring-accent-peach/20 focus:border-accent-peach transition-all">
                <option>不限</option>
                <option>男生</option>
                <option>女生</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-dark-ink">年龄范围</label>
              <select className="w-full p-3 rounded-xl border border-gray-200 bg-white/50 outline-none focus:ring-2 focus:ring-accent-peach/20 focus:border-accent-peach transition-all">
                <option>不限</option>
                <option>20 - 25岁</option>
                <option>26 - 30岁</option>
                <option>30岁以上</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-dark-ink">所在城市</label>
              <select className="w-full p-3 rounded-xl border border-gray-200 bg-white/50 outline-none focus:ring-2 focus:ring-accent-peach/20 focus:border-accent-peach transition-all">
                <option>不限</option>
                <option>北京</option>
                <option>上海</option>
                <option>广州</option>
                <option>深圳</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-dark-ink">MBTI性格</label>
              <select className="w-full p-3 rounded-xl border border-gray-200 bg-white/50 outline-none focus:ring-2 focus:ring-accent-peach/20 focus:border-accent-peach transition-all">
                <option>不限</option>
                <option>I人 (内向)</option>
                <option>E人 (外向)</option>
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Users Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((user, i) => (
          <motion.div 
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelectedUser(user)}
            className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer flex flex-col h-full"
          >
            <div className="relative h-80 overflow-hidden flex-shrink-0">
              <img 
                src={user.image} 
                alt={user.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30 text-white text-sm font-medium flex items-center shadow-lg">
                <Heart className="w-3.5 h-3.5 mr-1.5 fill-accent-peach text-accent-peach" />
                契合度 {user.match}%
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-3xl font-serif font-bold flex items-center drop-shadow-md">
                      {user.name} <span className="text-xl font-sans font-normal ml-2 opacity-90">{user.age}</span>
                    </h3>
                    <div className="flex items-center text-sm opacity-90 mt-1.5 drop-shadow-md">
                      <MapPin className="w-3.5 h-3.5 mr-1" /> {user.location}
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg text-sm font-mono font-bold border border-white/20 shadow-lg">
                    {user.mbti}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow justify-between space-y-6">
              <div className="flex flex-wrap gap-2">
                {user.tags.map(tag => (
                  <span key={tag} className="badge bg-gray-50 border-gray-100 text-muted-olive">{tag}</span>
                ))}
              </div>
              
              <div className="flex gap-3 mt-auto">
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedUser(user); }}
                  className="flex-1 bg-gray-50 text-dark-ink py-3.5 rounded-xl font-medium hover:bg-gray-100 transition-colors border border-gray-100"
                >
                  查看主页
                </button>
                <button 
                  onClick={(e) => toggleLike(e, user.id)}
                  className={`flex-1 py-3.5 rounded-xl font-medium transition-all flex items-center justify-center border ${user.isLiked ? 'bg-accent-peach text-white border-accent-peach shadow-md' : 'bg-dark-ink text-white border-dark-ink hover:bg-dark-ink/90'}`}
                >
                  <Heart className={`w-4 h-4 mr-2 ${user.isLiked ? 'fill-current' : ''}`} /> 
                  {user.isLiked ? '已心动' : '心动'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center pt-8">
        <button className="btn-secondary px-8">加载更多推荐</button>
      </div>

      {/* User Profile Modal */}
      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedUser(null)}
              className="absolute inset-0 bg-dark-ink/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedUser(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full md:w-2/5 h-64 md:h-auto relative">
                <img src={selectedUser.image} alt={selectedUser.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
                <div className="absolute bottom-4 left-4 text-white md:hidden">
                  <h2 className="text-3xl font-serif font-bold">{selectedUser.name} <span className="text-xl font-sans font-normal opacity-90">{selectedUser.age}</span></h2>
                </div>
              </div>

              <div className="w-full md:w-3/5 p-8 md:p-10 overflow-y-auto">
                <div className="hidden md:block mb-6">
                  <h2 className="text-4xl font-serif font-bold text-dark-ink">{selectedUser.name} <span className="text-2xl font-sans font-normal text-muted-olive ml-2">{selectedUser.age}岁</span></h2>
                  <div className="flex items-center text-muted-olive mt-2">
                    <MapPin className="w-4 h-4 mr-1" /> {selectedUser.location}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <p className="text-xs text-muted-olive mb-1">MBTI</p>
                    <p className="font-mono font-bold text-lg text-dark-ink">{selectedUser.mbti}</p>
                  </div>
                  <div className="bg-accent-peach/10 p-4 rounded-2xl border border-accent-peach/20">
                    <p className="text-xs text-accent-peach mb-1">AI契合度</p>
                    <p className="font-bold text-lg text-accent-peach flex items-center">
                      <Heart className="w-4 h-4 mr-1 fill-current" /> {selectedUser.match}%
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-dark-ink mb-3 flex items-center">
                      <Info className="w-5 h-5 mr-2 text-muted-olive" /> 关于我
                    </h3>
                    <p className="text-dark-ink/80 leading-relaxed bg-gray-50 p-5 rounded-2xl border border-gray-100">
                      {selectedUser.bio}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-dark-ink mb-3">兴趣标签</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedUser.tags.map((tag: string) => (
                        <span key={tag} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-dark-ink shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex gap-4 pt-6 border-t border-gray-100">
                  <button 
                    onClick={(e) => toggleLike(e, selectedUser.id)}
                    className={`flex-1 py-4 rounded-2xl font-bold transition-all flex items-center justify-center text-lg ${selectedUser.isLiked ? 'bg-accent-peach text-white shadow-lg shadow-accent-peach/30' : 'bg-dark-ink text-white hover:bg-dark-ink/90 shadow-lg'}`}
                  >
                    <Heart className={`w-5 h-5 mr-2 ${selectedUser.isLiked ? 'fill-current' : ''}`} /> 
                    {selectedUser.isLiked ? '已心动' : '发送心动'}
                  </button>
                  <button className="p-4 rounded-2xl border border-gray-200 text-dark-ink hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <MessageCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </div>
      </div>
    </div>
  );
}
