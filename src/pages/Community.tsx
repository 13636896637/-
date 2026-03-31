import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Heart, Share2, MoreHorizontal, Send, Image as ImageIcon, Smile, AlertCircle, X } from 'lucide-react';

const INITIAL_POSTS = [
  { id: 1, author: "匿名用户_892", avatar: "https://picsum.photos/seed/anon1/100/100", time: "2小时前", content: "和相亲对象聊了半个月，感觉挺好的，但他一直不主动约我见面，这是什么心理？我是不是该主动点？", tags: ["相亲", "求助", "暧昧期"], likes: 24, comments: 12, isLiked: false, commentList: [{ author: "匿名用户_111", content: "敌不动我不动，可以稍微暗示一下周末有空。", time: "1小时前" }] },
  { id: 2, author: "匿名用户_431", avatar: "https://picsum.photos/seed/anon2/100/100", time: "5小时前", content: "今天用了AI解忧的功能，按照建议回复了冷战三天的男朋友，他居然秒回了！而且态度软化了很多，非暴力沟通真的有用！", tags: ["经验分享", "非暴力沟通", "还愿"], likes: 156, comments: 45, isLiked: true, commentList: [{ author: "匿名用户_222", content: "接好运！我也去试试！", time: "3小时前" }] },
  { id: 3, author: "匿名用户_105", avatar: "https://picsum.photos/seed/anon3/100/100", time: "昨天", content: "发现自己是典型的焦虑型依恋，对方一不回消息就疯狂内耗。有没有同样情况的姐妹，大家都是怎么调节的？", tags: ["依恋类型", "情绪内耗", "心理学"], likes: 89, comments: 67, isLiked: false, commentList: [{ author: "匿名用户_333", content: "找点自己的事情做，转移注意力。", time: "昨天" }] },
];

const TRENDING_TAGS = ["# 第一次约会穿搭", "# 如何判断他是否喜欢你", "# 异地恋保鲜秘籍", "# 发现对方出轨怎么办", "# 讨好型人格自救"];

