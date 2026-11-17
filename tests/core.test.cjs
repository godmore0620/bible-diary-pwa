const test = require('node:test');
const assert = require('node:assert/strict');
const core = require('../core.js');
test('chapter navigation crosses book boundaries', () => {
 const books = [{chapters:[['a'],['b']]},{chapters:[['c']]}];
 assert.deepEqual(core.moveChapter(books,0,2,1), [1,1]);
 assert.deepEqual(core.moveChapter(books,1,1,-1), [0,2]);
});
test('search returns matching verse references', () => {
 const books = [{name:'創世紀',chapters:[['起初神創造天地','其他']]}];
 assert.deepEqual(core.searchBible(books,'創造'), [{book:0,chapter:1,verse:1,text:'起初神創造天地'}]);
});
test('reading plan starts with January 1 for a custom start date', () => {
 assert.deepEqual(core.planDate('2026-11-17','2026-11-17'), {month:1,day:1,progress:1});
 assert.deepEqual(core.planDate('2026-11-19','2026-11-17'), {month:1,day:3,progress:3});
});
test('book selection filters by testament and name', () => {
 const books = [{name:'創世紀',testament:0},{name:'出埃及記',testament:0},{name:'馬太福音',testament:1}];
 assert.deepEqual(core.filterBooks(books, 0, '創'), [{book:books[0],index:0}]);
 assert.deepEqual(core.filterBooks(books, 1, ''), [{book:books[2],index:2}]);
});
