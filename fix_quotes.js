const fs = require('fs');
const path = 'backend/prisma/data/level4/level4_challenge.ts';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(/^(\s*)"([a-zA-Z0-9_]+)":/gm, '$1$2:');
fs.writeFileSync(path, content);
console.log("Success!");
