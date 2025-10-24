interface AIClientConfig {
  apiKey: string;
  endpoint: string;
}

interface AnalyzeRequest {
  content: string;
  userAssessment?: Record<string, number>;
}

interface AnalyzeResponse {
  topics: Array<{
    topic: string;
    confidence: number;
    isBlindSpot: boolean;
  }>;
  analysis: string;
}

interface GenerateCardsRequest {
  topics: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

interface GenerateCardsResponse {
  cards: Array<{
    question: string;
    answer: string;
    topic: string;
  }>;
}

interface MatchRequest {
  userProfile: {
    learningStyle: string[];
    interestTags: string[];
    blindSpots: string[];
    studyTime: string;
  };
}

interface MatchResponse {
  matches: Array<{
    userId: number;
    name: string;
    matchScore: number;
    reason: string;
    sharedTopics: string[];
  }>;
}

class AIClient {
  private config: AIClientConfig;

  constructor(config: AIClientConfig) {
    this.config = config;
  }

  async analyzeContent(request: AnalyzeRequest): Promise<AnalyzeResponse> {
    const prompt = `请分析以下学习内容，提取关键知识点，并预测用户可能未掌握的部分。输出结构化 JSON 格式。

学习内容：${request.content}

${request.userAssessment ? `用户自评：${JSON.stringify(request.userAssessment)}` : ''}

请返回以下格式的 JSON：
{
  "topics": [
    {"topic": "知识点名称", "confidence": 0.8, "isBlindSpot": true/false}
  ],
  "analysis": "整体分析结果"
}`;

    try {
      const response = await this.callLLM(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('AI analysis failed:', error);
      throw new Error('Failed to analyze content');
    }
  }

  async generateCards(request: GenerateCardsRequest): Promise<GenerateCardsResponse> {
    const prompt = `请为以下知识点生成高质量的问答记忆卡，每个卡包含 question 与 answer 字段。

知识点：${request.topics.join(', ')}
难度：${request.difficulty || 'intermediate'}

请返回以下格式的 JSON：
{
  "cards": [
    {"question": "问题", "answer": "答案", "topic": "相关知识点"}
  ]
}`;

    try {
      const response = await this.callLLM(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Card generation failed:', error);
      throw new Error('Failed to generate memory cards');
    }
  }

  async findStudyBuddies(request: MatchRequest): Promise<MatchResponse> {
    const prompt = `请根据以下用户画像与知识结构，计算最合适的学习伙伴匹配度，并说明推荐理由。

用户画像：
- 学习风格：${request.userProfile.learningStyle.join(', ')}
- 兴趣标签：${request.userProfile.interestTags.join(', ')}
- 知识盲区：${request.userProfile.blindSpots.join(', ')}
- 学习时间：${request.userProfile.studyTime}

请返回以下格式的 JSON：
{
  "matches": [
    {"userId": 1, "name": "姓名", "matchScore": 0.85, "reason": "推荐理由", "sharedTopics": ["共同话题"]}
  ]
}`;

    try {
      const response = await this.callLLM(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Buddy matching failed:', error);
      throw new Error('Failed to find study buddies');
    }
  }

  async getEmbedding(text: string): Promise<number[]> {
    try {
      const response = await fetch(`${this.config.endpoint}/embedding`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: text,
          model: 'text-embedding-ada-002'
        }),
      });

      if (!response.ok) {
        throw new Error(`Embedding API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.data[0].embedding;
    } catch (error) {
      console.error('Embedding generation failed:', error);
      throw new Error('Failed to generate embedding');
    }
  }

  private async callLLM(prompt: string): Promise<string> {
    try {
      const response = await fetch(`${this.config.endpoint}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'ep-llm-3',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        }),
      });

      if (!response.ok) {
        throw new Error(`LLM API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('LLM call failed:', error);
      throw new Error('Failed to call LLM');
    }
  }
}

// Create singleton instance
const aiClient = new AIClient({
  apiKey: process.env.VE_API_KEY || '',
  endpoint: process.env.VE_API_ENDPOINT || 'https://ark.cn-beijing.volces.com/api/v1'
});

export default aiClient;
export { AIClient, type AnalyzeRequest, type AnalyzeResponse, type GenerateCardsRequest, type GenerateCardsResponse, type MatchRequest, type MatchResponse };
