var cheerio = require('cheerio');
var fs = require('fs')
var request = require('request');
var sleep = require('sleep');
var Sort = require('./sort');
var Theorem = require('./theorem');
var Reduce = require('./reduce');


// 10씩 증가시켜 50까지만 뽑아보자

// var htmlFile= fs.createWriteStream('0610_html.html')
// var req = request("https://www.google.co.kr/search?q=보안&start=20").pipe(htmlFile);

//lr=lang_ko
// if(!process.argv[2]){
//     console.log('Insert arguement.. Please retry searching..')
//     process.exit();
// }
var url1 = "https://www.google.com/search?q="
var url2 = process.argv[2]
var url3 = '&lr=lang_ko&start=';
// var url3 = ''
var url4 = 0;
// console.log(url2)

var i = 0;
var setting = {
    flags : 'a',
    encoding: 'utf8'
}

//10페이지까지만 뽑는다.10페이지까지 모든 html 소스를 url2.html 파일에 집어넣는다.
console.log('--------------------------------------------------')
while(i < 10){
    console.log('----[WebScraping] Page : ', url1+url2+url3+url4);
    var filename = './html/'+String(url2)+'.html';
    // console.log('1 : ', filename);
    var html = fs.createWriteStream(filename,{flags : 'a', encoding: 'utf8'});
    // console.log('2 : ', html);
    //현재는 proxy 로 설정되어 있으나, 바꿀 수 있음. 37-38 주석 처리 후 라인36 주석 풀고 실행
    var req = request(url1+url2+url3+url4).pipe(html)
    // var re = request.defaults({'proxy' : 'http://121.129.127.209'})
    // var req = re(url1+url2+url3+url4).pipe(html)
    // ------- sleep 에 타임 값을 지정해주세요 ------- //
    sleep.sleep(5)
    // ------- ------------------------- ------- //
    i++
    url4+=10;
    // if(i === 3){
        
    //     req.emit('finish', function(one,two){
    //         console.log(one || two)

    //     })
    //     console.log('fuck')
    //     cb(null,'success')
    //     break;
    // }
}

req.on('finish', function(){
    console.log('----[WebScraping ]__1__ Request ---> Succes');
    fs.readFile('./html/'+url2+'.html', function(err,html){
        if (err) return console.log(err);
        console.log('----[WebScraping ]__2__ FileSave ---> Succes');
        //추출
        Cio(url2, html,function(result){
            if(result > 0){
                console.log('----[WebScraping ]__3__ Cheerio  ---> Succes');
                // http 검증
                Sort(url2+'.html', function(err,sortRlt){
                    if(err) throw err;
                    console.log('----[WebScraping ]__4__ Sorting ---> Succes');
                    // http 파라미터 제거
                    Theorem('./url/'+url2+'.html', function(err,theoreamRlt){
                        if(err) throw err;
                        console.log('----[WebScraping ]__5__ Theorem ---> Succes');
                        // http 중복제거
                        Reduce(url2, function(err,reduceRlt){
                            if(err) throw err;
                            console.log('----[WebScraping ]__6__ Reduce ---> Succes!!!');
                            trashDelete(url2,function(){
                                console.log('----[WebScraping ]__7__ Delete ---> Succes!!!');
                            })
                            console.log('--------------------------------------------------')
                        })
                    })
                });
            }
            else{
                console.log('Cio error ----------------STOP--------------------------')
            }
        });
    });
});


// fs.readFile('./html/'+url2+'.html', function(err,html){
//     if (err) return console.log(err);
//     console.log('-----------------얍삐 얍삐------------------')
//     console.log('[WebScraping ]__1__ FileSave ---> Succes');
//     //추출
//     Cio(url2, html,function(result){
//         if(result > 0){
//             console.log('[WebScraping ]__2__ Cheerio  ---> Succes');
//             // http 검증
//             Sort(url2+'.html', function(){
//                 console.log('[WebScraping ]__3__ Sorting ---> Succes');
//                 // http 파라미터 제거
//                 Theorem('./url/'+url2+'.html', function(){
//                     console.log('[WebScraping ]__4__ Theorem ---> Succes');
//                     // http 중복제거
//                     Reduce(url2, function(){
//                         console.log('[WebScraping ]__4__ Reduce ---> Succes!!!');
//                         console.log('-----------------__ __------------------')
//                         trashDelete(url2,function(){
//                             console.log('----[WebScraping ]__7__ Delete ---> Succes!!!');
//                         })
//                         console.log('--------------------------------------------------')
//                     })
//                 })
//             });
//         }
//         else{
//             console.log('STOP')
//         }
        
//     });
// });


function Cio(name, html,cb){
    var fuck = fs.createWriteStream('./result/'+ name + '.html', {encoding : 'utf8'});
    var a = []
    $ = cheerio.load(html);

    var links = $("a");
    links.each(function(i,link){
        a[i] = $(link).attr('href');
    })
    // console.log('배열 값 : ',a.length);
    
    a.map(function(v){
        // console.log(v)
        fuck.write(v+'\n');
    })
    // console.log('잉?')
    cb(a.length)
};





function trashDelete(filename,cb){
    beforeDelete('./html/'+filename+'.html')
    beforeDelete('./result/'+filename+'.html');
    // beforeDelete('./url/'+filename+'.html.txt');
    // beforeDelete('./url/'+filename+'.html'+'2.txt');
    return cb()
}
function beforeDelete(filename){
    fs.unlink(filename, function(err){
        if(err) return console.log(err);
        // console.log(filename + ' 이 제대로 삭제되었습니다.');
    })
    return 0;
}
