import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PlayCircle, Clock, BookOpen, ChevronRight, Star, X, Users } from 'lucide-react';

const CATEGORIES = ["全部", "沟通技巧", "心理学解析", "长期关系维护", "形象提升", "脱单指南"];

const COURSES = [
  { id: 1, title: "非暴力沟通：如何优雅地表达需求", type: "video", duration: "45分钟", author: "李博士 · 心理咨询师", category: "沟通技巧", image: "https://picsum.photos/seed/course1/800/600", featured: true, students: 12500, rating: 4.9, description: "学习如何用非暴力沟通的方式，清晰表达自己的感受和需求，避免指责和评判，建立更深层次的情感连接。", chapters: ["认识非暴力沟通", "区分观察与评论", "体会和表达感受", "发现背后的需求", "提出具体的请求"] },
  { id: 2, title: "依恋类型自测与相处指南", type: "article", duration: "10分钟阅读", author: "王导师", category: "心理学解析", image: "https://picsum.photos/seed/course2/600/400", students: 8400, rating: 4.8, description: "了解焦虑型、回避型、安全型和恐惧型依恋的特征，测试你的依恋类型，并学习如何与不同类型的人建立健康的亲密关系。", chapters: ["什么是依恋理论", "四大依恋类型解析", "依恋类型自测", "不同类型相处策略"] },
  { id: 3, title: "暧昧期破冰的5个黄金法则", type: "video", duration: "20分钟", author: "情感教练Alex", category: "脱单指南", image: "https://picsum.photos/seed/course3/600/400", students: 15200, rating: 4.7, description: "打破暧昧期的僵局，掌握推进关系的节奏。教你如何通过聊天、约会和肢体语言，自然地将关系升级。", chapters: ["识别暧昧信号", "制造情绪波动", "邀约的艺术", "约会中的进阶技巧", "如何自然表白"] },
  { id: 4, title: "如何识别并应对情感操控(PUA)", type: "article", duration: "15分钟阅读", author: "心理学前沿", category: "心理学解析", image: "https://picsum.photos/seed/course4/600/400", students: 9600, rating: 4.9, description: "深度解析情感操控的常见套路，教你识别煤气灯效应、打压和孤立等手段，建立心理防御机制，保护自己免受伤害。", chapters: ["PUA的本质", "常见的操控手段", "受害者心理分析", "如何建立心理边界", "安全抽身指南"] },
  { id: 5, title: "高情商聊天术：告别冷场", type: "video", duration: "35分钟", author: "沟通达人Sarah", category: "沟通技巧", image: "https://picsum.photos/seed/course5/600/400", students: 21000, rating: 4.8, description: "掌握聊天的主动权，学习如何开启话题、延续对话、幽默化解尴尬，让你在任何社交场合都能游刃有余。", chapters: ["聊天的底层逻辑", "万能开场白", "如何接话不冷场", "幽默感的培养", "深度对话技巧"] },
  { id: 6, title: "异地恋保鲜秘籍", type: "video", duration: "50分钟", author: "张教授", category: "长期关系维护", image: "https://picsum.photos/seed/course6/600/400", students: 6800, rating: 4.6, description: "异地恋如何克服距离带来的不安全感？学习如何建立信任、保持沟通频率、制造惊喜，让异地恋也能修成正果。", chapters: ["异地恋的挑战", "建立核心信任", "高效沟通机制", "制造跨时空浪漫", "规划共同未来"] },
  { id: 7, title: "个人形象穿搭速成班", type: "video", duration: "60分钟", author: "造型师Leo", category: "形象提升", image: "https://picsum.photos/seed/course7/600/400", students: 11000, rating: 4.7, description: "找到适合自己的穿衣风格，提升外在吸引力。从色彩搭配、版型选择到配饰点缀，全面升级你的个人形象。", chapters: ["认识自己的体型", "色彩搭配基础", "基础款的穿搭法则", "不同场合的着装", "配饰的画龙点睛"] },
];

