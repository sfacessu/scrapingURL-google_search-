var readline = require('linebyline');
var fs = require('fs');

module.exports = function(file,cb){
    // console.log('접속')
    var txt = readline('./result/'+ String(file));
    // console.log('접속2 : ', './result/'+ String(file))
    var total = [];
    
    txt.on('line', function(line, linecount, btyecount ){
        // console.log(line, linecount)
        if(line.indexOf('google') < 0){
            if(line.indexOf('http') === 0){
                // console.log(line)
                total.push(line);
            }
            else if(line.indexOf('/url?q=') ===  0 ){
                var line2 = line.slice(7, -1)
                if(line2.indexOf('http') === 0){
                    if(line2.indexOf('wiki') < 0){
                        // console.log('fuck', line2)
                        total.push(line2)
                    }
                }
            }
        }
    })
    
    txt.on('error' , function(err){
        console.log('err : ', err);
        return cb(err)
        

    })

    txt.on('close', function(){
        // # html, result 파일을 모두 지워준다.
        var saveData = fs.createWriteStream('./url/'+file+".txt");
        // console.log('./url/'+file+'.txt')
        total.map(function(v){
            // console.log('v : ',v)
            saveData.write(v+'\n');
        })

        return cb(null, 1)
    })
}


