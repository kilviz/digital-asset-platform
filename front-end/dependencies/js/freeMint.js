import { getFreeItemsContract,signer_address,isUserLogged} from './interacting.js'


// free mint buttons/
const free_film_mint = document.getElementById("free-mint-film")
const free_mint_music = document.getElementById("free-mint-music")
const free_mint_estate = document.getElementById("free-mint-estate")
const contract = getFreeItemsContract()

const inputFieldFilm = document.getElementById("input-field-film")
const inputFieldMusic = document.getElementById("input-field-music")
const inputFieldEstate = document.getElementById("input-field-estate")

window.onload = isUserLogged()
console.log(await signer_address);
free_film_mint.addEventListener("click", async function () {
    try { 
        $(document.getElementById('exampleModalCenter')).modal('show')
        const text = inputFieldFilm.value
        await contract.getFreeItem(2, text) 
    }
    catch (error) {
        $(document.getElementById('exampleModalCenter')).modal('hide')
    }
})

free_mint_music.addEventListener("click", async function () {
    try {
        $(document.getElementById('exampleModalCenter')).modal('show')
        const text = inputFieldMusic.value
        await contract.getFreeItem(3, text)
    }
    catch (error) {
        $(document.getElementById('exampleModalCenter')).modal('hide')
    }
})

free_mint_estate.addEventListener("click", async function () {
    try {
        $(document.getElementById('exampleModalCenter')).modal('show')
        const text = inputFieldEstate.value
        await contract.getFreeItem(1, text)

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
