
let storeTextBox = document.getElementById("storeTextBox")
let addressTextBox = document.getElementById("addressTextBox")
let storeListDiv = document.getElementById("storeListDiv")
let addStore  = document.getElementById("addStore")

let database = firebase.database()
let storesRef = database.ref('stores')
let stores = []

storesRef.on('value', (observation) => {
    
    stores = []

    observation.forEach(item => {
        let storeItem = item.val() //object
        let store = new Store(storeItem.name, storeItem.address)
        store.storeId = item.key // unique ket from firebase database
        store.groceries = !storeItem.groceries ? [] : storeItem.groceries
        stores.push(store) //adding to an array
    })

    displayStores(stores)
    
})

function addGroceryItem(storeId, obj) {
    // find the store in local javascript array
    let store = stores.find(s => s.storeId == storeId)
    console.log(store)
    // gets the value from the text input
    let groceryItemName = obj.previousElementSibling.value
    // adds new grocery item to local javascript object store array
    store.addGrocery(new GroceryItems (groceryItemName, ""))
    // sets the value for node with store's id as the key to the new value of the store object
    storesRef.child(store.storeId).set(store)
}


function deleteStore(storeId) {
    storesRef.child(storeId).remove()
}

addStore.addEventListener('click', () => {
    let name = storeTextBox.value 
    storeTextBox.value = ""
    let address = addressTextBox.value
    addressTextBox.value = ""
    saveStore(name,address)
})


function saveStore(name,address) {

    let store = new Store(name,address)
    
    storesRef.push(store)
}

function displayStores(stores) {
    console.log(stores)
    let storeItems = stores.map(store => {
        console.log(store.groceries)
        let groceryItems = []
        if(store.groceries) {
            groceryItems = store.groceries.map(grocery => {
                return `<p>${grocery.groceryName} - ${grocery.quantity}</p>`
            }).join('')
        }

        return `<div>${store.name} - ${store.address} <button onclick='deleteStore("${store.storeId}")' >Delete </button> 
                <input type="text" id="groceryTextBox" placeholder="Enter grocery item" /> <button onclick='addGroceryItem("${store.storeId}",this)'>Add</button>
                ${groceryItems == null ? '' : groceryItems}
                </div>`
    })

    storeListDiv.innerHTML = storeItems.join('')

}

