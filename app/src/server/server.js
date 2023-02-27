const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const app = express();

app.use(express.json());

console.log(process.env.OPENAI_API_KEY)

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// app.post("/ask", async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     const response = await openai.complete({
//         model: "text-davinci-003",
//         prompt:  `
//             ${prompt}
//         `,
//         max_tokens: 64,
//         temperature: 0,
//         top_p: 1.0,
//         frequency_penalty: 0.0,
//         presence_penalty: 0.0
//     });

//     return res.status(200).json({
//         success: true,
//         data: response.data.choices[0].text
//     })
//   } catch (error) {}
// });


// sends a request to the API and returns the response
async function ask(question) {
  console.log("asking question...")
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: question,
    max_tokens: 64,
    temperature: 0,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  console.log(response.data.choices[0].text.data);
}

// make a request to the API
ask("What is the meaning of life?");

// const port = process.env.PORT || 5000;

// app.listen(port, () => console.log(`Server started on port ${port}`));
