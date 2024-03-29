/**
 * Contains information for available models
 *
 * author :
 *  Mason Marker
 */

// model information
const models = {
  // gpt-4
  gpt4: {
    name: "gpt-4",
    description:
      "The most powerful model yet. Will be updated with our latest model iteration.",
    pricePer1Token: 0.00003,
    maxRequest: 8192,
    attributes: [
      ["For Text", "green"],
      ["Most Powerful", "green"],
      ["Most Accurate", "green"],
      ["$$$$", "orange"],
    ],
  },

  // gpt 3.5 latest turbo model at 1/10 the price of davinci
  turbo: {
    name: "gpt-3.5-turbo",
    description:
      "	Most capable GPT-3.5 model and optimized for chat at 1/10th the cost of text-davinci-003. Will be updated with our latest model iteration.",
    pricePer1Token: 0.000002,
    maxRequest: 4096,
    attributes: [
      ["For Text", "green"],
      ["Highly Capable", "green"],
      ["Most Accurate", "green"],
      ["$$", "green"],
    ],
  },

  // gpt 3.5 latest davinci model
  davinci: {
    name: "text-davinci-003",
    description:
      "Optimized for text generation and chat. Will be updated with our latest model iteration.",
    pricePer1Token: 0.00002,
    maxRequest: 4097,
    attributes: [
      ["For Text", "green"],
      ["Most Powerful", "green"],
      ["Most Accurate", "green"],
      ["$$$", "orange"],
    ],
  },

  // gpt 3.5 coding model
  code: {
    name: "code-davinci-002",
    description: "Optimized for code completion",
    pricePer1Token: 0.00002,
    maxRequest: 8001,
    attributes: [
      ["For Coding", "green"],
      ["Accurate", "green"],
      ["Fast", "green"],
      ["$$$", "orange"],
    ],
  },
};

// computes price for tokens and model
function priceForTokens(tokens, model) {
  return tokens * models[model].pricePer1Token;
}

export default models;
export { priceForTokens };
