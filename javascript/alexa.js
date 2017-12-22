
'use strict';

var firebase = require("firebase");
const request = require('request');
var price;

var config = {
    apiKey: "AIzaSyAP5CCCilffpX4Ovga205pE4Ors6b1jDyk",
    authDomain: "crypto3-424b9.firebaseapp.com",
    databaseURL: "https://crypto3-424b9.firebaseio.com",
    projectId: "crypto3-424b9",
    storageBucket: "crypto3-424b9.appspot.com",
    messagingSenderId: "1015211263452"

    };

    // if(firebase.apps.length == 0) {   // <---Important!!! In lambda, it will cause double initialization.
firebase.initializeApp(config);
var database = firebase.database();

exports.handler = function (event, context, callback) {

      
            try { 
               
                if (event.session.new) {
                    onSessionStarted({requestId: event.request.requestId}, event.session);
                }

                if (event.request.type === "LaunchRequest") {
                    onLaunch(event.request,
                        event.session,
                        function callback(sessionAttributes, speechletResponse) {
                            context.succeed(buildResponse(sessionAttributes, speechletResponse));
                        });
                } else if (event.request.type === "IntentRequest") {
                    onIntent(event.request,
                        event.session,
                        function callback(sessionAttributes, speechletResponse) {
                            context.succeed(buildResponse(sessionAttributes, speechletResponse));
                        });
                } else if (event.request.type === "SessionEndedRequest") {
                    onSessionEnded(event.request, event.session);
                    context.succeed();
                }
            } 
            catch (e) {
                context.fail("Exception: " + e);
            }                 // important that you don't call succeed until you are called back otherwise nothing will be saved to the database!

        


/** Called when the session starts */
function onSessionStarted(sessionStartedRequest, session) {
  
  
    // add any session init logic here
}

/** Called when the user invokes the skill without specifying what they want. */
function onLaunch(launchRequest, session, callback) {
}

/** Called when the user specifies an intent for this skill. */
function onIntent(intentRequest, session, callback) {

    var intent = intentRequest.intent
    var intentName = intentRequest.intent.name;

    // dispatch custom intents to handlers here
}

/** Called when the user ends the session - is not called when the skill returns shouldEndSession=true. */
function onSessionEnded(sessionEndedRequest, session) {

}

// ------- Helper functions to build responses for Alexa -------
function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}

function onLaunch(launchRequest, session, callback) {
    var speechOutput = "Welcome to Crypto 3! Where you can buy and sell crypto 3 currency."
    var reprompt = "Would you like to buy or sell Crypto 3?"
    var header = "Crypto 3!"
    var shouldEndSession = false
    var sessionAttributes = {
        "speechOutput" : speechOutput,
        "repromptText" : reprompt
    }
    callback(sessionAttributes, buildSpeechletResponse(header, speechOutput, reprompt, shouldEndSession))
    
}

function onIntent(intentRequest, session, callback) {
    var intent = intentRequest.intent
    var intentName = intentRequest.intent.name;

    // dispatch custom intents to handlers here
    if (intentName == "buyCryptoThree") {
        handleBuyCryptoThree(intent, session, callback)
    } else if (intentName == "sellCryptoThree") {
        handleSellCryptoThree(intent, session, callback)
    } else if (intentName == "AMAZON.HelpIntent") {
        handleHelpRequest(intent, session, callback)
    } else if (intentName == "AMAZON.StopIntent" || intentName == "AMAZON.CancelIntent") {
        handleFinishSessionRequest(intent, session, callback)
    } else {
        throw "Invalid intent"
    }
    
}


function handleBuyCryptoThree(intent, session, callback) {

    const options = {  
        url: 'https://api.coinmarketcap.com/v1/ticker/bitcoin/',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            'User-Agent': 'my-reddit-client'
        }
    }

    request(options, function(err, res, body) {  
        let json = JSON.parse(body);
        price = json[0].price_usd;
        console.log(price);

        var count = intent.slots.count.value;

        database.ref().set({
            buy : count,
            price : price,
        });
    });
}

function handleSellCryptoThree(intent, session, callback) {

    const options = {  
        url: 'https://api.coinmarketcap.com/v1/ticker/bitcoin/',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            'User-Agent': 'my-reddit-client'
        }
    }

    request(options, function(err, res, body) {  
        let json = JSON.parse(body);
        price = json[0].price_usd;
        console.log(price);

        var count = intent.slots.count.value;
    
        database.ref().set({
            sell : count,
            price : price,
        });
       
    });

}

function handleGetHelpRequest(intent, session, callback) {
    // Ensure that session.attributes has been initialized
    if (!session.attributes) {
        session.attributes = {};
    }
    var speechOutput = "Help yourself fool!"
    var repromptText = speechOutput
    var shouldEndSession = false
    callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession))
}

function handleFinishSessionRequest(intent, session, callback) {
    // End the session with a "Good bye!"
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Good bye! You are officially broke!", "", true));
}

};
