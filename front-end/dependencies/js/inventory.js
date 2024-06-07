
import { getFreeItemsContract, signer_address, buyAndSellContract, auctionAndBidsContract } from './interacting.js'

const itemsContainer = document.getElementById("itemsContainer")
const onSellItems = document.getElementById("onSellItems")
const ItemTitle = document.getElementById("ItemTitle")
const soldItemsBtn = document.getElementById("soldItems")
const acutiondropdown = document.getElementById("acutiondropdown")
// main var 
const closeBtn = document.getElementById("closeBtn")
const closeBtn2 = document.getElementById("closeBtn2")
const closeBtn3 = document.getElementById("closeBtn3")
const closeBtn4 = document.getElementById("closeBtn4")
const closeBtnAucion = document.getElementById("closeBtnAucion")
// --- read value from sell button
const sellPrice = document.getElementById("price")
const itemid = document.getElementById("itemid")
const confirmedSellBtn = document.getElementById("confirmedSellBtn")
const AuctionPrice = document.getElementById("AuctionPrice")
const hours = document.getElementById("hours")
const auctionSell = document.getElementById("auctionSell")
const FreeItemsContract = getFreeItemsContract()
const SellAndBuyContract = buyAndSellContract()
const AuctionAndBidsContract = auctionAndBidsContract()
const itemidForAuction = document.getElementById("itemidForAuction")
const confirmeApproveSell = document.getElementById("confirmeApprove")
const available = document.getElementById("available")
const closemodalAuction = document.getElementById("closemodalAuction")
const closeBtnapau = document.getElementById("closeBtnapau")
const confirmeApproveAuction = document.getElementById("confirmeApproveAuction")
const badeAcution = document.getElementById("badeAcution")
const badeAcutionSec = document.getElementById("badeAcutionSec")



function renderCards(title, nftId, src, text) {
    document.getElementById("containerRow").innerHTML += `<div class="col id="rowone"">
    
          <div class="card shadow-lg p-3 mb-5 bg-white rounded"  style="width: 16rem; ">
          <div id="card"  class="card">
            <img src=${src} class="card-img-top" alt="...">
            <div class="card-body">
            
                <h5 class="card-title">${title}</h5>
                <span class="card-text ">Nft Id : <span class ="idSpan" >${nftId}</span></span><br>
                <span class="card-text ">Nft Id : <span class ="idSpan" >${text}</span></span><br>
                <button class="btn btn-danger" id="sellBtn" value="${nftId}">Sell</button>
                <button class="btn btn-dark" id="auctionBtn" value="${nftId}">Auction</button>
            </div>
            </div>
            </div>
           </div>`
}
function renderOnSellItems(title, nftId, price, src) {
    document.getElementById("onSellRow").innerHTML += `<div class="col onsellCol">
          <div class="card shadow-lg p-3 mb-5 bg-white rounded" style="width: 16rem;">
            <img src=${src} class="card-img-top" alt="...">
            <div class="card-body">
  
                <h5 class="card-title">${title}</h5>
                <span class="card-text">Nft Id : <span id="nft-film-id">${nftId}</span></span><br>
                <span class="card-text">Price: <span id="nft-film-id">${price}</span> Eth</span><br>
                <button class="btn btn-danger" id="cancelItem" value="${nftId}">Cancel</button>
            </div>
            </div>
  
           </div>`
}
function renderSoldItems(title, nftId, src) {
    document.getElementById("soldRow").innerHTML += `<div class="col onsellCol">
          <div class="card shadow-lg p-3 mb-5 bg-white rounded" style="width: 16rem;">
            <img src=${src} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <span class="card-text">Nft Id : <span id="nft-film-id">${nftId}</span></span><br>
            </div>
            </div>
  
           </div>`
}
function renderInAuction(title, nftId, price, src, timeLeft,auctionId) {
    document.getElementById("inAuction").innerHTML += `<div class="col onsellCol">
          <div class="card shadow-lg p-3 mb-5 bg-white rounded" style="width: 16rem;">
            <img src=${src} class="card-img-top" alt="...">
            <div class="card-body">
  
                <h5 class="card-title">${title}</h5>
                <span class="card-text">Nft Id : <span id="nft-film-id">${nftId}</span></span><br>
                <span class="card-text">Highest Bid: <span id="nft-film-id">${price}</span> Eth</span><br>
                <span class="card-text">Time left: <span id="nft-film-id">${timeLeft}</span></span><br>
                <button class="btn btn-danger" id="cancelItem" value="${nftId}">Cancel</button>
                <button class="btn btn-dark" id="endAuction" value="${auctionId}">End Auction</button> <br>
            </div>
            </div>
  
           </div>`
}
function renderBadeAuction(title, nftId, price, src, timeLeft,auctionId,userBids) {
    document.getElementById("badeAcutionSec").innerHTML += `<div class="col onsellCol">
          <div class="card shadow-lg p-3 mb-5 bg-white rounded" style="width: 16rem;">
            <img src=${src} class="card-img-top" alt="...">
            <div class="card-body">
  
                <h5 class="card-title">${title}</h5>
                <span class="card-text">Nft Id : <span id="nft-film-id">${nftId}</span></span><br>
                <span class="card-text">Highest Bid: <span id="nft-film-id">${price}</span> Eth</span><br>
                <span class="card-text">Time left: <span id="nft-film-id">${timeLeft}</span></span><br>
                <span class="card-text">You bid: <span id="nft-film-id">${userBids}</span> Eth</span><br>
                <button class="btn btn-danger" id="endAuction2" value="${auctionId}">End Auction</button> <br>
                <button class="btn btn-dark withra" id="withdrawBtn" style= "margin-top : 2px; " value="${auctionId}">Withdraw Bids</button> 
            </div>
            </div>
  
           </div>`
}
window.onload = availableItems()

