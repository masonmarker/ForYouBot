
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

// use body parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// create configuration
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

// create openai api from the account configuration
const openai = new OpenAIApi(configuration);

// port
const port = process.env.PORT || 5000;

// post to /ask a function to respond to the request
app.post("/", async (req, res) => {
    const { model, prompt, max_tokens, temperature } = req.body;
    const response = await openai.createCompletion({
        model: model,
        prompt: prompt,
        max_tokens: max_tokens,
        temperature: temperature,
        stop: ["\n--next--\n"],
    });

    res.status(200).json({
        success: true,
        data: response.data.choices[0].text
    })
});

// start listen
app.listen(port, () => console.log(`Server started on port ${port}`));

