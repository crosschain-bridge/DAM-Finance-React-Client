import ComptrollerV2 from '../abis/ComptrollerV2.json';
import { convertTo, convertFrom } from './utils';
import mWeb3 from './mWeb3';

let web3 = null;

mWeb3()
    .then((w) => {
        web3 = w;
    })
    .catch((err) => console.log(err));

export let comptroller;

function checkIfInit() {
    // Write code to throw an error if initComptroller hasn't been called i.e. comptroller === null
}

// Function to initialize a comptroller
export function initComptroller(comptrollerAddr) {
    try {
        comptroller = new web3.eth.Contract(ComptrollerV2.abi, comptrollerAddr);
        console.log(`Comptroller ${comptrollerAddr} initialized`);
    } catch (err) {
        console.log("initComptroller ERR: ", err)
    };
}

// Function to get withdrawable amount of a user
export async function withdrawable(userAddr) {
    try {
        const amount = await comptroller.methods.withdrawable(userAddr).call();
        console.log(`User ${userAddr} withdrawable amount is ${convertFrom(amount, 18)}`);
        return convertFrom(amount, 18);
    } catch (err) {
        console.log("withdrawable ERR: ", err);
    }
}

// Function to withdraw tokens from a comptroller
// Check if this requires userAddr as an argument or else can we use moralis directly ?
export async function withdrawAmount(amount, userAddr) {
    try {
        await comptroller.methods.withdrawAmount(convertTo(amount, 18)).send({ from: userAddr });
        console.log(`Withdrawal of amount ${amount} initiated for address ${userAddr}`);
    } catch (err) {
        console.log("withdrawAmount ERR: ", err);
    }
}

// Write the code to fetch data from subgraph inside this function or pass that data to this function
// by adding two more parameters (flowrate and flowtimestamp)
export async function calcUserInvested(userAddr) {
    // write code to get the flow details of a user from superfluid subgraph
    try {
        // This is a view function
        // Add flowrate and flowtimestamp that you got from superfluid subgraph
        const investedAmount = await comptroller.methods.calcUserInvested(userAddr, /*flowrate, flowtimestamp*/).call();
        console.log(`${userAddr} invested amount is ${investedAmount.toString()}`);
        return convertFrom(investedAmount, 18);
    } catch (err) {
        console.log("calcUserInvested ERR: ", err);
    }
}

// Returns inflow/netflow to a comptroller in tokens/seconds
// Superfluid subgraph probably provides a function to get this data explore that
export async function calcUserUninvested(userAddr) {
    try {
        const uninvestedAmount = await comptroller.methods.calcUserUninvested(userAddr).call();
        console.log(`${userAddr} uninvested amount is ${uninvestedAmount.toString()}`);
        return convertFrom(uninvestedAmount, 18);
    } catch (err) {
        console.log("calcUserUninvested ERR: ", err);
    }
}

export async function calcShare(userAddr) {
    try {
        const userShare = await comptroller.methods.calcShare(userAddr).call();
        console.log(`Share of ${userAddr} is ${userShare.toString()}`);
        return convertFrom(userShare, 18);
    } catch (err) {
        console.log("calcShare ERR: ", err);
    }
}

export async function getNetFlow() {
    try {
        const netFlow = await comptroller.methods._getNetFlow().call();
        console.log(`Net flow of comptroller ${comptroller.address} is ${netFlow.toString()}`);
        return netFlow.toString();
    } catch (err) {
        console.log("getNetFlow ERR: ", err);
    }
}

export async function calcTotalAmount() {
    try {
        const totalAmount = await comptroller.methods._calcTotalAmount().call();
        console.log(`Total amount streamed which are present in ${comptroller.address} is ${totalAmount.toString()}`);
        return convertFrom(totalAmount, 18);
    } catch (err) {
        console.log("calcTotalAmount ERR: ", err);
    }
}