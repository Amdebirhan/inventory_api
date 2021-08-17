const notificationModel = require("../model/notification.model");
//create a db to save notifications
//contain user_id  module name(table name) , reason and id of that data we want to give notification
//get a collection name model.collection.collectionName
exports.getNotifications = function(data, callback) {
    notificationModel.findById(data).then((result)=>{
        res.status(204).send({});
    }); 
};

exports.createNotification = function(data) {
    var notificationData = data;
    var x = 0;
    for(var i=0; i< notificationData.length; i++) {
        // Code
        Notification(notificationData[i]).save(function(err,response){
            if (err)
                return false;
        });    
        if (x === notificationData.length - 1) {
            return true;
        }
        x++;
    }
};