async function availableItems() {
    available.style.visibility = "hidden"
    inAuction.innerHTML = ""
    const filmImg = "dependencies/img/film.jpg"
    const musicImg = "dependencies/img/music.jpg"
    const estateImg = "dependencies/img/real_estate.png"
    const allAvailableItems = await FreeItemsContract.getUserInventory(signer_address)
    for (let i = 0; i < allAvailableItems.length; i++) {
        if (allAvailableItems[i]._type == 2) {
            renderCards("Film", allAvailableItems[i].id, filmImg, allAvailableItems[i].text)
        }
        if (allAvailableItems[i]._type == 1) {
            renderCards("Estate", allAvailableItems[i].id, estateImg,allAvailableItems[i].text)
        }
        if (allAvailableItems[i]._type == 3) {
            renderCards("Music", allAvailableItems[i].id, musicImg,allAvailableItems[i].text)
        }
    }



}
async function onSellItemsFunction() {
    const filmImg = "dependencies/img/film.jpg"
    const musicImg = "dependencies/img/music.jpg"
    const estateImg = "dependencies/img/real_estate.png"
    const allOnSellItems = await SellAndBuyContract.getUserOnSellItems(signer_address)

    console.log(allOnSellItems);
    for (let i = 0; i < allOnSellItems.length; i++) {
        const item = await FreeItemsContract.getItemDetails(allOnSellItems[i].itemId)
        if (item._type == 2) {
            renderOnSellItems("Film", item.id, ethers.utils.formatEther(allOnSellItems[i].price), filmImg)
        }
        if (item._type == 1) {
            renderOnSellItems("Estate", item.id, ethers.utils.formatEther(allOnSellItems[i].price), estateImg)
        }
        if (item._type == 3) {
            renderOnSellItems("Music", item.id, ethers.utils.formatEther(allOnSellItems[i].price), musicImg)
        }
    }


}
async function soldItems() {
    const filmImg = "dependencies/img/film.jpg"
    const musicImg = "dependencies/img/music.jpg"
    const estateImg = "dependencies/img/real_estate.png"
    const allSoldItems = await SellAndBuyContract.getUserSoldProducts(signer_address)

    for (let index = 0; index < allSoldItems.length; index++) {
        const itemId = allSoldItems[index]
        const item = await FreeItemsContract.getItemDetails(itemId)
        if (item._type == 2) {
            renderSoldItems("Film", item.id, filmImg)
        }
        if (item._type == 1) {
            renderSoldItems("Estate", item.id, estateImg)
        }
        if (item._type == 3) {
            renderSoldItems("Music", item.id, musicImg)
        }

    }
}


