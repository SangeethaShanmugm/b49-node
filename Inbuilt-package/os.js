const os = require("os")

console.log("Free Memory", os.freemem() / 1024 / 1024 / 1024)
console.log("Total Memory", os.totalmem() / 1024 / 1024 / 1024)

//1 kb => 1024 bytes=> 1mb => 1024 kb => 1gb => 1024 mb

console.log("Version", os.version())
console.log("Processor", os.cpus())

console.log("User Info", os.userInfo());
console.log("Platform", os.platform());
console.log("version", os.version());
console.log(`Processor, ${os.cpus().length} Core`);
console.log("uptime", os.uptime());
console.log("arch", os.arch());