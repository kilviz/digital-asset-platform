import { getFreeItemsContract,signer_address,isUserLogged} from './interacting.js'


// free mint buttons/
const free_film_mint = document.getElementById("free-mint-film")
const free_mint_music = document.getElementById("free-mint-music")
const free_mint_game = document.getElementById("free-mint-game")
const contract = getFreeItemsContract()


window.onload = isUserLogged()
console.log(await signer_address);
free_film_mint.addEventListener("click", async function () {
    try { 
        $(document.getElementById('exampleModalCenter')).modal('show')
        await contract.getFreeItem(2) 
    }
    catch (error) {
        $(document.getElementById('exampleModalCenter')).modal('hide')
    }
})

free_mint_music.addEventListener("click", async function () {
    try {
        $(document.getElementById('exampleModalCenter')).modal('show')
        await contract.getFreeItem(3)
    }
    catch (error) {
        $(document.getElementById('exampleModalCenter')).modal('hide')
    }
})

free_mint_game.addEventListener("click", async function () {
    try {
        $(document.getElementById('exampleModalCenter')).modal('show')
        await contract.getFreeItem(1)

    }
    catch (error) {
        $(document.getElementById('exampleModalCenter')).modal('hide')
    }
})
// ---



//----- handle events -----

contract.on("FreeItemMinted", (id, minter) => {
     $(document.getElementById('exampleModalCenter')).modal('hide')
})
