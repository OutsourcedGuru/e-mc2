#!/usr/bin/env node
var klyng = require('klyng');
 
function main() {
    console.log("Hello, I'm process %d-%d", klyng.rank(), klyng.size());
    klyng.end();
}
 
klyng.init(main);
