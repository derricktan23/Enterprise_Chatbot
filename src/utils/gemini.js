import axios from 'axios';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export async function getGeminiAnswer(question, history = []) {
  const messages = [
    ...history.map(item => [
      { role: 'user', parts: [{ text: item.question }] },
      { role: 'model', parts: [{ text: item.answer }] }
    ]),
    { role: 'user', parts: [{ text: question }] },
  ];

  const body = { contents: messages };

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${API_KEY}`,
      body,
      { headers: { 'Content-Type': 'application/json' } }
    );

    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No answer found.";
  } catch (error) {
    return "An error occurred while processing your question.";
  }
}