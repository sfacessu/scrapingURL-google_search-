var fs = require('fs');
// var start = require('./start');
var sleep = require('sleep');
var readline = require('linebyline');
var shell = require('shelljs')

// 하위 카테고리들을 모두 읽어들여 일단 사이트를 크롤링해야겠다.
var txt = readline('./cate5.txt');
var total = [];
txt.on('line', function(line){
    // var one = line.slice(1, -1);
    // line = one;
    total.push(line);
})

txt.on('close', function(){
    // 메모리로 다 옮겼으니 한개씩 순차적으로 실행시키겟따눙 적정한 시간대는 5초 10개 50초 1개 검색어당 1분을 잡아 실행시킨다.
    total.map(function(i,v){
        console.log('Total : [%d], Now : [%d]',total.length,v);
        // shell.echo('fucking')
        shell.exec('node start.js ' +i)
        
        sleep.sleep(30)
    })
        // sleep.sleep(60);
})