function convertHMS(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hours + ':' + minutes + ':' + seconds; // Return is HH : MM : SS
}
async function renderBadeAution(){
    const filmImg = "dependencies/img/film.jpg"
    const musicImg = "dependencies/img/music.jpg"
    const estateImg = "dependencies/img/real_estate.png"
    const allAuctions = await AuctionAndBidsContract.totalAuctionsCreated()

    for (let index = 1; index <= allAuctions; index++) {
        
        const auction = await AuctionAndBidsContract.getAuctionDetails(index)
        const isBidder = await AuctionAndBidsContract.isUserBidder(signer_address)
        if (isBidder === true ) {
            const item = await FreeItemsContract.getItemDetails(auction.itemId)
            const currentTime = (new Date().getTime() / 1000).toFixed(0);
            const userBid = await AuctionAndBidsContract.getBalanceOf(signer_address,auction.id)
            
            let timeInS = ""
            if (item._type == 2) {
                if(currentTime < auction.endAt){
                    timeInS = convertHMS(auction.endAt - currentTime )                   
                }
                else {
                    timeInS = "00:00:00"
                }
                
                renderBadeAuction("Film", item.id, ethers.utils.formatEther(auction.highestBid), filmImg,timeInS,index,ethers.utils.formatEther(userBid))
            }
            if (item._type == 1) {
                if(currentTime < auction.endAt){
                    timeInS = convertHMS(auction.endAt - currentTime )
                }
                else {
                    timeInS = "00:00:00"
                }
                
                renderBadeAuction("Estate", item.id, ethers.utils.formatEther(auction.highestBid), estateImg, timeInS, index,ethers.utils.formatEther(userBid))
            }
            if (item._type == 3) {
                if(currentTime < auction.endAt){
                    timeInS = convertHMS(auction.endAt - currentTime)
                }
                else {
                    timeInS = "00:00:00"
                }
                renderBadeAuction("Music", item.id, ethers.utils.formatEther(auction.highestBid), musicImg, timeInS, index,ethers.utils.formatEther(userBid))
            }
        }
    }

}
async function inAutionItems() {
    const filmImg = "dependencies/img/film.jpg"
    const musicImg = "dependencies/img/music.jpg"
    const estateImg = "dependencies/img/real_estate.png"
    const allAuctions = await AuctionAndBidsContract.totalAuctionsCreated()
    for (let index = 1; index <= allAuctions; index++) {
        
        const auction = await AuctionAndBidsContract.getAuctionDetails(index)
        if (await auction.seller === await signer_address) {
            const item = await FreeItemsContract.getItemDetails(auction.itemId)
            const currentTime = (new Date().getTime() / 1000).toFixed(0);
            
            let timeInS = ""
            if (item._type == 2&& auction.start === true && auction.end === false) {
                if(currentTime < auction.endAt){
                    timeInS = convertHMS(auction.endAt - currentTime )                   
                }
                else {
                    timeInS = "00:00:00"
                }
                
                renderInAuction("Film", item.id, ethers.utils.formatEther(auction.highestBid), filmImg,timeInS,index)
            }
            if (item._type == 1 && auction.start === true && auction.end === false) {
                if(currentTime < auction.endAt){
                    timeInS = convertHMS(auction.endAt - currentTime )
                }
                else {
                    timeInS = "00:00:00"
                }
                
                renderInAuction("Estate", item.id, ethers.utils.formatEther(auction.highestBid), estateImg, timeInS, index)
            }
            if (item._type == 3 && auction.start === true && auction.end === false) {
                if(currentTime < auction.endAt){
                    timeInS = convertHMS(auction.endAt - currentTime)
                }
                else {
                    timeInS = "00:00:00"
                }
                renderInAuction("Music", item.id, ethers.utils.formatEther(auction.highestBid), musicImg, timeInS, index)
            }
        }
    }

}
available.addEventListener("click", () => {
    inAuction.innerHTML = ""
    onSellRow.innerHTML = ""
    soldRow.innerHTML = ""
    badeAcutionSec.innerHTML = ""
    ItemTitle.textContent = "Мои предметы"
    available.style.visibility = "hidden"
    soldItemsBtn.style.visibility = "visible"
    onSellItems.style.visibility = "visible"
    acutiondropdown.style.visibility = "visible"
    badeAcution.style.visibility = "visible"
    availableItems()
})

