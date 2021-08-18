const userModel = require('../../inventory/users/models/users.model');
const url = require("url");
const { Console } = require('console');

exports.getPrivilages = async (req, res,next) => {
    const fullurl = fullUrl(req);
    const urlObject = url.parse(fullurl, true);
    const path=urlObject.path;
    var allow = false;
    //const userSchema =  req.decoded;
    const userSchema = await userModel.findOne({
        "_id":req.decoded.id,
        "privilages.path": path
    });
    if(!userSchema){
        res.status(404).send({ error: 'page not found' });
    }else{
        for (var i = 0; i <= userSchema.privilages.length; i++) {
            if (userSchema.privilages[i].path === path) {
                privilage = userSchema.privilages[i];
                flag=true;
                break;
            }
        }
        if (privilage.right.deny) {
            res.status(403).send({ error: 'access denied' });
        } else {
            if (req.method == "POST" && privilage.right.create) {
                allow = true;
            } else if (req.method == "GET" && privilage.right.read) {
                allow = true;
            } else if (req.method == "PUT" && privilage.right.update) {
                allow = true;
            } else if (req.method == "DELETE" && privilage.right.delete) {
                allow = true;
            }
        }
    }

    if (allow) {
        next();
    }
    
   
    
    
    //handle your reject and catch here

};


function fullUrl(req) {
    return url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: req.originalUrl
    });
}

