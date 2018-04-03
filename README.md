# scrapingURL-google_search-
[testing] scarping URL in google search

[구글 검색엔진을 이용한 URL 수집 크롤링]
ㅇ 구글 검색(검색어 + 옵션:한글)을 주어 검색된 웹사이트 도메인 부분만 추출하여 URL 리스트를 수집하고자 함.
ㅇ ryutakoo.js 파일의 경우 cate5.txt 목록에 있는 단어를 순차적으로 검색하도록 node shell 을 이용함
ㅇ start.js 파일의 경우 argument 값을 하나 받아 100개의 검색된 페이지를 돌아 url 을 수집
ㅇ ryutakoo.js 에서 start.js 를 shell 로 실행시킴

구글 검색기를 이용하여 url을 수집할 수 있지만, sleep을 이용하여도 구글에 걸리기 마련

주의 : 이 스크립트는 절대적으로 테스트 용도에만 사용하여야 함.

실행법    ->  node start.js [arv]
        -> node ryutakoo.js  (* cate5.txt 파일에 넣고 싶은 단어를 집어넣어 실행하면 순차 실행이 가능) 1개 검색어당 총 80초로 슬립을 걸어놓은 상태
        
결과데이터 : 디렉토리 data 에 .txt 파일로 저장됨

사용한 모듈 : [linebyline, request, cheerio, fs]

만든이 :  ryutakoo
