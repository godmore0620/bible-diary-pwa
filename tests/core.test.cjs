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
test('pinch scaling grows and shrinks text within supported limits', () => {
 assert.equal(core.pinchFontSize(100,100,150),150);
 assert.equal(core.pinchFontSize(150,100,50),75);
 assert.equal(core.pinchFontSize(100,100,500),250);
 assert.equal(core.pinchFontSize(100,100,10),30);
 assert.equal(core.pinchFontSize(100,0,100),100);
});
