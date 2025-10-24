// Test cards service step by step
const testCardsService = async () => {
  try {
    console.log('Testing cards service...');
    
    // Test AI client first
    console.log('1. Testing AI client...');
    const aiResponse = await fetch('https://ark.cn-beijing.volces.com/api/v3/chat/completions', {
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

    if (!aiResponse.ok) {
      throw new Error(`AI API error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    console.log('AI response received');
    
    // Parse AI response
    const content = aiData.choices[0].message.content;
    console.log('AI content:', content);
    
    // Extract JSON from content
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
    if (!jsonMatch) {
      throw new Error('No JSON found in AI response');
    }
    
    const jsonStr = jsonMatch[1];
    console.log('Extracted JSON:', jsonStr);
    
    const parsedResponse = JSON.parse(jsonStr);
    console.log('Parsed response:', parsedResponse);
    
    // Test database insert
    console.log('2. Testing database insert...');
    const mysql = require('mysql2/promise');
    require('dotenv').config();
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "10.3.7.16",
      port: parseInt(process.env.DB_PORT || "3306"),
      user: process.env.DB_USER || "gdtest",
      password: process.env.DB_PASSWORD || "gdmysql_221",
      database: process.env.DB_NAME || "gd_bot",
    });

    const cardsData = parsedResponse.cards.map(card => [
      1, // userId
      card.question,
      card.answer,
      card.topic
    ]);

    console.log('Cards data to insert:', cardsData);
    
    for (const card of cardsData) {
      const [result] = await connection.execute(
        'INSERT INTO flashcards (user_id, question, answer, related_topic) VALUES (?, ?, ?, ?)',
        card
      );
      console.log('Inserted card with ID:', result.insertId);
    }
    
    await connection.end();
    console.log('Cards service test completed successfully');
    
  } catch (error) {
    console.error('Cards service test error:', error);
  }
};

testCardsService();
