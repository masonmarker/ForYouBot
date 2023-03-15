// require express
const express = require("express");

// GPT encoder for tokenizing strings
const { encode } = require("gpt-3-encoder");

// require openai
const { Configuration, OpenAIApi } = require("openai");

// require program-language-detector
const { detect } = require("program-language-detector");

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
  apiKey: process.env.openai,
});

// create openai api from the account configuration
const openai = new OpenAIApi(configuration);

// port
const port = process.env.PORT || 3080;

// post to / a function to respond to the request
app.post("/", async (req, res) => {
  const { model, prompt, temperature, max_tokens } = req.body;
  console.log(
    `-----------
sending message to:
model: ${model}
prompt: ${prompt}
temperature: ${temperature}
------------`
  );
  const response = await openai.createCompletion({
    model: model,
    prompt: prompt,
    temperature: temperature,
    max_tokens: max_tokens,
  });

  res.status(200).json({
    success: true,
    data: response.data.choices[0].text,
    usage: response.data.usage,
  });
});

// post to /tokenizer a function to tokenize a string passed through the header
app.post("/tokenizer", async (req, res) => {
  const { string } = req.body;
  const response = encode(string).length;
  res.status(200).json({
    success: true,
    data: response,
  });
});

// post to program-language-detector to determine the programming language
// a given string represents
app.post("/program-language-detector", async (req, res) => {
  const { string } = req.body;
  return res.status(200).json({
    success: true,
    language: detect(string),
  });
});

// start listen
app.listen(port, () => console.log(`Server started on port ${port}`));
