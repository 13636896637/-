import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const analyzeRelationship = async (userData: any, chatData: { text?: string, images?: string[] }) => {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `
你是一位资深的恋爱心理学专家，擅长“人物情感分析（Acoustic-Textual Sentiment Deep Analysis）”。
你的任务是根据用户提供的对方基础信息和聊天记录，进行深度诊断。

必须严格按照以下逻辑链路进行分析：
1. 分析对方可能的MBTI性格。
2. 提取当前对话的情绪色彩（包括文字语气、Emoji使用、回复频率等）。
3. 推演对方潜在的核心诉求。
4. 制定针对性的沟通策略。
5. 生成3条极具“人情味”和“网感”的备选回复话术。

参考知识库（RAG）：
- 沉没成本效应：引导对方投入更多时间/情绪。
- 依恋类型理论：判断对方是安全型、焦虑型还是回避型。
- 非暴力沟通：观察、感受、需要、请求。
- 降维打击：打破无效互动，切入高价值话题。

输出格式必须为 JSON，包含以下字段：
- attitudeAssessment: 对方态度评估（如：中性偏好感、冷淡、热情等）
- psychologicalAttribution: 心理归因推测（详细分析原因）
- actionSuggestions: 行动指令建议
- responseOptions: 数组，包含3个对象 { label: "话术类型", content: "话术内容" }
- mbtiGuess: 性格推测
- emotionTone: 情绪基调
`;

  const prompt = `
用户提供的信息：
对方基础信息：${JSON.stringify(userData)}
聊天记录内容：${chatData.text || "见上传截图"}

请开始深度分析。
`;

  const contents: any[] = [{ text: prompt }];
  
  if (chatData.images && chatData.images.length > 0) {
    chatData.images.forEach(imgBase64 => {
      contents.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: imgBase64.split(',')[1] // Remove data:image/jpeg;base64,
        }
      });
    });
  }

  const response = await ai.models.generateContent({
    model,
    contents: { parts: contents.map(c => typeof c === 'string' ? { text: c } : (c.text ? { text: c.text } : { inlineData: c.inlineData })) },
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          attitudeAssessment: { type: Type.STRING },
          psychologicalAttribution: { type: Type.STRING },
          actionSuggestions: { type: Type.STRING },
          mbtiGuess: { type: Type.STRING },
          emotionTone: { type: Type.STRING },
          responseOptions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                content: { type: Type.STRING }
              }
            }
          }
        }
      }
    }
  });

  return JSON.parse(response.text);
};
