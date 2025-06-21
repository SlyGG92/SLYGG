import type { NextApiRequest, NextApiResponse } from 'next';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;

  try {
    const prompt = `You're a background investigator. Given the following CV, extract and present the following information in report format:

Name:
Age (if mentioned or estimable):
Location or Address (if mentioned):
Linked Social Media (LinkedIn, Twitter, etc if mentioned):
Possible News Mentions (assume you're doing an online search based on name and job titles):

CV Text:
${text}

Return a detailed, professional report with headings.`;

    const completion = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 800,
        temperature: 0.7
      })
    });

    const data = await completion.json();
    const result = data.choices?.[0]?.message?.content || 'No response.';

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching from OpenAI.' });
  }
}
