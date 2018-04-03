var fs = require('fs');
var readline = require('linebyline');


module.exports = (filename, cb) => {
    //url 디렉토리에 txt 파일 불러오기
    // console.log(filename)
    var txt = readline(filename+'.txt');
    
    var total = [];

    txt.on('line', function(line, linecount, btyecount){
        var check = regUrlType(line);
        if(check){
            //.을 기준으로 다음 / 가 있을 경우 짜른다.
            var line_index = line.indexOf('.')
            var line_slash = line.slice(line_index, -1)
            var line_slash_index = line_slash.indexOf('/');

            // console.log(line.slice(0, line_index + line_slash_index));
            var line_total = line.slice(0, line_index + line_slash_index)
            // console.log(line_total)
            
            total.push(line_total)
            // console.log('total : ',total)
        }  
    })
    txt.on('error', function(err){
        console.log(err);
        return cb(err)
    })
    txt.on('close', function(){
        var file = fs.createWriteStream(filename+'2.txt', {encoding : 'utf8'});
        total.map(function(v){
            file.write(v+'\n');
        })

        return cb(null,1)
    })

    // 패턴이 url 기반이 맞는지 확인한다.
    function regUrlType(data) {
        var regex = /^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?/;
        return regex.test(data);
    }


    function regUrlType2(data) {
        var regex = /^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?/;
        return data.search(regex);
    }
}
