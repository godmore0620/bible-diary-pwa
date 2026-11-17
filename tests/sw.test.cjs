const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
function worker(network, cached) {
 const handlers = {};
 const context = {location:{origin:'https://example.com'}, self:{location:{origin:'https://example.com'}, addEventListener:(n,f)=>{handlers[n]=f}}, URL, fetch:network, caches:{match:async()=>cached}};
 vm.runInNewContext(fs.readFileSync('sw.js','utf8'),context);
 return async()=>{let result;handlers.fetch({request:{method:'GET',url:'https://example.com/app.js',mode:'cors'},respondWith:p=>{result=p}});return await result};
}
test('app code checks the network for updates', async()=>{
 const fresh={ok:true,text:'new'}, stale={ok:true,text:'old'};
 assert.equal((await worker(async()=>fresh,stale)()).text,'new');
});
test('app code remains available offline', async()=>{
 const stale={ok:true,text:'offline'};
 assert.equal((await worker(async()=>{throw Error('offline')},stale)()).text,'offline');
});

