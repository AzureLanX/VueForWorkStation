import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: import.meta.env.VITE_KIMI_API_KEY,
    baseURL: "http://localhost:5173/kimiai",
    dangerouslyAllowBrowser: true,
});

async function getAIResponse(userMessage, updateCallback) {
    const completion = await client.chat.completions.create({
        model: "moonshot-v1-8k",         
        messages: [{ 
            role: "system", 
            content: "你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。Moonshot AI 为专有名词，不可翻译成其他语言。"
        },
        { role: "user", content: userMessage }],
        temperature: 0.3,
        stream: true // 启用流式输出
    });

    let fullResponse = '';
    
    try {
        for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || '';
            fullResponse += content;
            // 通过回调函数返回当前累积的响应
            updateCallback(fullResponse);
        }
    } catch (error) {
        console.error('Stream error:', error);
        throw error;
    }

    return fullResponse;
}

export { getAIResponse };