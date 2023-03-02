
// require express
const express = require("express");

// require("dotenv").config();



// require openai
const { Configuration, OpenAIApi } = require("openai");

// declare express app
const app = express();

// use express
app.use(express.json());

// use cors
const cors = require("cors");
app.use(cors());

// create configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// create openai api from the account configuration
const openai = new OpenAIApi(configuration);

// post to /ask a function to respond to the request
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
