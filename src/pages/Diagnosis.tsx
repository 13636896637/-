import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageSquare, Upload, Sparkles, ChevronRight, ArrowLeft, Loader2, CheckCircle2, User, Info, X } from 'lucide-react';
import { analyzeRelationship } from '../services/geminiService';

type Step = 'landing' | 'info' | 'upload' | 'analyzing' | 'report';

export default function Diagnosis() {
  const [step, setStep] = useState<Step>('landing');
  const [userData, setUserData] = useState({
    gender: '男',
    age: '',
    major: '',
    interests: '',
  });
  const [chatText, setChatText] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const startAnalysis = async () => {
    setStep('analyzing');
    setLoading(true);
    try {
      const result = await analyzeRelationship(userData, { text: chatText, images });
      setReport(result);
      setStep('report');
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("分析失败，请重试");
      setStep('upload');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-[80vh]">
      <AnimatePresence mode="wait">
        {step === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-3xl text-center space-y-10"
          >
            <div className="space-y-6">
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="inline-block p-5 bg-soft-rose/20 rounded-full"
              >
                <Heart className="w-14 h-14 text-accent-peach fill-accent-peach" />
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-dark-ink">
                AI 情感诊断
              </h1>
              <p className="text-xl text-muted-olive font-light max-w-2xl mx-auto">
                独家“人物情感分析”引擎，助你洞察暧昧，化解尴尬，掌握沟通主动权。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-12">
              {[
                { icon: MessageSquare, title: "多模态解析", desc: "支持文字与连续聊天截图，精准提取情绪色彩" },
                { icon: Sparkles, title: "RAG 增强", desc: "基于恋爱心理学知识库，避免大模型幻觉" },
                { icon: CheckCircle2, title: "CoT 思维链", desc: "深度逻辑推演策略，生成高情商回复话术" }
              ].map((item, i) => (
                <div key={i} className="p-6 glass-card rounded-3xl space-y-4 hover:shadow-lg transition-shadow">
                  <div className="p-3 bg-warm-cream rounded-2xl inline-block">
                    <item.icon className="w-6 h-6 text-muted-olive" />
                  </div>
                  <h3 className="font-bold text-lg text-dark-ink">{item.title}</h3>
                  <p className="text-sm text-muted-olive leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <button
                onClick={() => setStep('info')}
                className="btn-primary text-lg px-10 py-5 inline-flex items-center"
              >
                立即开启诊断
                <ChevronRight className="ml-2 w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 'info' && (
          <motion.div
            key="info"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-lg glass-card p-10 rounded-[2.5rem] space-y-8"
          >
            <div className="flex items-center space-x-3 text-dark-ink">
              <button onClick={() => setStep('landing')} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft className="w-5 h-5" /></button>
              <h2 className="text-2xl font-serif font-bold">Step 1: 对方基础信息</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-muted-olive">性别</label>
                <div className="flex space-x-3">
                  {['男', '女'].map(g => (
                    <button
                      key={g}
                      onClick={() => setUserData({ ...userData, gender: g })}
                      className={`flex-1 py-3 rounded-2xl border transition-all font-medium ${userData.gender === g ? 'bg-dark-ink text-white border-dark-ink shadow-md' : 'bg-white text-muted-olive border-gray-200 hover:border-gray-300'}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-muted-olive">年龄</label>
                <input
                  type="number"
                  placeholder="例如：21"
                  className="w-full p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-accent-peach focus:border-accent-peach outline-none bg-white/50 backdrop-blur-sm transition-all"
                  value={userData.age}
                  onChange={e => setUserData({ ...userData, age: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-muted-olive">专业/职业</label>
                <input
                  type="text"
                  placeholder="例如：工科专业"
                  className="w-full p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-accent-peach focus:border-accent-peach outline-none bg-white/50 backdrop-blur-sm transition-all"
                  value={userData.major}
                  onChange={e => setUserData({ ...userData, major: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-muted-olive">兴趣爱好</label>
                <textarea
                  placeholder="例如：喜欢打篮球和科幻电影"
                  className="w-full p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-accent-peach focus:border-accent-peach outline-none bg-white/50 backdrop-blur-sm transition-all h-32 resize-none"
                  value={userData.interests}
                  onChange={e => setUserData({ ...userData, interests: e.target.value })}
                />
              </div>
            </div>

            <button
              onClick={() => setStep('upload')}
              disabled={!userData.age || !userData.major}
              className="w-full py-4 bg-dark-ink text-white rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-ink/90 transition-all shadow-lg"
            >
              下一步
            </button>
          </motion.div>
        )}

        {step === 'upload' && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-lg glass-card p-10 rounded-[2.5rem] space-y-8"
          >
            <div className="flex items-center space-x-3 text-dark-ink">
              <button onClick={() => setStep('info')} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft className="w-5 h-5" /></button>
              <h2 className="text-2xl font-serif font-bold">Step 2: 上传聊天记录</h2>
            </div>

            <div className="space-y-6">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-muted-olive/30 bg-white/40 rounded-3xl p-10 text-center cursor-pointer hover:bg-white/60 hover:border-accent-peach transition-all space-y-3 group"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-muted-olive group-hover:text-accent-peach transition-colors" />
                </div>
                <p className="text-sm font-medium text-dark-ink">点击上传微信/QQ聊天截图</p>
                <p className="text-xs text-muted-olive">系统将自动进行隐私脱敏，支持多张</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  multiple 
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>

              {images.length > 0 && (
                <div className="flex space-x-3 overflow-x-auto py-2 pb-4 scrollbar-hide">
                  {images.map((img, i) => (
                    <div key={i} className="relative flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                      <img src={img} alt="upload" className="w-full h-full object-cover" />
                      <button 
                        onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))}
                        className="absolute top-1 right-1 bg-black/60 backdrop-blur-sm text-white p-1 rounded-full hover:bg-red-500 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
                <div className="relative flex justify-center text-xs uppercase font-medium"><span className="bg-warm-cream px-4 text-muted-olive">或者输入文本</span></div>
              </div>

              <textarea
                placeholder="直接粘贴或输入聊天内容..."
                className="w-full p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-accent-peach focus:border-accent-peach outline-none bg-white/50 backdrop-blur-sm transition-all h-32 resize-none"
                value={chatText}
                onChange={e => setChatText(e.target.value)}
              />
            </div>

            <div className="p-4 bg-orange-50/80 border border-orange-100 rounded-2xl flex items-start space-x-3">
              <Info className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-orange-800 leading-relaxed">
                诊断费：4.9元 / 次。所有数据传输均采用 TLS 1.3 加密，阅后即焚，绝不保存您的隐私数据。
              </p>
            </div>

            <button
              onClick={startAnalysis}
              disabled={!chatText && images.length === 0}
              className="w-full py-4 bg-accent-peach text-white rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent-peach-hover transition-all flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              开始深度分析
            </button>
          </motion.div>
        )}

        {step === 'analyzing' && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 py-12"
          >
            <div className="relative w-40 h-40 mx-auto">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-accent-peach/30 border-t-accent-peach rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border-4 border-muted-olive/20 border-b-muted-olive rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="w-12 h-12 text-accent-peach animate-pulse fill-accent-peach/20" />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-serif font-bold text-dark-ink">AI 深度计算中...</h2>
              <p className="text-muted-olive animate-pulse">正在应用 CoT 思维链推演策略</p>
              <div className="text-sm text-muted-olive/80 space-y-2 mt-6 font-mono bg-white/40 p-6 rounded-2xl inline-block text-left">
                <p className="flex items-center"><Loader2 className="w-4 h-4 mr-2 animate-spin" /> 提取情绪色彩与隐藏意图...</p>
                <p className="flex items-center"><Loader2 className="w-4 h-4 mr-2 animate-spin" /> 检索恋爱心理学知识库...</p>
                <p className="flex items-center"><Loader2 className="w-4 h-4 mr-2 animate-spin" /> 生成高情商回复话术...</p>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'report' && report && (
          <motion.div
            key="report"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-3xl space-y-8 pb-12"
          >
            <div className="flex items-center justify-between border-b border-gray-200 pb-6">
              <div>
                <h2 className="text-3xl font-serif font-bold text-dark-ink">情感诊断报告</h2>
                <p className="text-muted-olive mt-1">基于大模型深度推演的专属分析</p>
              </div>
              <button 
                onClick={() => setStep('landing')}
                className="btn-secondary text-sm px-4 py-2"
              >
                重新诊断
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-8 rounded-3xl space-y-5 border-t-4 border-t-accent-peach">
                <div className="flex items-center space-x-3 text-accent-peach">
                  <div className="p-2 bg-accent-peach/10 rounded-xl"><Heart className="w-5 h-5" /></div>
                  <h3 className="font-bold text-lg text-dark-ink">对方态度评估</h3>
                </div>
                <p className="text-3xl font-serif font-bold text-dark-ink">{report.attitudeAssessment}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="badge bg-white">MBTI推测: {report.mbtiGuess}</span>
                  <span className="badge bg-white">情绪基调: {report.emotionTone}</span>
                </div>
              </div>

              <div className="glass-card p-8 rounded-3xl space-y-5 border-t-4 border-t-muted-olive">
                <div className="flex items-center space-x-3 text-muted-olive">
                  <div className="p-2 bg-muted-olive/10 rounded-xl"><Info className="w-5 h-5" /></div>
                  <h3 className="font-bold text-lg text-dark-ink">心理归因推测</h3>
                </div>
                <p className="text-sm text-dark-ink/80 leading-relaxed">
                  {report.psychologicalAttribution}
                </p>
              </div>
            </div>

            <div className="glass-card p-8 rounded-3xl space-y-5 border-t-4 border-t-dark-ink">
              <div className="flex items-center space-x-3 text-dark-ink">
                <div className="p-2 bg-dark-ink/5 rounded-xl"><Sparkles className="w-5 h-5" /></div>
                <h3 className="font-bold text-lg">行动指令建议</h3>
              </div>
              <p className="text-sm text-dark-ink/80 leading-relaxed">
                {report.actionSuggestions}
              </p>
            </div>

            <div className="space-y-6 pt-4">
              <h3 className="text-xl font-serif font-bold text-dark-ink flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-accent-peach" />
                黄金回复话术生成
              </h3>
              <div className="grid gap-4">
                {report.responseOptions.map((opt: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-accent-peach/50 group-hover:bg-accent-peach transition-colors"></div>
                    <div className="flex justify-between items-start mb-3 pl-2">
                      <span className="text-xs font-bold text-dark-ink bg-gray-100 px-3 py-1 rounded-full">
                        {opt.label}
                      </span>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(opt.content);
                          alert("已复制到剪贴板");
                        }}
                        className="text-xs font-medium text-muted-olive hover:text-accent-peach transition-colors bg-white border border-gray-200 px-3 py-1 rounded-full hover:border-accent-peach"
                      >
                        复制话术
                      </button>
                    </div>
                    <p className="text-dark-ink/90 pl-2 text-lg leading-relaxed">{opt.content}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="text-center pt-10 pb-4">
              <p className="text-xs text-muted-olive/60">
                以上分析基于大模型深度推演，仅供参考。祝你收获美好的爱情。
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
