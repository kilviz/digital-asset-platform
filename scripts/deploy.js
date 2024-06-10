const { ethers } = require("hardhat");
const hre = require("hardhat");
let getFreeItemsAddress=""
let buyAndSellAddress=""
let auctionAndBidsAddress=""



async function deployGetFreeMint(){
  [owner, account1, account2, account3] = await ethers.getSigners()
  const getFreeItem = await ethers.getContractFactory("GetFreeItems")
  const getFreeItemContract = await getFreeItem.connect(owner).deploy()
  getFreeItemAddress =  getFreeItemContract.address
  const lastGetFreeItemContract = await ethers.getContractAt("GetFreeItems",getFreeItemAddress)
  console.log("GetFreeItem deployed At ",getFreeItemAddress)
  return lastGetFreeItemContract
}

async function deployBuyAndSell(){
  const owner = await ethers.getSigner()
  const buyAndSell = await ethers.getContractFactory("BuyAndSell")  
  const buyAndSellContract = await buyAndSell.connect(owner).deploy(getFreeItemAddress)
  const lastedDeployedBuyAndSell = await ethers.getContractAt("BuyAndSell",buyAndSellContract.address)
  console.log("buy and sell ",buyAndSellContract.address);
  return lastedDeployedBuyAndSell
}

async function deployAuctionAndBid(){
  const owner = await ethers.getSigner()
  const auctionAndBid = await ethers.getContractFactory("AuctionAndBids")
  const auctionAndBidsContract = await auctionAndBid.connect(owner).deploy(getFreeItemAddress)
  const lastedDeployedAuctionAndBid = await ethers.getContractAt("AuctionAndBids",auctionAndBidsContract.address)
  console.log("Auction and Bids ",auctionAndBidsContract.address);
  return lastedDeployedAuctionAndBid
}


// async function deployGetFreeMint(){
//   [owner, account1, account2, account3] = await ethers.getSigners()
//   const getFreeItem = await ethers.getContractFactory("GetFreeItems")
//   const getFreeItemContract = await getFreeItem.connect(owner).deploy()
//   getFreeItemsAddress =  getFreeItemContract.address
//   const lastGetFreeItemContract = await ethers.getContractAt("GetFreeItems",getFreeItemsAddress)
//   console.log("GetFreeItem deployed At ",getFreeItemsAddress)
//   return lastGetFreeItemContract
// }

// async function deployBuyAndSell(){
//   const owner = await ethers.getSigner()
//   const buyAndSell = await ethers.getContractFactory("BuyAndSell")  
//   const buyAndSellContract = await buyAndSell.connect(owner).deploy(getFreeItemsAddress)
//   const lastedDeployedBuyAndSell = await ethers.getContractAt("BuyAndSell",buyAndSellContract.address)
//   buyAndSellAddress = buyAndSellContract.address
//   console.log("buy and sell ",buyAndSellContract.address);
//   return lastedDeployedBuyAndSell
// }

// async function deployAuctionAndBid(){
//   const owner = await ethers.getSigner()
//   const auctionAndBid = await ethers.getContractFactory("AuctionAndBids")
//   const auctionAndBidsContract = await auctionAndBid.connect(owner).deploy(getFreeItemsAddress)
//   const lastedDeployedAuctionAndBid = await ethers.getContractAt("AuctionAndBids",auctionAndBidsContract.address)
//   auctionAndBidsAddress = auctionAndBidsContract.address
//   console.log("Auction and Bids ",auctionAndBidsContract.address);
//   return lastedDeployedAuctionAndBid
// }

// async function allowedContracts(){
//   [owner, account1, account2, account3] = await ethers.getSigners()
//   const getFContract = await ethers.getContractAt("GetFreeItems", getFreeItemsAddress)

//   const change = await getFContract.connect(owner).changeBuyAndSellAddress(buyAndSellAddress, auctionAndBidsAddress)

// }

async function start() {
  await deployGetFreeMint()
  await deployBuyAndSell()
  await deployAuctionAndBid()
  await allowedContracts()
}

start()

module.exports = {
  deployGetFreeMint,deployBuyAndSell,deployAuctionAndBid,
  getFreeItemsAddress, buyAndSellAddress, auctionAndBidsAddress
}