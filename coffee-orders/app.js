let coffeeOrdersDiv = document.getElementById("coffeeOrdersDiv")
let emailTextBox = document.getElementById("emailTextBox")
let coffeeTextBox = document.getElementById("coffeeTextBox")
let submitButton = document.getElementById("submitButton")
let searchTextBox = document.getElementById("searchTextBox")
let searchButton = document.getElementById("searchButton")

let coffeeURL = "http://dc-coffeerun.herokuapp.com/api/coffeeorders/"
let orderURL = "http://dc-coffeerun.herokuapp.com/api/coffeeorders/emailaddress"

//fetch method same as async method below
// fetch(coffeeURL)
//     .then(response => response.json())
//     .then(json => {
//         let emailAddresses = Oject.keys(json)
//         //loop over keys
//         let coffeeItems = emailAddresses.map(email => {
//             let order = json[email]
//             return `template literal stuff`
//         })
//         coffeeOrdersDiv.innerHTML = coffeeItems.join('')
//     })

async function fetchCoffee() {
    let response = await fetch(coffeeURL)
    let json = await response.json()
    return json 
}

function displayOrders() {
    //here you could pass in a callback, or return a promise
//in this case i am returning a promise
fetchCoffee().then(json => {
    // the json you get from this is a nested object
    console.log(Object.keys(json)) //object.keys returns array of keys

    let orderKeys = Object.keys(json)

    let orders = orderKeys.map(key => {
        //return json[key]
        let order = json[key]
        return `<div class="coffeeOrder">
                    <h4>${order.coffee}</h4>
                    <p>${order.emailAddress}</p>
                    <button onclick="deleteOrder('${order.emailAddress}')">Delete Order</button>
                </div>`
    })

    coffeeOrdersDiv.innerHTML = orders.join('') 
}) 
}

displayOrders() 

function deleteOrder(email) {
    let orderURL = `http://dc-coffeerun.herokuapp.com/api/coffeeorders/${email}`
    console.log(orderURL)

    fetch(orderURL, {
        method:'DELETE'
    }).then(res => res.json())
    .then (json => {
        console.log(json)
        displayOrders()
    } )
}

submitButton.addEventListener('click', function () {
    let emailEntered = emailTextBox.value
    let coffeeEntered = coffeeTextBox.value

    fetch(coffeeURL, {
        method:'POST',
        body: JSON.stringify({emailAddress:emailEntered,coffee:coffeeEntered}),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then (json => displayOrders() )
    .catch(error => console.error('Error:',error))

}) 

searchButton.addEventListener('click', function (){
    let searchEmail = searchTextBox.value
    let searchURL = `http://dc-coffeerun.herokuapp.com/api/coffeeorders/${searchEmail}`


    
    fetch(searchURL, {
    }).then(res => res.json())
    .then (json => {searchDisplay(json)
    })

})

function searchDisplay (order) {

    let searchItems = `<div class="coffeeOrder">
                            <h4>${order.coffee}</h4>
                            <p>${order.emailAddress}</p>
                            <button onclick="deleteOrder('${order.emailAddress}')">Delete Order</button>
                        </div>`

    coffeeOrdersDiv.innerHTML = searchItems

}