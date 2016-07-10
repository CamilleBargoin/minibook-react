
// var $ = require('jquery');
var config = require('../../config.js');


var MessageService = {

    

    getInbox(callback) {

      const payload = {
          sessionId: localStorage.getItem("sessionId")
      };

      this.sendHTTPRequest(config[process.env.NODE_ENV].api + '/messages/inbox', "GET", payload, callback);

    },

    sendMessage(newMessage, target, callback) {

      var payload = {
            message: newMessage,
            sessionId: localStorage.getItem("sessionId"),
            target: target
        };

        this.sendHTTPRequest(config[process.env.NODE_ENV].api + '/messages/new', "POST", JSON.stringify(payload), callback);
    },



    sendHTTPRequest: function(url, method, payload, callback) {

        $.ajax({
            type: method,
            url: url,
            data: payload,
            dataType: 'json',
            contentType: "application/json",
            success: function(data, status, jqXHR) {

              if (data) {

                if (data.error) {
                    Materialize.toast(data.error, 3000, 'toastError');
                }
                else {
                    if (callback)
                        callback(data);
                }
              }
              else {
                Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
              }
            },
            error: function(jqXHR, status, error) {
              Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
            }
        }); 
    },

};




module.exports = MessageService;