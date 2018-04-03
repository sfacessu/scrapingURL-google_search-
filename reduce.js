var fs = require('fs');
var readline = require('linebyline');

module.exports = (filename, cb) => {
    var txt = readline('./url/'+filename+'.html'+'2.txt');
    // data 디렉토리로 최종 출력물 저장
    var file = fs.createWriteStream('./data/' + filename +'.txt', {encoding : 'utf8'});

    var array = [];
    txt.on('line', function(line, lineCount, btyeCount){
        // 배열로 만든 다음 -> 배열에서 reduce 실행
        array.push(line);
    })
    txt.on('error',function(err){
        console.log(err);
        return cb(err);
    })
    txt.on('close', function(){
        // var ar = [];
        var uniq = array.reduce(function(a,b){
            // console.log('A : ' + a +'B :'+b)
            if(a.indexOf(b) < 0){
                a.push(b);
            }
            return a
        }, []);
        // console.log(uniq)

        uniq.map(function(v){
            file.write(v+'\n');
        })
        cb(null, 1)
    })
}
