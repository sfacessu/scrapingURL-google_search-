var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');


var text = '동물병원';
var url = 'https://translate.google.co.kr/?hl=ko#ko/en/'
var target = fs.createWriteStream('./t.txt');
var req = request(url+text).pipe(target);

req.on('finish', function(){
    console.log('접근');
    
    var $ = cheerio.load(target);
    var a = [];
    var links = $('#result_box').text()
    // links.each(function(i,link){
    //     a[i] = $(link).attr('class');
    // })
    // console.log(a)
    console.log(links)
})


// <ul id="fruits">
//   <li class="apple">Apple</li>
//   <li class="orange">Orange</li>
//   <li class="pear">Pear</li>
// </ul>

// $('.apple', '#fruits').text()
// //=> Apple

// $('ul .pear').attr('class')
// //=> pear
