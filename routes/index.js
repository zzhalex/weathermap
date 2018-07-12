
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();


let listweather = [];

function sendreq(){
    // var aa=[11,12,13,14];
    let weathers = [];
    let urls=["https://weather.gc.ca/city/pages/bc-14_metric_e.html","https://weather.gc.ca/city/pages/bc-14_metric_e.html","https://weather.gc.ca/city/pages/bc-14_metric_e.html","https://weather.gc.ca/city/pages/bc-14_metric_e.html"];
    // for(i=0;i<aa.length;i++){
    //     var url="https://weather.gc.ca/city/pages/bc-14_metric_e.html"
    //     console.log(url);
    //     urls[i]=url;
    //   }
    // console.log(urls);
    var i=0;
    while(i<4){
      console.log(i);
      request(urls[i],function(error,response,body){
        // console.log(aa[0]+"]]]]]]]]");
        // console.log("https://weather.gc.ca/city/pages/bc-"+String(aa[i])+"_metric_e.html");
        console.log("================"+i);
        var $ = cheerio.load(body);
        console.log("+++++++"+body);
         
     //    var temp =  $('main #container #mainContent section details div div div p span').data();
     //    console.log(Object.values(temp));
        
        $('main #container #mainContent section details div div div p span').each(function(i, e) {
             weathers.push($(this).text());
         });
         console.log(i+" "+weathers[0]);
         listweather[i]=weathers[0];
       
    });

  console.log(listweather);
  return listweather;
  i++;
    }
      
}
router.get('/', function(req, res, next) {
    
    res.render('index',{message:sendreq()});
});

module.exports = router;
 