class Store {
    constructor(name,address) {
        this.name = name
        this.address = address
        this.storeId = ""
        this.groceries = []
    }

    addGrocery(grocery) {
        this.groceries.push(grocery)
    }
}