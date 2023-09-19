// show dbs => list all the dbs
// use dbName => create & switch to dbName
// db => current db
//show collections

db.products.insertMany([
    {
        "name": "Iphone 14",
        "price": "1,27,999",
        "poster": "https://m.media-amazon.com/images/I/71T5NVOgbpL._SX679_.jpg",
        "category": "Electronics",
        "rating": 8,
        "description": "17.00 cm (6.7-inch) Super Retina XDR display featuring Always-On and ProMotion,48MP Main camera for up to 4x greater resolution"
    },
    {
        "name": "Lenovo Tab M10 HD 2nd Gen",
        "price": "9,199",
        "poster": "https://m.media-amazon.com/images/I/71UXXKK2gSL._SX679_.jpg",
        "category": "Electronics",
        "rating": 8.7,
        "description": "10.1 HD (1280x800) display with TDDI technology and 400 nits brightness and TUV Rhienland certified eye protection",
        "trailer": "https://www.youtube.com/embed/bbcpBC9Mbuk"
    },
    {
        "name": "U.S. POLO ASSN. Men T-Shirt",
        "price": "803",
        "poster": "https://m.media-amazon.com/images/I/819biZOXNrL._UX569_.jpg",
        "category": "Clothing Accessories",
        "rating": 7,
        "description": "Fit Type: Regular Fit, HALF SLEEVE POLO"
    }
])

db.products.find().pretty()

//rating  < 8 


db.products.find({ rating: { $lt: 8 } }).pretty()

//projection
//inclusion = 1
db.products.find({}, { name: 1, rating: 1 }).pretty()

//ignore _id

db.products.find({}, { _id: 0, name: 1, rating: 1 }).pretty()

//inclusion + exclusion ❌
db.products.find({}, { name: 0, rating: 1 }).pretty()

db.products.find({}, { name: 1, rating: 0 }).pretty()

//exclusion = 0
db.products.find({}, { _id: 0, name: 0, rating: 0 }).pretty()

//Sorting 
//asc = 1

db.products.find().sort({ rating: 1 }).pretty()

//desc = -1


db.products.find().sort({ rating: -1 }).pretty()

//limit
//first 2 highest rated products

db.products.find().sort({ rating: -1 }).limit(2).pretty()

//skip

db.products.find().sort({ rating: -1 }).skip(2).pretty()

//exclude _id, include name, rating, sort => desc

db.products.find({}, { _id: 0, name: 1, rating: 1 }).sort({ rating: -1 }).pretty()

//rating > 7, exclude _id, include name, price, sort => rating -desc, name-asc, limit -2

db.products.find({ rating: { $gt: 7 } }, { _id: 0, name: 1, price: 1, rating: 1 }).sort({ rating: -1, name: 1 }).limit(2).pretty()


// Aggregation

db.orders.insertMany([
    { _id: 0, productName: "Steel Beam", status: "new", quantity: 10 },
    { _id: 1, productName: "Steel Beam", status: "urgent", quantity: 20 },
    { _id: 2, productName: "Steel Beam", status: "urgent", quantity: 30 },
    { _id: 3, productName: "Iron Rod", status: "new", quantity: 15 },
    { _id: 4, productName: "Iron Rod", status: "urgent", quantity: 50 },
    { _id: 5, productName: "Iron Rod", status: "urgent", quantity: 10 },

])

db.orders.find().pretty()

//sql
//Select sum(quantity) from orders where status="urgent"
//group by productName

//Stage -1
db.orders.aggregate([{ $match: { status: "urgent" } }])

//Stage -2
// $group $sum

db.orders.aggregate([
    { $match: { status: "urgent" } },
    {
        $group:
        {
            _id: "$productName",
            totalUrgentQuantity: { $sum: "$quantity" }
        }
    }])



// Task
// 1. Update the quantity for all document -> by default -100

db.orders.updateMany({}, { $set: { quantity: 100 } })

// 2. Update rating for the "name" = "U.S. POLO ASSN. Men T-Shirt" from rating 7 to 6.5

db.products.updateOne({ name: "U.S. POLO ASSN. Men T-Shirt" }, { $set: { rating: 6.5 } })

// 3. Delete all products  with rating > 8.5

db.products.deleteMany({ rating: { $gt: 8.5 } })


// Cursor

var mycursor = db.orders.find({ _id: 5 }).pretty()
mycursor

// next()

var mycursor = db.orders.find({ _id: { $gt: 3 } }).pretty()
while (mycursor.hasNext()) {
    print(tojson(mycursor.next()))
}

// forEach()

var mycursor = db.orders.find({ _id: 5 }).pretty()
mycursor.forEach(printjson)


var mycursor = db.orders.find().forEach(function (myData) {
    print("orders => " + myData.productName)
})

var mycursor = db.products.find().forEach(function (myData) {
    print("products => " + myData.name + " " + myData.price)
})

//count

db.orders.find().count()

//toArray

db.orders.find().toArray()

//map

var listproductName = db.orders.find().map(function (data) {
    return data.productName
})

var listproductName = db.orders.find().map(function (data) { return data.quantity * 100 })




// Lookups



db.orders.insertMany([
    { "_id": 1, "item": "almonds", "price": 12, "quantity": 2 },
    { "_id": 2, "item": "pecans", "price": 20, "quantity": 1 },
    { "_id": 3 }
])

db.inventory.insertMany([
    { "_id": 1, "sku": "almonds", "description": "product 1", "instock": 120 },
    { "_id": 2, "sku": "bread", "description": "product 2", "instock": 80 },
    { "_id": 3, "sku": "cashews", "description": "product 3", "instock": 60 },
    { "_id": 4, "sku": "pecans", "description": "product 4", "instock": 70 },
    { "_id": 5, "sku": null, "description": "Incomplete" },
    { "_id": 6 }
])

db.orders.aggregate([
    {
        $lookup:
        {
            from: "inventory",
            localField: "item",
            foreignField: "sku",
            as: "combined_data"
        }
    }
])

[
    { "_id": 1, "item": "almonds", "price": 12, "quantity": 2 },
    { combined_data: [{ "_id": 1, "sku": "almonds", "description": "product 1", "instock": 120 }] }]