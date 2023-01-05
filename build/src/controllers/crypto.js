"use strict";
const c = require('crypto');
const password = 'password';
const hash = c.createHash('sha256').update(password).digest('hex');
console.log(hash); //
//# sourceMappingURL=crypto.js.map