export default function Learning() {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const filteredCourses = activeCategory === "全部" 
    ? COURSES 
    : COURSES.filter(c => c.category === activeCategory);

  const featuredCourse = COURSES.find(c => c.featured);
  const gridCourses = filteredCourses.filter(c => !c.featured || activeCategory !== "全部");

  return (
    <div className="space-y-12 relative pb-20">
      {/* Header */}
      <div className="space-y-4">
        <h2 className="text-4xl font-serif text-dark-ink">恋爱技巧课堂</h2>
        <p className="text-muted-olive text-lg">心理学专家亲授，提升爱与被爱的能力</p>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto pb-4 hide-scrollbar space-x-3 -mx-4 px-4 md:mx-0 md:px-0">
        {CATEGORIES.map((cat) => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm flex-shrink-0 ${activeCategory === cat ? 'bg-dark-ink text-white shadow-md' : 'bg-white text-dark-ink border border-gray-200 hover:border-dark-ink/50 hover:bg-gray-50'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Course (Only show on "全部" or if it matches category) */}
      {featuredCourse && (activeCategory === "全部" || featuredCourse.category === activeCategory) && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden bg-dark-ink text-white shadow-xl cursor-pointer group min-h-[400px] flex items-end"
          onClick={() => setSelectedCourse(featuredCourse)}
        >
          <div className="absolute inset-0">
            <img src={featuredCourse.image} alt="Featured" className="w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-ink via-dark-ink/60 to-transparent"></div>
          </div>
          
          <div className="relative p-6 md:p-12 w-full max-w-3xl space-y-4 md:space-y-6">
            <div className="inline-flex items-center space-x-2 bg-accent-peach text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
              <Star className="w-3.5 h-3.5 fill-current" /> <span>本周主推课程</span>
            </div>
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-serif leading-tight drop-shadow-md">{featuredCourse.title}</h3>
            <p className="text-white/80 line-clamp-2 text-sm md:text-base lg:text-lg max-w-2xl">{featuredCourse.description}</p>
            <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-white/90 pt-2">
              <span className="flex items-center bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur-md"><PlayCircle className="w-4 h-4 mr-1.5" /> {featuredCourse.type === 'video' ? '视频课程' : '深度长文'}</span>
              <span className="flex items-center bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur-md"><Clock className="w-4 h-4 mr-1.5" /> {featuredCourse.duration}</span>
              <span className="bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur-md">{featuredCourse.author}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Course Grid */}
      <div>
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-2xl font-serif text-dark-ink">{activeCategory === "全部" ? "最新内容" : `${activeCategory} 课程`}</h3>
          <span className="text-muted-olive text-sm">{gridCourses.length} 门课程</span>
        </div>
        
        {gridCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {gridCourses.map((course, i) => (
              <motion.div 
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedCourse(course)}
                className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden flex-shrink-0">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-sm">
                    {course.type === 'video' ? <PlayCircle className="w-4 h-4 text-accent-peach" /> : <BookOpen className="w-4 h-4 text-muted-olive" />}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-xs font-medium px-2 py-1 rounded-md shadow-sm">
                    {course.duration}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-dark-ink text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                    {course.category}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                  <div>
                    <h4 className="font-bold text-lg text-dark-ink leading-snug group-hover:text-accent-peach transition-colors line-clamp-2 mb-2">
                      {course.title}
                    </h4>
                    <p className="text-sm text-muted-olive line-clamp-2">{course.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                    <span className="text-sm font-medium text-dark-ink truncate pr-2">{course.author}</span>
                    <div className="flex items-center text-xs text-muted-olive flex-shrink-0">
                      <Users className="w-3.5 h-3.5 mr-1" /> {(course.students / 1000).toFixed(1)}k
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-dark-ink">暂无相关课程</h3>
            <p className="text-muted-olive mt-2">敬请期待更多精彩内容</p>
          </div>
        )}
      </div>

      {/* Course Detail Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCourse(null)}
              className="absolute inset-0 bg-dark-ink/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full md:w-2/5 h-48 md:h-auto relative flex-shrink-0">
                <img src={selectedCourse.image} alt={selectedCourse.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/50"></div>
                
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-white text-xs font-medium flex items-center shadow-sm border border-white/20">
                  {selectedCourse.category}
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white md:hidden">
                  <h2 className="text-xl font-serif font-bold leading-tight drop-shadow-md line-clamp-2">{selectedCourse.title}</h2>
                </div>
              </div>

              <div className="w-full md:w-3/5 p-6 md:p-8 overflow-y-auto flex flex-col">
                <div className="hidden md:block mb-6">
                  <h2 className="text-2xl lg:text-3xl font-serif font-bold leading-tight text-dark-ink mb-3">{selectedCourse.title}</h2>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-olive">
                    <span className="flex items-center bg-gray-100 px-2.5 py-1 rounded-md"><PlayCircle className="w-4 h-4 mr-1.5" /> {selectedCourse.type === 'video' ? '视频课程' : '深度长文'}</span>
                    <span className="flex items-center bg-gray-100 px-2.5 py-1 rounded-md"><Clock className="w-4 h-4 mr-1.5" /> {selectedCourse.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg font-serif font-bold text-dark-ink flex-shrink-0">
                      {selectedCourse.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-dark-ink text-sm">{selectedCourse.author}</p>
                      <p className="text-xs text-muted-olive">课程导师</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-accent-peach font-bold text-base justify-end">
                      <Star className="w-4 h-4 mr-1 fill-current" /> {selectedCourse.rating}
                    </div>
                    <p className="text-xs text-muted-olive">{selectedCourse.students.toLocaleString()} 人已学习</p>
                  </div>
                </div>

                <div className="space-y-6 flex-grow">
                  <div>
                    <h3 className="text-lg font-bold text-dark-ink mb-2">课程简介</h3>
                    <p className="text-sm text-dark-ink/80 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                      {selectedCourse.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-dark-ink mb-3">课程大纲</h3>
                    <ul className="space-y-2">
                      {selectedCourse.chapters.map((chapter: string, index: number) => (
                        <li key={index} className="flex items-start p-2.5 hover:bg-gray-50 rounded-lg transition-colors">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-dark-ink/5 text-dark-ink flex items-center justify-center text-[10px] font-bold mr-3 mt-0.5">
                            {index + 1}
                          </span>
                          <span className="text-sm text-dark-ink/90 font-medium">{chapter}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <button className="w-full bg-dark-ink text-white py-3.5 rounded-xl font-bold text-base hover:bg-dark-ink/90 transition-all shadow-md flex items-center justify-center">
                    <PlayCircle className="w-5 h-5 mr-2" /> 开始学习
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
