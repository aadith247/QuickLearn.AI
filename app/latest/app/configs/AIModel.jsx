import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

const history = [];

export const GenerateCourseLayout_AI = {
  history,
  async sendMessage(message, options = {}) {
    const {
      model = 'gemini-2.0-flash',
      json = false
    } = options;

    history.push({ role: 'user', parts: [{ text: message }] });

    const result = await ai.models.generateContent({
      model,
      contents: history,
      ...(json && { config: { responseMimeType: 'application/json' } })
    });

    const replyText =
      typeof result.outputText === 'function'
        ? result.outputText() // new SDK way
        : result.candidates?.[0]?.content?.parts?.[0]?.text || '';

    history.push({ role: 'model', parts: [{ text: replyText }] });

    return json ? JSON.parse(replyText) : replyText;
  }
};

export const GenerateChapterContent_AI = {
  async sendMessage(message, options = {}) {
    const {
      model = 'gemini-2.0-flash',
      json = false
    } = options;
    const result = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: message }] }],
      ...(json && { config: { responseMimeType: 'application/json' } })
    });

    const replyText =
      typeof result.outputText === 'function'
        ? result.outputText()
        : result.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return json ? JSON.parse(replyText) : replyText;
  }
};
