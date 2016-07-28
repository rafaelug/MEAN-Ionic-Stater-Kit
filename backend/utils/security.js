var uuid = require('node-uuid');
var validator = require('validator');
var arrStatus = ["Pending","Confirm","Pay", "On Process", "Closed", "Paid", "Cancelled", "Confirming", "On track","Paid","On Dispute", "Delivered", "Open","Expired","unlock","refund","Cancel"];

var arrCurr = ["BTC","USD", "EUR"];

module.exports = function(){
    return {
        inputCheck: checkInput,
        clearComment : clearComment,
        clearCode: clearCode
    };
       

}

function checkInput(input, kind){

    var checked = true;
    
    if(validator.isNull(input)){
            checked = false;
    }
    if(!validator.isByteLength(input,{min: 0, max: 1000000})){
            checked = false;
    }
    
    
    switch(kind) {
            
    case "Alpha":
        if(!validator.isAlpha(input)){
            checked = false;
        }
            
        break;
            
    case "Interger":
        if(!validator.isInt(input,{min: 0, max: 1000000000000})){
            checked = false;
        }
            
        break;
            
    case "Email":
        if(!validator.isEmail(input)){
            checked = false;
        }
            
        break;
            
    case "Float":
        if(!validator.isFloat(input)){
            checked = false;
        }
            
        break;
            
    case "Id":
        if(!validator.isMongoId(input)){
            checked = false;
        }
            
        break;
            
    case "Url":
        if(!validator.isURL(input)){
            checked = false;
        }
            
        break;
            
    case "Date":
        if(!validator.isDate(input)){
            checked = false;
        }
            
        break;
            
    case "Alphanumeric":
        if(!validator.isAlphanumeric(input)){
            checked = false;
        }
            
        break;
    case "Uuid":
        if(!validator.isUUID(input)){
            checked = false;
        }
            
        break;
    case "Status":
               
        if(arrStatus.indexOf(input) == -1){
            checked = false;
        }
            
        break;
    case "Country":
               
        var obj = JSON.parse(fs.readFileSync('./public/resources/countries.json', 'utf8'));
        var countries = obj.map(function(item){
            return item.name;
        
        });
        
        if(countries.indexOf(input) == -1){
            checked = false;
        }
            
        break;
            
    case "Currency":
               
        if(arrCurr.indexOf(input) == -1){
            checked = false;
        }
            
        break;
    case "Name":
               
        if(!validator.isWhitelisted(input, "aàáâäæãåābcçćčdeèéêëēėęfghiîïíīįìjklłmnñńoôöòóœøōõpqrsßśštuûüùúūvwxyÿzžźżAÀÁÂÄÆÃÅĀBCÇĆČDEÈÉÊËĒĖĘFGHIÎÏÍĪĮÌJKLŁMNÑŃOÔÖÒÓŒØŌÕPQRSŚŠTUÛÜÙÚŪVWXYŸZŽŹŻ1234567890 +_)(*&^%$#@!~`-=|}{:?><\\][';/.\",")){
            checked = false;
        }
            
        break;
                        
    
    }
        
    return checked;  
}


function clearComment(text){
    return validator.stripLow(text, true);

}

function clearCode(text){
    return validator.escape(text);

}
