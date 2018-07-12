

var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var async = require("async");
require('es6-promise').polyfill();
require('isomorphic-fetch');


var router = express.Router();




let codeList = { data: [
    { name: 'Dease Lake', code: 's0000227_e'}, 
    { name: 'Fort Nelson', code: 's0000771_e'}, 
    { name: 'Terrace', code: 's0000757_e' }, 
    { name: 'Prince George', code: 's0000146_e' }, 
    { name: 'Whistler', code: 's0000078_e' }, 
    { name: 'Revelstoke', code: 's0000679_e'}, 
    { name: 'Creston', code: 's0000212_e' }
]};

let listweather = {data:[
 
]}

function findinfo(str, body) {
    // console.log("====================================== ");
    var newbody = body.slice(body.indexOf(str));
    //console.log("this is newbody"+newbody);
   
    var end = newbody.indexOf(';');
    // console.log("the end point: "+end);
    // console.log("the new string :"+newbody.substring(str.length, end))
    return newbody.substring(str.length+1, end-1);
}

function sendreq() {

    //Dease Labke 14,Fort Nelson83, Terrace 80, Prince George 79, Whistler 86, Revelstoke 65, Creston 26
    for (var i = 0; i < codeList.data.length; i++) {
        //console.log(codeList[i]);
        // var url = "https://weather.gc.ca//wxlink/wxlink.html?cityCode=bc-"+codeList[i]+"&amp;lang=e";
        var url = "https://weather.gc.ca/wxlink/site_js/" + codeList.data[i].code + ".js";
        //console.log(url);
        request(url, function (error, response, body) {
            //console.log(i + "xxxxxxxxxxxxxxxx");


            //  var search='obTemperature =';
            //  var newbody = body.slice(body.indexOf(search));
            //  var end = newbody.indexOf(";");
            //  var Temperature = newbody.substring(search.length+2,end-1);
            //  console.log(Temperature);
            var Temperature = findinfo('obTemperature = ', body);
            var City = findinfo('cityName = ', body);
            //var Condition = findinfo('obCondition = ',body);
           // console.log("THIS IS " + Temperature + " " + City);
            var citytemp={};
            citytemp.name=City;
            citytemp.temp=Temperature;
            // citytemp.condition = Condition;
            if(listweather.data.length<codeList.data.length){
                listweather.data.push(citytemp);
            }
        });
    }
    //console.log(listweather);
    return listweather;

}


router.get('/', function (req, res, next) {
    var sendinfo= sendreq();
    console.log(sendinfo);
    console.log(typeof(String(sendinfo.data)));
    res.render('index',{message:sendinfo.data});
});

module.exports = router;