import SuperfluidSDK from "@superfluid-finance/js-sdk";
import aaveDAIxDetails from './denominationAsset.json';
import { 
//    getTimeStamp, 
//    getDate, 
    convertTo, 
//    convertFrom 
} from "./utils";
import mWeb3 from "./mWeb3";

// const Web3 = require("web3");
// const web3 = Moralis.Web3.enable()
const mweb3 = mWeb3();


// let web3; // Get this from Moralis
let aaveDAIx; // Ideally we can get this from a token list of sorts
export let sf;

const toBN = (number) => mweb3.utils.toBN(number);

// To be called first after moralis is initialized
export async function initSuperfluid() {

  const web3 = await mweb3;
  // const {Moralis} = useMoralis();
  // let web3 =await Moralis.Web3.enable();
  // web3 = new Web3(window.ethereum);

  sf = new SuperfluidSDK.Framework({
    web3,
    version: "v1",
    tokens: ["aaveDAIx"]
  });

  await sf.initialize();

  aaveDAIx = sf.tokens.aaveDAIx;

  // await sf.host.batchCall(createBatchCall());
}

// To run this function, initSuperfluid() must be called first
// This function can be used to modify and terminate a flow
export async function modifyFlow(account, comptrollerAddr, flowrate) {
  const user = await sf.user({
    address: account,
    token: aaveDAIxDetails.address,
  });

  await user.flow({
    recipient: comptrollerAddr,
    flowRate: flowrate,
  });

  const details = await user.details();
  console.log(details);

  // Call the host with the batch call parameters
}

// This function is used to updgrade aaveDAI to aaveDAIx
// and create a constant flow to a comptroller all in one transaction
export function createFlow(
  upgradeAmount,
  depositAmount,
  comptrollerAddr
) {
  console.log("Beginning batch call...");
  
  sf.host.batchCall([
    [
      1,
      aaveDAIx.address,
      mweb3.eth.abi.encodeParameters(
          ["address", "uint256"],
          [comptrollerAddr, convertTo(depositAmount, 18)]
      )
    ],
    [
      101, // upgrade 'upgradeAmount' aaveDAIx to start a flow to a comptroller
      aaveDAIx.address,
      mweb3.eth.abi.encodeParameters(["uint256"], [convertTo(upgradeAmount, 18)]),
    ],
    [
      201, // create constant flow to comptroller
      sf.agreements.cfa.address,
      mweb3.eth.abi.encodeParameters(
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
  ]);
}
