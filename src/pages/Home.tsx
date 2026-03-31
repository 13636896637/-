import React from 'react';
import { motion } from 'motion/react';
import { Heart, ArrowRight, Users, BookOpen, Sparkles, Star, MessageCircle, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-soft-rose/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent-peach/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-muted-olive/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="text-center max-w-4xl mx-auto space-y-8 px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/50 border border-white/80 backdrop-blur-sm text-sm font-medium text-dark-ink mb-4 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-accent-peach" />
            <span>全新 AI 情感分析引擎上线</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif text-dark-ink leading-tight"
          >
            探索更美好的关系 <br/>
            <span className="text-muted-olive italic">从懂你开始</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-dark-ink/70 max-w-2xl mx-auto leading-relaxed"
          >
            基于心理学与前沿 AI 技术的综合恋爱服务平台。助你从相识到相知，从相知到相守，化解每一次情感危机。
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link to="/diagnosis" className="btn-primary flex items-center w-full sm:w-auto justify-center px-8 py-4 text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
              开启 AI 诊断 <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link to="/matchmaking" className="btn-secondary w-full sm:w-auto justify-center px-8 py-4 text-lg shadow-sm hover:shadow-md transition-all">
              寻找灵魂伴侣
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto px-4 border-y border-gray-200/50 py-12">
        {[
          { label: "注册用户", value: "50,000+" },
          { label: "成功匹配", value: "12,000对" },
          { label: "AI 诊断次数", value: "100万+" },
          { label: "社区互动", value: "30万+" }
        ].map((stat, i) => (
          <div key={i} className="text-center space-y-2">
            <h4 className="text-3xl md:text-4xl font-serif text-dark-ink font-bold">{stat.value}</h4>
            <p className="text-sm text-muted-olive uppercase tracking-wider font-medium">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-serif text-dark-ink font-bold">全方位的情感支持</h2>
          <p className="text-muted-olive text-lg">四大核心模块，陪伴你的恋爱全旅程</p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { title: "智能相亲匹配", desc: "基于MBTI与兴趣图谱的深度匹配算法，拒绝无效社交。", icon: Users, color: "bg-soft-rose", link: "/matchmaking" },
            { title: "恋爱技巧课堂", desc: "心理学专家亲授，从破冰到长期关系维护的系统课程。", icon: BookOpen, color: "bg-muted-olive", link: "/learning" },
            { title: "匿名情感社区", desc: "安全私密的树洞，倾听真实故事，获取群智建议。", icon: MessageCircle, color: "bg-warm-cream border border-gray-200", link: "/community" },
            { title: "AI 情感解忧", desc: "独家多模态情感分析引擎，精准诊断聊天记录，生成高情商话术。", icon: Sparkles, color: "bg-dark-ink text-white shadow-xl", link: "/diagnosis" }
          ].map((feat, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Link to={feat.link} className={`block h-full p-8 rounded-[2rem] space-y-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg ${feat.color} ${feat.title === 'AI 情感解忧' ? 'text-white' : 'text-dark-ink'}`}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${feat.title === 'AI 情感解忧' ? 'bg-white/10 backdrop-blur-md' : 'bg-white/60 backdrop-blur-sm shadow-sm'}`}>
                  <feat.icon className="w-6 h-6" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-serif font-bold">{feat.title}</h3>
                  <p className={`text-sm leading-relaxed ${feat.title === 'AI 情感解忧' ? 'text-white/80' : 'text-dark-ink/70'}`}>
                    {feat.desc}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Success Stories */}
      <section className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-serif text-dark-ink font-bold">真实脱单故事</h2>
          <p className="text-muted-olive text-lg">在这里，遇见对的人，学会如何去爱</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "林晓晓 & 张伟", time: "相识于 2023年5月", quote: "以前总是不知道怎么回复男神的信息，用了 AI 情感解忧后，不仅化解了尴尬，还成功约了周末看电影！", image: "https://picsum.photos/seed/couple1/400/300" },
            { name: "王宇 & 李雪", time: "相识于 2023年8月", quote: "通过平台的MBTI深度匹配认识了彼此，发现我们不仅性格互补，连对未来的规划都惊人的一致。", image: "https://picsum.photos/seed/couple2/400/300" },
            { name: "陈默 & 赵敏", time: "相识于 2024年1月", quote: "恋爱课堂里关于'非暴力沟通'的课程拯救了我们濒临破裂的关系，现在我们更懂得倾听对方了。", image: "https://picsum.photos/seed/couple3/400/300" }
          ].map((story, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-shadow flex flex-col"
            >
              <div className="h-48 overflow-hidden flex-shrink-0">
                <img src={story.image} alt={story.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="p-8 space-y-4 relative flex-grow flex flex-col justify-between">
                <div>
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-gray-100" />
                  <div className="flex space-x-1 text-accent-peach mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-dark-ink/80 text-sm leading-relaxed italic relative z-10">"{story.quote}"</p>
                </div>
                <div className="pt-4 border-t border-gray-50 mt-4">
                  <p className="font-bold text-dark-ink">{story.name}</p>
                  <p className="text-xs text-muted-olive mt-1">{story.time}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-dark-ink p-10 md:p-16 rounded-[3rem] text-center space-y-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-peach/20 rounded-full mix-blend-screen filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-soft-rose/20 rounded-full mix-blend-screen filter blur-3xl"></div>
          
          <h2 className="text-4xl md:text-5xl font-serif text-white font-bold relative z-10">
            准备好迎接你的爱情了吗？
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto relative z-10">
            加入我们，开启一段自我发现与双向奔赴的旅程。
          </p>
          <div className="relative z-10 pt-4">
            <Link to="/matchmaking" className="inline-flex items-center justify-center px-8 py-4 bg-white text-dark-ink rounded-full font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all shadow-lg">
              免费注册体验 <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
