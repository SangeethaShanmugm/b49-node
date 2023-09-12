const fs = require("fs")
const { writeFile } = require("fs/promises")

const quote = "No beauty shines brighter than that of a good heart🥳"
//create + write
// fs.writeFile("awesome.pdf", quote, (err) => {
//     console.log("Completed writing awesome.html")
// })

//Task - 1

const quote2 = "Live more, worry Less🥳🥳🥳"
//Create the below files with quote2 as the content
// /backup/
// text-1.html
// text-2.html
// text-3.html
//..
// text-10.html
// for (let i = 1; i <= 10; i++) {
//     fs.writeFile(`./backup/text-${i}.html`, quote2, (err) => {
//         console.log(`Completed writing text-${i}.html`)
//     })
// }

//Task-2
//node fs.js 20 -> 20 files to be created | note-1.txt...note-20.txt

const quote3 = "Happy Day🥳"

const [, , noOfFiles] = process.argv
console.log(noOfFiles)
for (let i = 1; i <= noOfFiles; i++) {
    fs.writeFileSync(`./backup/note-${i}.txt`, quote3)
    console.log(`Completed writing note-${i}.txt`)
}



// fs.readFile("./cool123.txt", "utf-8", (err, data) => {
//     if (err) {
//         console.log("Error ❌", err)
//     }
//     console.log("The content of the file is =>", data)
// })

const niceQuote = "\nMake everyday a little less ordinarily 🙂"

// fs.appendFile("./nice.txt", niceQuote, (err) => {
//     console.log("Completed writing nice.txt")
// })

// fs.unlink("./toRemove.txt", (err) => {
//     console.log("Deleted Successfully")
// })

// fs.readdir("./backup", (err, files) => {
//     console.log("File names are =>", files)
// })

//Task - 3 => Delete all the files in backup folder

// fs.readdir("./backup", (err, file) => {
//     file.forEach(fileName => {
//         fs.unlink(`./backup/${fileName}`, (err) => {
//             console.log("Deleted Successfully", fileName)
//         })
//     })
// })

//writeFile => CallStack => WebApi(Whoever finishes writing first) => CallBack Q =>(Event Loop) => CallStack

// fs.writeFile, fs.readFile, fs.appendFile, fs.unlink - async
// fs.writeFileSync, fs.readFileSync, fs.appendFileSync, fs.unlinkSync  - sync