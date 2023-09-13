const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 5000;
const cors=require("cors");

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Endpoint to convert code
app.post('/convert', async (req, res) => {
  try {
    const { code, language } = req.body;
    const apiKey = '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'; // Replace with your ChatGPT API key
    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-002/completions', {
      prompt: `Translate the following ${language} code: ${code}`,
      max_tokens: 50,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const convertedCode = response.data.choices[0].text;
    res.json({ convertedCode });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Code conversion failed.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
