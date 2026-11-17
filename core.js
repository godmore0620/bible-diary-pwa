(function(root){
 function moveChapter(books,b,c,d){c+=d;if(c<1){if(b===0)return [0,1];b--;c=books[b].chapters.length}else if(c>books[b].chapters.length){if(b===books.length-1)return [b,books[b].chapters.length];b++;c=1}return [b,c]}
 function searchBible(books,q){q=q.trim().toLowerCase();if(!q)return [];const result=[];books.forEach((book,b)=>book.chapters.forEach((chapter,c)=>chapter.forEach((text,v)=>{if(text.toLowerCase().includes(q))result.push({book:b,chapter:c+1,verse:v+1,text})})));return result}
 function planDate(date,start){const day=s=>Date.parse(s+'T00:00:00Z');let n=Math.max(0,Math.floor((day(date)-day(start))/86400000))%365;let d=new Date(Date.UTC(2025,0,1+n));return {month:d.getUTCMonth()+1,day:d.getUTCDate(),progress:n+1}}
 const api={moveChapter,searchBible,planDate};if(typeof module!=='undefined')module.exports=api;root.BibleCore=api;
})(typeof globalThis!=='undefined'?globalThis:this);
