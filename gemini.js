const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.Gemini);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function respondToText(prompt){
    const result = await model.generateContent(prompt);
    return result.response.text();
}

module.exports = {
    respondToText: respondToText
}
