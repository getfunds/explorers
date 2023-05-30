const axios = require('axios');

async function getBalance(address, page = 1) {
  const url = `https://api.helius.xyz/v0/addresses/${address}/balances?api-key=${process.env.HELIUS_KEY}&page=${page}`;
  const response = await axios.get(url);
  const tokens = response.data.tokens;

  if (tokens.length === 0) {
    return tokens;
  }

  const nextPage = response.data.nextPage;
  if (nextPage) {
    const nextPageTokens = await getBalance(address, nextPage);
    return tokens.concat(nextPageTokens);
  }

  return tokens;
}

async function getMetadata(tokens) {
  const url = `https://api.helius.xyz/v0/tokens/metadata?api-key=${process.env.HELIUS_KEY}`;
  const batchSize = 100;
  const mintAccounts = [];

  for (let i = 0; i < tokens.length; i += batchSize) {
    const batchTokens = tokens.slice(i, i + batchSize);
    const queryTokens = batchTokens.map((e) => e.mint);

    const response = await axios.post(url, { mintAccounts: queryTokens });
    const batchMetadata = response.data;

    for (let j = 0; j < batchMetadata.length; j++) {
      batchMetadata[j].amount = batchTokens[j].amount;
    }

    mintAccounts.push(...batchMetadata);
  }

  return mintAccounts;
}

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { address } = req.body;

      const balance = await getBalance(address);
      const balanceMetadata = await getMetadata(balance);

      res.status(200).json(balanceMetadata);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred' });
  }
}
