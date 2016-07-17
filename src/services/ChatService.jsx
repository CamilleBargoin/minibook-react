var config = require('../../config.js');


var ChatService = {

    openChat: function(userId, callback) {


        var payload = {
            target: userId,
            sessionId: localStorage.getItem("sessionId")
        };

        this.sendHTTPRequest(config[process.env.NODE_ENV].api + '/discussions/open', 'POST', JSON.stringify(payload), callback);
    },

    get: function(discussionId, callback) {

        var payload = {
            discussionId: discussionId,
            sessionId: localStorage.getItem("sessionId")
        };

        this.sendHTTPRequest(config[process.env.NODE_ENV].api + '/discussions/get', 'POST', JSON.stringify(payload), callback);

    },

    create: function(discussionId, newMessage, callback) {

        var payload = {
            discussionId: discussionId,
            message: newMessage,
            sessionId: localStorage.getItem("sessionId")
        };

        this.sendHTTPRequest(config[process.env.NODE_ENV].api + '/discussions/newMessage', 'POST', JSON.stringify(payload), callback);

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
    }
};


module.exports = ChatService;