onSellItems.addEventListener("click", () => {
    containerRow.innerHTML = ""
    soldRow.innerHTML = ""
    inAuction.innerHTML = ""
    badeAcutionSec.innerHTML = ""
    ItemTitle.textContent = "Предметы на продаже"
    onSellItems.style.visibility = "hidden"
    soldItemsBtn.style.visibility = "visible"
    available.style.visibility = "visible"
    acutiondropdown.style.visibility = "visible"
    badeAcution.style.visibility = "visible"
    onSellItemsFunction()
})
acutiondropdown.addEventListener("click", () => {
    containerRow.innerHTML = ""
    onSellRow.innerHTML = ""
    soldRow.innerHTML = ""
    badeAcutionSec.innerHTML = ""
    ItemTitle.textContent = "Мои предметы на аукционе"
    onSellItems.style.visibility = "visible"
    available.style.visibility = "visible"
    soldItemsBtn.style.visibility = "visible"
    badeAcution.style.visibility = "visible"
    acutiondropdown.style.visibility = "hidden"

    inAutionItems()
})
soldItemsBtn.addEventListener("click", () => {
    containerRow.innerHTML = ""
    onSellRow.innerHTML = ""
    inAuction.innerHTML = ""
    badeAcutionSec.innerHTML = ""
    ItemTitle.textContent = "Проданные предметы"
    onSellItems.style.visibility = "visible"
    available.style.visibility = "visible"
    soldItemsBtn.style.visibility = "hidden"
    badeAcution.style.visibility = "visible"
    acutiondropdown.style.visibility = "visible"
    soldItems()
})
badeAcution.addEventListener("click",()=>{
    containerRow.innerHTML = ""
    onSellRow.innerHTML = ""
    inAuction.innerHTML = ""
    soldRow.innerHTML = ""
    ItemTitle.textContent = "Предметы на аукционе"
    onSellItems.style.visibility = "visible"
    available.style.visibility = "visible"
    soldItemsBtn.style.visibility = "visible"
    badeAcution.style.visibility = "hidden"
    acutiondropdown.style.visibility = "visible"
    renderBadeAution()
})


//sell item 

document.addEventListener('click', async function expendModal(e) {
    if (e.target && e.target.id == 'sellBtn') {

        const isApproved = await FreeItemsContract.isApprovedForAll(signer_address, SellAndBuyContract.address)
        if (isApproved === false) {
            console.log("not approved")
            $(document.getElementById('approveModal')).modal("show")
        }
        else {
            e.target.textContent = "Sell"
            const id = (e.target.value)
            $("#itemid").val(id)
            document.getElementById("itemid").disabled = true
            $(document.getElementById('exampleModalCenter')).modal("show")
        }
    }
})
document.addEventListener('click', async function expendModal(e) {
    if (e.target && e.target.id == 'cancelItem') {

        try {
            const itemId = (e.target.value)
            $(document.getElementById('waitingModal')).modal('show')
            const cancel = SellAndBuyContract.cancelSell(itemId)
        } catch (error) {
            $(document.getElementById('waitingModal')).modal('hide')

        }
    }
})
document.addEventListener('click', async function expendModal(e) {
    if (e.target && e.target.id == 'auctionBtn') {

        try {
            const isApproved = await FreeItemsContract.isApprovedForAll(signer_address, AuctionAndBidsContract.address)
            if (isApproved === false) {
                console.log("not approved")
                $(document.getElementById('approveAuction')).modal("show")
            }
            else {
                const id = (e.target.value)
                $("#itemidForAuction").val(id)
                document.getElementById("itemidForAuction").disabled = true
                $(document.getElementById('auctionModal')).modal('show')
            }
        } catch (error) {
            $(document.getElementById('waitingModal')).modal('hide')

        }
    }
})
document.addEventListener('click',async function(e){
    if(e.target.id === 'withdrawBtn'){
        try {
            const aucId = (e.target.value)
            $(document.getElementById('waitingModal')).modal('show')
            const widthraw = await AuctionAndBidsContract.withdrawBids(aucId)
        } catch (error) {
            $(document.getElementById('waitingModal')).modal('hide')
            console.log(error);
        }
    }
})
confirmedSellBtn.addEventListener("click", async () => {
    try {
        $(document.getElementById('waitingModal')).modal('show')

        const priceValue = sellPrice.value
        const itemId = itemid.value
        const amount = ethers.utils.parseEther(priceValue)
        const sell = await SellAndBuyContract.putProductToSell(itemId, amount)
        await sell.wait()

    }
    catch (error) {
        $(document.getElementById('waitingModal')).modal('hide')
        console.log(error)
    }
})
async function approveFunc(contractAddress) {
    try {
        $(document.getElementById('waitingModal')).modal('show')
        const approve = await FreeItemsContract.setApprovalForAll(contractAddress.address, true)
        await approve.wait()
    }
    catch (error) {
        $(document.getElementById('waitingModal')).modal('hide')
    }
}
confirmeApproveSell.addEventListener("click", async () => {
    approveFunc(SellAndBuyContract)
})
confirmeApproveAuction.addEventListener("click", async () => {
    approveFunc(AuctionAndBidsContract)
})


