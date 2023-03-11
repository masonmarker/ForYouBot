/**
 * Computes pricing given certain OpenAI API parameters.
 * 
 * All figures are in USD.
 *
 * author : 
 *  Mason Marker 
 */

// for extracting an amount of tokens


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

// price for tokens
function priceForTokens(tokens, model) {
    return tokens * pricingPer1Token[model];
}

export { priceForTokens }