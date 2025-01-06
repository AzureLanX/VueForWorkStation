const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.VITE_KIMI_API_KEY,
});

// 邮件发送配置
const transporter = nodemailer.createTransport({
    service: 'gmail', // 使用的邮件服务
    auth: {
        user: 'your-email@gmail.com', // 你的邮箱
        pass: 'your-email-password' // 你的邮箱密码
    }
});

// 发送验证码的API
app.post('/api/send-verification-code', (req, res) => {
    const { email } = req.body;
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 生成6位随机验证码

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: '邮箱验证码',
        text: `您的验证码是: ${verificationCode}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('发送失败');
        }
        // 在这里可以将验证码存储在数据库中，供后续验证使用
        console.log('验证码发送成功:', info.response);
        res.status(200).send('验证码已发送');
    });
});

app.post('/api/chat', async (req, res) => {
    const { userMessage } = req.body;
    try {
        const completion = await client.chat.completions.create({
            model: "moonshot-v1-8k",
            messages: [{ role: "user", content: userMessage }],
            temperature: 0.3,
        });
        res.json({ response: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: 'Error communicating with OpenAI API' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 