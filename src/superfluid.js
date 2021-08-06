import SuperfluidSDK from "@superfluid-finance/js-sdk";
import { 
//    getTimeStamp, 
//    getDate, 
    convertTo, 
//    convertFrom 
} from "./utils";

const Web3 = require("web3");

let web3; // Get this from Moralis
let aaveDAIx; // Ideally we can get this from a token list of sorts
let sf;

const toBN = (number) => web3.utils.toBN(number);

// To be called first after moralis is initialized
export async function initSuperfluid() {
  web3 = new Web3(window.ethereum);

  sf = new SuperfluidSDK.Framework({
    web3,
    version: "v1",
    tokens: ["aaveDAIx"]
  });

  await sf.initialize();

  aaveDAIx = sf.tokens.aaveDAIx;
  console.log(aaveDAIx);

  // await sf.host.batchCall(createBatchCall());
}

// To run this function, initSuperfluid() must be called first
// This function can be used to create, modify and terminate a flow
export async function flow(account, recipient, flowrate, token) {
  const user = await sf.user({
    address: account,
    token: token,
  });

  await user.flow({
    recipient: recipient,
    flowRate: flowrate,
  });

  const details = await user.details();
  console.log(details);

  // Call the host with the batch call parameters
}

// This function is used to updgrade aaveDAI to aaveDAIx
// and create a constant flow to a comptroller all in one transaction
export function createBatchCall(
  upgradeAmount = 0,
  depositAmount = 0,
  comptrollerAddr
) {
  console.log("Beginning batch call...");
  
  return [
    [
      101, // upgrade 'upgradeAmount' aaveDAIx to start a flow to a comptroller
      aaveDAIx.address,
      web3.eth.abi.encodeParameters(["uint256"], [convertTo(upgradeAmount, 18)]),
    ],
    [
      201, // create constant flow to comptroller
      sf.agreements.cfa.address,
      web3.eth.abi.encodeParameters(
        ["bytes", "bytes"],
        [
          sf.agreements.cfa.contract.methods
            .createFlow(
              aaveDAIx.address,
              // change this to the address of chinmay
              comptrollerAddr, // change it to app.address
              convertTo(depositAmount, 18).div(toBN(3600 * 24 * 30)),
              "0x"
            )
            .encodeABI(), // callData
          "0x", // userData
        ]
      ),
    ],
  ];
}
