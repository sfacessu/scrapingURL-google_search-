
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
// var html = fs.readFileSync('./cate.txt')
var file = fs.createWriteStream('cate2.txt')


var readline = require('linebyline');


var txt = readline('./cate.txt');
var total = [];
txt.on('line', function(line, linecount, btyecount){
    // console.log(' start !  ');
    if(line.length === 0){
        console.log('공백 찾기',  line+'\n')
    }
    else{
        // // console.log(line)
        // if(line.indexOf('div') > 0){
        //     var zero = 'fuck'
        //     console.log(line);
        //     var line = zero;
        //     total.push(line)
        // }
        // if(line.indexOf('timg') > 0){
        //     var one = line.indexOf(';')
        //     var two = line.slice(one+3, -1);
        //     // console.log(two)
        //     total.push(two)
            
        // }
        // // if(line === ' '){
        // //     var fucking = ''
        // //     line = fucking
        // //     total.push(line)
        // // }
        // else{
        //     total.push(line)
        // }
        if (line.indexOf(')') > -1){
            // console.log('fuck line : ', line)
            var one = line.indexOf(')');
            
            console.log(line.slice(one+1,-1));
            var two = line.slice(one+1,-1)
            line = two;
            total.push(line)
        }
        else{
            total.push(line)
        }
        
    }
})

txt.on('close', function(){
    total.map(function(v){
        file.write(v+'\n')
    })
})
    