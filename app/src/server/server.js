const express = require("express");
// require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const app = express();

app.use(express.json());

// use cors
const cors = require("cors");
app.use(cors());


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/ask", async (req, res) => {
    const { prompt } = req.body;
    const response = await openai.complete({
        model: "text-davinci-003",
        prompt:  `
            ${prompt}
        `,
        max_tokens: 64,
        temperature: 0,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0
    });

    res.status(200).json({
        success: true,
        data: response.data.choices[0].text
    })
});

// port
const port = process.env.PORT || 5000;

// start listen
app.listen(port, () => console.log(`Server started on port ${port}`));
