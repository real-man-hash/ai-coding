// Test AI client directly
const testAI = async () => {
  try {
    console.log('Testing AI client...');
    
    const response = await fetch('https://ark.cn-beijing.volces.com/api/v3/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 4ff4fa5c-44bd-4b7d-a0e1-c533b1885f5b',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-v3-1-terminus',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的学习分析助手，擅长分析学习内容、生成学习卡片和匹配学习伙伴。请严格按照用户要求的JSON格式返回结果。'
          },
          {
            role: 'user',
            content: '请为以下知识点生成高质量的问答记忆卡，每个卡包含 question 与 answer 字段。\n\n知识点：test\n难度：intermediate\n\n请返回以下格式的 JSON：\n{\n  "cards": [\n    {"question": "问题", "answer": "答案", "topic": "相关知识点"}\n  ]\n}'
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      }),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      return;
    }

    const data = await response.json();
    console.log('Response data:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
};

testAI();
