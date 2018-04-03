var fs = require('fs');
var readline = require('linebyline');

var txt = readline('cate3.txt');
// var txt2 = fs.createWriteStream('cate4.txt');


// var obj = {};
// obj.maintitle = c1
// obj.subTitle = c2
// obj.list = c3;

var caArray = [1,58,121,226,314,388,412,521,621,669,745,955,1031,1114,1170,1211,1236,1324,1370,1441,1575,1635]

var total = [];
txt.on('line', function(line,lineCOunt, btyeCount){
    if(line.indexOf('-') === 0){
        if(line.indexOf('/') < 0){
            var one = line.slice(1, -1);
            line = one
            console.log('asdfadsf',line)
            total.push(line);
        }
        
    }
    // else if(line.indexOf('-') === 0){
    //     // console.log(' %s ', line);
    // }
    // else{
    //     // console.log('{ %s }', line);
    // }
})


txt.on('close', function(){
    var file = fs.createWriteStream('./cate4.txt');
    total.map(function(v){
        console.log(v)
        // var json = JSON.stringify(v)
        file.write(v+'\n')
    })
})