export default function Community() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [newPostContent, setNewPostContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [newComment, setNewComment] = useState("");

  const handlePostSubmit = () => {
    if (!newPostContent.trim()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        author: "匿名用户_" + Math.floor(Math.random() * 1000),
        avatar: `https://picsum.photos/seed/${Date.now()}/100/100`,
        time: "刚刚",
        content: newPostContent,
        tags: ["日常分享"],
        likes: 0,
        comments: 0,
        isLiked: false,
        commentList: []
      };
      
      setPosts([newPost, ...posts]);
      setNewPostContent("");
      setIsSubmitting(false);
    }, 600);
  };

  const handleLike = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPosts(posts.map(post => {
      if (post.id === id) {
        const updatedPost = {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
        if (selectedPost && selectedPost.id === id) {
          setSelectedPost(updatedPost);
        }
        return updatedPost;
      }
      return post;
    }));
  };

  const handleCommentSubmit = () => {
    if (!newComment.trim() || !selectedPost) return;
    
    const updatedPosts = posts.map(post => {
      if (post.id === selectedPost.id) {
        const updatedPost = {
          ...post,
          comments: post.comments + 1,
          commentList: [{ author: "匿名用户_" + Math.floor(Math.random() * 1000), content: newComment, time: "刚刚" }, ...post.commentList]
        };
        setSelectedPost(updatedPost);
        return updatedPost;
      }
      return post;
    });
    
    setPosts(updatedPosts);
    setNewComment("");
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Main Feed */}
      <div className="lg:col-span-8 space-y-8">
        <div className="space-y-3">
          <h2 className="text-4xl font-serif text-dark-ink">匿名社区</h2>
          <p className="text-muted-olive text-lg">安全的树洞，倾听与分享真实的情感故事</p>
        </div>

        {/* Create Post */}
        <div className="glass-card p-6 rounded-[2rem] space-y-4 shadow-sm border border-gray-100/50">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-peach/20 to-soft-rose/40 flex items-center justify-center flex-shrink-0 border border-white">
              <span className="text-accent-peach font-medium text-sm">匿名</span>
            </div>
            <textarea 
              placeholder="分享你的情感困惑或经验..." 
              className="w-full bg-transparent border-none focus:ring-0 resize-none h-28 text-dark-ink placeholder-gray-400 outline-none text-lg pt-2"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex space-x-2 text-muted-olive">
              <button className="p-2.5 hover:bg-white/60 rounded-full transition-colors hover:text-accent-peach"><ImageIcon className="w-5 h-5" /></button>
              <button className="p-2.5 hover:bg-white/60 rounded-full transition-colors hover:text-accent-peach"><Smile className="w-5 h-5" /></button>
            </div>
            <button 
              onClick={handlePostSubmit}
              disabled={!newPostContent.trim() || isSubmitting}
              className="btn-primary px-8 py-2.5 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '发布中...' : '发布'} <Send className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          <AnimatePresence>
            {posts.map((post, i) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i === 0 && isSubmitting ? 0 : i * 0.1 }}
                onClick={() => setSelectedPost(post)}
                className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow space-y-5 cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-4">
                    <img src={post.avatar} alt="avatar" className="w-12 h-12 rounded-full opacity-90 border border-gray-100" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="font-bold text-dark-ink">{post.author}</h4>
                      <p className="text-xs text-muted-olive mt-0.5">{post.time}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-dark-ink p-2 rounded-full hover:bg-gray-50 transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
                </div>
                
                <p className="text-dark-ink/90 leading-relaxed text-lg">{post.content}</p>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="badge bg-gray-50 border-gray-100 text-muted-olive hover:bg-gray-100 cursor-pointer transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-8 pt-5 border-t border-gray-50 text-muted-olive">
                  <button 
                    onClick={(e) => handleLike(post.id, e)}
                    className={`flex items-center space-x-2 transition-colors group ${post.isLiked ? 'text-accent-peach' : 'hover:text-accent-peach'}`}
                  >
                    <div className={`p-2 rounded-full group-hover:bg-accent-peach/10 transition-colors ${post.isLiked ? 'bg-accent-peach/10' : ''}`}>
                      <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                    </div>
                    <span className="font-medium">{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-dark-ink transition-colors group">
                    <div className="p-2 rounded-full group-hover:bg-gray-100 transition-colors">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-dark-ink transition-colors group">
                    <div className="p-2 rounded-full group-hover:bg-gray-100 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <span className="font-medium">分享</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        <div className="glass-card p-8 rounded-[2rem] space-y-5 border-t-4 border-t-accent-peach">
          <h3 className="font-serif text-2xl text-dark-ink flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-accent-peach" />
            社区公约
          </h3>
          <ul className="text-sm text-dark-ink/80 space-y-3">
            <li className="flex items-start"><span className="text-accent-peach mr-2">•</span> 保持友善，尊重不同的情感观与生活方式</li>
            <li className="flex items-start"><span className="text-accent-peach mr-2">•</span> 保护隐私，发帖请隐去真实姓名与敏感信息</li>
            <li className="flex items-start"><span className="text-accent-peach mr-2">•</span> 禁止发布低俗、暴力、广告等违规内容</li>
            <li className="flex items-start"><span className="text-accent-peach mr-2">•</span> 鼓励真诚分享，拒绝恶意引战与人身攻击</li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-5">
          <h3 className="font-serif text-2xl text-dark-ink border-b border-gray-100 pb-4">热门话题</h3>
          <div className="space-y-4">
            {TRENDING_TAGS.map((tag, i) => (
              <a key={i} href="#" className="flex items-center justify-between group">
                <span className="text-sm font-medium text-dark-ink group-hover:text-accent-peach transition-colors">
                  {tag}
                </span>
                <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-md group-hover:bg-accent-peach/10 group-hover:text-accent-peach transition-colors">
                  热议
                </span>
              </a>
            ))}
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-dark-ink to-gray-800 p-8 rounded-[2rem] text-white space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <h3 className="font-serif text-xl font-bold relative z-10">遇到情感危机？</h3>
          <p className="text-sm text-gray-300 relative z-10">试试我们的AI情感诊断，深度解析对方心理，化解沟通僵局。</p>
          <button className="w-full py-3 bg-white text-dark-ink rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors relative z-10">
            立即去诊断
          </button>
        </div>
      </div>

      {/* Post Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-ink/40 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 flex justify-between items-center z-10">
                <h3 className="font-serif font-bold text-lg text-dark-ink">帖子详情</h3>
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex items-center space-x-4">
                  <img src={selectedPost.avatar} alt="avatar" className="w-12 h-12 rounded-full border border-gray-100" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="font-bold text-dark-ink">{selectedPost.author}</h4>
                    <p className="text-xs text-muted-olive mt-0.5">{selectedPost.time}</p>
                  </div>
                </div>
                
                <p className="text-dark-ink/90 leading-relaxed text-lg">{selectedPost.content}</p>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedPost.tags.map((tag: string) => (
                    <span key={tag} className="badge bg-gray-50 border-gray-100 text-muted-olive">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-8 py-4 border-y border-gray-50 text-muted-olive">
                  <button 
                    onClick={() => handleLike(selectedPost.id)}
                    className={`flex items-center space-x-2 transition-colors group ${selectedPost.isLiked ? 'text-accent-peach' : 'hover:text-accent-peach'}`}
                  >
                    <div className={`p-2 rounded-full group-hover:bg-accent-peach/10 transition-colors ${selectedPost.isLiked ? 'bg-accent-peach/10' : ''}`}>
                      <Heart className={`w-5 h-5 ${selectedPost.isLiked ? 'fill-current' : ''}`} />
                    </div>
                    <span className="font-medium">{selectedPost.likes}</span>
                  </button>
                  <div className="flex items-center space-x-2 text-dark-ink">
                    <div className="p-2 rounded-full bg-gray-50">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{selectedPost.comments}</span>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="space-y-6 pt-4">
                  <h4 className="font-serif font-bold text-dark-ink text-lg">全部评论</h4>
                  
                  {/* Add Comment */}
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-peach/20 to-soft-rose/40 flex items-center justify-center flex-shrink-0 border border-white">
                      <span className="text-accent-peach font-medium text-xs">我</span>
                    </div>
                    <div className="flex-grow flex items-center bg-gray-50 rounded-2xl p-2 border border-gray-100 focus-within:border-accent-peach focus-within:ring-1 focus-within:ring-accent-peach transition-all">
                      <input 
                        type="text" 
                        placeholder="写下你的评论..." 
                        className="w-full bg-transparent border-none focus:ring-0 text-dark-ink placeholder-gray-400 outline-none px-3"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit()}
                      />
                      <button 
                        onClick={handleCommentSubmit}
                        disabled={!newComment.trim()}
                        className="p-2 text-accent-peach hover:bg-accent-peach/10 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Comment List */}
                  <div className="space-y-4">
                    {selectedPost.commentList && selectedPost.commentList.map((comment: any, idx: number) => (
                      <div key={idx} className="flex space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-gray-500 font-medium text-xs">{comment.author.slice(-3)}</span>
                        </div>
                        <div className="flex-grow space-y-1">
                          <div className="flex items-baseline space-x-2">
                            <span className="font-bold text-sm text-dark-ink">{comment.author}</span>
                            <span className="text-xs text-gray-400">{comment.time}</span>
                          </div>
                          <p className="text-dark-ink/80 text-sm leading-relaxed">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
