// author: hongmei

const price_list = [
  { name: "apple", unit_price: 1 },
  { name: "pear", unit_price: 1.2 },
  { name: "pringles", unit_price: 4.2 },
  { name: "haribo gummy bear", unit_price: 10.0 },
  { name: "coca cola", unit_price: 1 },
  { name: "sprite", unit_price: 2 },
];

const test_input = "Apple, Apple, Coca Cola, Pringles, Sprite, Apple, Sprite";

let discounts = [];

// Given comma separated string,
// returns array
function toArray(user_input) {
  const purchases_array = user_input.toLowerCase().split(", ");
  return purchases_array;
}

// Given name of product,
// returns unit_price of product
function getUnitPrice(name) {
  for (let product of price_list) {
    if (name === product.name) {
      return product.unit_price;
    }
  }
}

// Given transaction array,
// return grand total of transaction
function grandTotal(transaction) {
  let grand_total = 0;

  for (let t of transaction) {
    grand_total += t.total();
  }

  return grand_total;
}

// Given array of purchases
// sort purchases by total costs
// returns sorted array of purchases
function sortTransaction(transaction) {
  function compare(a, b) {
    const costA = a.total();
    const costB = b.total();

    let comparison = 0;
    if (costA < costB) {
      comparison = 1;
    } else {
      comparison = -1;
    }

    return comparison;
  }

  return transaction.sort(compare);
}

// Given string of purchases,
// Output a receipt of the purchases
function transact(purchases) {
  let transaction = [];

  // change user input into array
  purchases_array = toArray(purchases);

  // get unique products
  const distinct_products = [...new Set(purchases_array)];

  // create & add purchase elements
  for (let purchase of distinct_products) {
    let purchase_obj = {
      name: purchase,
      price: getUnitPrice(purchase),
      quantity: 0,
      total: function () {
        return this.price * this.quantity;
      },
    };
    transaction.push(purchase_obj);
  }

  // update quantity of transaction elements
  for (let p of purchases_array) {
    for (let t of transaction) {
      if (p === t.name) {
        t.quantity += 1;
      }
    }
  }

  // sort transaction by total cost
  transaction = sortTransaction(transaction);

  // print receipt
  for (let i of transaction) {
    const total = i.total();
    console.log(
      `Quantity: ${i.quantity}x | Item: ${
        i.name
      } | Unit Price: $${i.price.toFixed(2)} | Total cost: $${total.toFixed(2)}`
    );
  }
  console.log(`Grand Total: $${grandTotal(transaction).toFixed(2)}`);
}

// set discount and return discount array
function setDiscount(
  discounts,
  product_name,
  min_quantity,
  discount_percentage
) {
  const discount = {
    name: product_name,
    min_quantity: min_quantity,
    discount: discount_percentage / 100,
  };

  discounts.push(discount);

  return discounts;
}

function applyDiscount(transaction, discounts) {
  for (let t of transaction) {
    // apply discount
    for (let d of discounts) {
      if (t.name === d.name && t.quantity >= d.min_quantity) {
        t.price *= 1 - d.discount;
      }
    }
  }
  return transaction;
}

console.log("== Task 1 ==");
transact(test_input);
console.log("== End of Task 1 ==");

function transactWithDis(purchases) {
  let transaction = [];

  console.log("Discounts Available at start: ");
  for (let d of discounts) {
    console.log(
      `Item: ${d.name} | Min: ${d.min_quantity} | Discount: ${d.discount}`
    );
  }

  // set discount
  discounts = setDiscount(discounts, "apple", 2, 10);
  discounts = setDiscount(discounts, "sprite", 2, 20);

  // change user input into array
  purchases_array = toArray(purchases);

  // get unique products
  const distinct_products = [...new Set(purchases_array)];

  // create & add purchase elements
  for (let purchase of distinct_products) {
    let purchase_obj = {
      name: purchase,
      price: getUnitPrice(purchase),
      quantity: 0,
      total: function () {
        return this.price * this.quantity;
      },
    };
    transaction.push(purchase_obj);
  }

  // update quantity of transaction elements
  for (let p of purchases_array) {
    for (let t of transaction) {
      if (p === t.name) {
        t.quantity += 1;
      }
    }
  }

  // apply discount
  transaction = applyDiscount(transaction, discounts);

  console.log("Discounts Available after setting discounts:");
  for (let d of discounts) {
    console.log(
      `Item: ${d.name} | Min: ${d.min_quantity} | Discount: ${d.discount}`
    );
  }

  // sort transaction by total cost
  transaction = sortTransaction(transaction);

  // print receipt
  for (let i of transaction) {
    const total = i.total();
    console.log(
      `Quantity: ${i.quantity}x | Item: ${
        i.name
      } | Unit Price: $${i.price.toFixed(2)} | Total cost: $${total.toFixed(2)}`
    );
  }
  console.log(`Grand Total: $${grandTotal(transaction).toFixed(2)}`);
}

console.log("\n== Task 2 ==");
transactWithDis(test_input);
console.log("== End of Task 2 ==");

/* Output

== Task 1 ==
Quantity: 1x | Item: pringles | Unit Price: $4.20 | Total cost: $4.20
Quantity: 2x | Item: sprite | Unit Price: $2.00 | Total cost: $4.00
Quantity: 3x | Item: apple | Unit Price: $1.00 | Total cost: $3.00
Quantity: 1x | Item: coca cola | Unit Price: $1.00 | Total cost: $1.00
Grand Total: $12.20
== End of Task 1 ==

== Task 2 ==
Discounts Available at start:
Discounts Available after setting discounts:
Item: apple | Min: 2 | Discount: 0.1
Item: sprite | Min: 2 | Discount: 0.2
Quantity: 1x | Item: pringles | Unit Price: $4.20 | Total cost: $4.20
Quantity: 2x | Item: sprite | Unit Price: $1.60 | Total cost: $3.20
Quantity: 3x | Item: apple | Unit Price: $0.90 | Total cost: $2.70
Quantity: 1x | Item: coca cola | Unit Price: $1.00 | Total cost: $1.00
Grand Total: $11.10
== End of Task 2 ==

*/
