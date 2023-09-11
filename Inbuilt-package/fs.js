const fs = require("fs")

const quote = "No beauty shines brighter than that of a good heart🥳"
//create + write
fs.writeFile("awesome.pdf", quote, (err) => {
    console.log("Completed writing awesome.html")
})

//Task - 1

const quote2 = "Live more, worry Less🥳🥳🥳"
//Create the below files with quote2 as the content
// /backup/
// text-1.html
// text-2.html
// text-3.html
//..
// text-10.html