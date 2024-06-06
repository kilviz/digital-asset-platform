const {deployBuyAndSell} = require ("./deploy")
const { ethers } = require("hardhat");


async function BuyAndSell(){
    const contract = await deployBuyAndSell()
    console.log(contract.address);
}

BuyAndSell()