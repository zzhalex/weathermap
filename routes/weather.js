
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var async = require("async");

var router = express.Router();


let listweather = [];
let aa=[{name:'Dease Lake',code:'s0000227_e',temp:""},{name:'Fort Nelson',code:'s0000771_e',temp:""},{name:'Terrace',code:'s0000757_e',temp:""},{name:'Prince George', code:'s0000146_e',temp:""},{name: 'Whistler', code:'s0000078_e',temp:""},{name:'Revelstoke',code:'s0000679_e',temp:""},{name:'Creston',code:'s0000212_e',temp:""}];
 
// function sendreq(){
    
//     //Dease Labke 14,Fort Nelson83, Terrace 80, Prince George 79, Whistler 86, Revelstoke 65, Creston 26
//     for(var i = 0;i<aa.length;i++){
//         console.log(aa[i]);
//         // var url = "https://weather.gc.ca//wxlink/wxlink.html?cityCode=bc-"+aa[i]+"&amp;lang=e";
//         var url = "https://weather.gc.ca/wxlink/site_js/"+aa[i].code+".js";
//         console.log(url);
//         request(url,function(error,response,body){
//             console.log(i+"xxxxxxxxxxxxxxxx");
           
  
//              var search='obTemperature =';
//              var newbody = body.slice(body.indexOf(search));
//              var end = newbody.indexOf(";");
//              var Temperature = newbody.substring(search.length+2,end-1);
//              console.log(Temperature);

//              listweather.push(Temperature);
           
//         });
//     }
//     console.log(listweather);
//     return listweather;

// }

function sendreq(){
    let urls = [];
    for(var i = 0;i<aa.length;i++){
         var url = "https://weather.gc.ca/wxlink/site_js/"+aa[i].code+".js";
         urls.push(url);
    }
    async.mapLimit(urls, 7, async function(url) {
        const response = await fetch(url)
        return response.body
    }, (err, results) => {
        if (err) throw err
        // results is now an array of the response bodies
        console.log(results)
    })
}

router.get('/', function(req, res, next) {
    
    res.send(sendreq());
});

module.exports = router;