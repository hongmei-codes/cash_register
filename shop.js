// author: hongmei

// ======= Task 1a =======
const price_list = [
    {name: "apple", unit_price: 0.33},
    {name: "pringles", unit_price: 4.20},
    {name: "coca cola", unit_price: 1},
    {name: "sprite", unit_price: 1}
];

const user_input = ["Apple", "Apple", "Coca Cola", "Pringles", "Sprite", "Apple", "Sprite"]

function getTotal(user_input) {
    let transaction = []

    for (p of price_list) {
        if (user_input[0].name.toLowerCase === p.name) {
            transaction.push({name: user_input[0], unit_price: p.unit_price, quantity: 1})
        }
    }

}

// calling getTotal using sample items
