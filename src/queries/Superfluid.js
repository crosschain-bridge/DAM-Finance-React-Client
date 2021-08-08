import Fetch from './Fetch';

const URL =
  'https://api.thegraph.com/subgraphs/name/superfluid-finance/superfluid-mumbai';

export const GetFlowDetails = async ({ owner, recipient, tokenAddress }) => {
  const query = {
    query: `
      flows(where: {
          owner: "${owner.toLowerCase()}"
          recipient: "${recipient.toLowerCase()}"
        }
      ){
        sum
        flowRate
        lastUpdate
        token {
          name
          symbol
        }
      }`,
  };

  try {
    const data = await Fetch(query, URL);
    return data;
  } catch (err) {
    console.log(err);
  }
};