auctionSell.addEventListener("click", async () => {
    try {

        const price = AuctionPrice.value
        const auctionhours = hours.value
        const id = itemidForAuction.value
        $(document.getElementById('waitingModal')).modal('show')
        const createAuction = AuctionAndBidsContract.createAuction(id, auctionhours, ethers.utils.parseEther(price))
        $(document.getElementById('auctionModal')).modal('hide')
    } catch (error) {
        console.log(error);
        $(document.getElementById('waitingModal')).modal('hide')
        $(document.getElementById('auctionModal')).modal('hide')


    }
})
document.addEventListener("click",async (e)=>{
    if(e.target.id == "endAuction"){
        const auctionId = e.target.value
        const auction  = await AuctionAndBidsContract.getAuctionDetails(auctionId)
        const currentTime = (new Date().getTime() / 1000).toFixed(0);
        if(currentTime > auction.endAt){
            try {
                $(document.getElementById('waitingModal')).modal('show')
                const cancel = await AuctionAndBidsContract.endAuction(auctionId)
            } catch (error) {
                console.log(error)
                $(document.getElementById('waitingModal')).modal('hide')
            }
            
        }
     }
})
document.addEventListener("click",async (e)=>{
    if(e.target.id == "endAuction2"){
        const auctionId = e.target.value
        const auction  = await AuctionAndBidsContract.getAuctionDetails(auctionId)
        const currentTime = (new Date().getTime() / 1000).toFixed(0);
        if(currentTime > auction.endAt){
            try {
                $(document.getElementById('waitingModal')).modal('show')
                const cancel = await AuctionAndBidsContract.endAuction(auctionId)
            } catch (error) {
                console.log(error)
                $(document.getElementById('waitingModal')).modal('hide')
            }
            
        }
     }
})
//---------- Close Modal -----

closeBtn.addEventListener("click", () => {
    $(document.getElementById('exampleModalCenter')).modal("hide")
})

closeBtn2.addEventListener("click", () => {
    $(document.getElementById('exampleModalCenter')).modal("hide")
})
closeBtn4.addEventListener("click", () => {
    $(document.getElementById('approveModal')).modal("hide")
})

closeBtn3.addEventListener("click", () => {
    $(document.getElementById('approveModal')).modal("hide")
})

closeBtnAucion.addEventListener("click", () => {
    $(document.getElementById('auctionModal')).modal("hide")
})
closeBtnapau.addEventListener("click", () => {
    $(document.getElementById('auctionModal')).modal("hide")
})
closemodalAuction.addEventListener("click", () => {
    $(document.getElementById('auctionModal')).modal("hide")
})

FreeItemsContract.on("ApprovalForAll", () => {

    $(document.getElementById('waitingModal')).modal('hide')
    $(document.getElementById('approveModal')).modal('hide')
    $(document.getElementById('approveAuction')).modal("hide")


})

SellAndBuyContract.on("ItemIsOnSale", () => {
    $(document.getElementById('waitingModal')).modal('hide')
    $(document.getElementById('exampleModalCenter')).modal('hide')
})

SellAndBuyContract.on("ItemCanceled", () => {
    $(document.getElementById('waitingModal')).modal('hide')
})
AuctionAndBidsContract.on("AuctionCreated", () => {
    $(document.getElementById('waitingModal')).modal('hide')
})

AuctionAndBidsContract.on("AuctionEnded",()=>{
    $(document.getElementById('waitingModal')).modal('hide')
})