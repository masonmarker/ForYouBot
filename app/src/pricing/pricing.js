/**
 * Computes pricing given certain OpenAI API parameters.
 * 
 * All figures are in USD.
 *
 * author : 
 *  Mason Marker 
 */


// listed pricing rates per OpenAI model
const pricingPer1kTokens = {
    "ada": 0.0004,
    "babbage": 0.0005,
    "curie": 0.0020,
    "davinci": 0.0200
};

// uses the above map to compute pricing per 1 token
const pricingPer1Token = {
    "ada": pricingPer1kTokens["ada"] / 1000,
    "babbage": pricingPer1kTokens["babbage"] / 1000,
    "curie": pricingPer1kTokens["curie"] / 1000,
    "davinci": pricingPer1kTokens["davinci"] / 1000
};

// rough approximation of words per single token
const words_per_token = 0.75;

// computes how many tokens are needed for a given number of words
function tokensForWords(words) {
    return Math.ceil(words_per_token * words);
}

// computes how many words are needed for a given number of tokens
function wordsForTokens(tokens) {
    return Math.ceil(tokens / words_per_token);
}

// price for words
function priceForTokens(tokens, model) {
    return tokens * pricingPer1Token[model];
}

// price for tokens

export { 
    tokensForWords, 
    wordsForTokens,
    priceForTokens,
}