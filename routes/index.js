var express = require('express');
var request = require('request');
var router = express.Router();

//the request address of each city
let codeList = { data: [
    { name: 'Dease'+'Lake', code: 's0000227_e'}, 
    { name: 'Fort'+'Nelson', code: 's0000771_e'}, 
    { name: 'Terrace', code: 's0000757_e' }, 
    { name: 'Prince'+'George', code: 's0000146_e' }, 
    { name: 'Whistler', code: 's0000078_e' }, 
    { name: 'Revelstoke', code: 's0000679_e'}, 
    { name: 'Creston', code: 's0000212_e' }
]};

let listweather = {data:[]};

//Find the Data in the string file
function findinfo(str, body) {
    
    var newbody = body.slice(body.indexOf(str));
    //console.log("this is newbody"+newbody);
    var end = newbody.indexOf('\n');
    // console.log("the end point: "+end);
    // console.log("the new string :"+newbody.substring(str.length, end))
    return newbody.substring(str.length+1, end-1);
}
//Get the weather data from the Environment Canada
function sendreq() {

    //Dease Lake 14,Fort Nelson83, Terrace 80, Prince George 79, Whistler 86, Revelstoke 65, Creston 26
    for (var i = 0; i < codeList.data.length; i++) {
        //console.log(codeList[i]);
        // var url = "https://weather.gc.ca//wxlink/wxlink.html?cityCode=bc-"+codeList[i]+"&amp;lang=e";
        var url = "https://weather.gc.ca/wxlink/site_js/" + codeList.data[i].code + ".js";
        //console.log(url);
        request(url, function (error, response, body) {
            //==========================================================
            //Find the temperature,cityname,condition data in the string,
            //then store them in the json 
            //==========================================================
            var Temperature = findinfo('obTemperature = ', body).replace('"','');
            var City = findinfo('cityName = ', body).replace('"','');
            var Condition = findinfo('Condition = ',body);
            var citytemp={};
            citytemp.name=City;
            citytemp.temp=Temperature;
            citytemp.cond=Condition;
            var id;
            switch (citytemp.name) {
                case "Terrace":
                    id = 2;
                    break;
                case "Creston":
                    id = 6;
                    break;
                case "Dease Lake":
                    id = 0;
                    break;
                case "Revelstoke":
                    id = 5;
                    break;
                case "Fort Nelson":
                    id = 1;
                    break;
                case "Whistler":
                    id = 4;
                    break;
                case "Prince George":
                    id = 3;
            }
            citytemp.id=id;
            // citytemp.condition = Condition;
            if(listweather.data.length<codeList.data.length){
                listweather.data.push(citytemp);
            }
        });
    }
    // console.log(listweather);
    return listweather;

}


router.get('/', function (req, res, next) {
    var sendinfo= sendreq();
    // console.log(sendinfo);
    // console.log(typeof(String(sendinfo.data)));
    res.render('index',{message:sendinfo.data});
});

module.exports = router;