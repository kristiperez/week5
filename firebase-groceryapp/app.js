
let storeTextBox = document.getElementById("storeTextBox")
let addressTextBox = document.getElementById("addressTextBox")
let storeListDiv = document.getElementById("storeListDiv")
let addStore  = document.getElementById("addStore")

let database = firebase.database()
let storesRef = database.ref('stores')

storesRef.on('value', (observation) => {
    
    let stores = []

    console.log("value changed event occured")
    for(key in observation.val()) {
        let store = observation.val()[key]
        store.key = key
        stores.push(store)
    }

    displayStores(stores)
})

function deleteStore(key) {
    storesRef.child(key).remove()
}

addStore.addEventListener('click', () => {
    let name = storeTextBox.value 
    storeTextBox.value = ""
    let address = addressTextBox.value
    addressTextBox.value = ""
    saveStore(name,address)
})


function saveStore(name,address) {
    storesRef.push({   // use push to create a random id for the node
        name: name,
        address: address
    })
}

function displayStores(stores) {
    let storeItems = stores.map(store => {
        return `<div>${store.name} - ${store.address} <button onclick='deleteStore("${store.key}")' >Delete </button> </div>`
    })

    storeListDiv.innerHTML = storeItems.join('')

}