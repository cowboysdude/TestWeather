/* Magic Mirror
 * Module: MMM-NOAA
 * By cowboysdude and tbbear 
        modified by barnosch
 */
var c = 0;
var l = 1;
var loco = "";
"use strict";

Module.register("MMM-NOAA", {

    // Module config defaults.
    defaults: {
        updateInterval: 70 * 60 * 1000, // every 10 minutes
        animationSpeed: 0,
        initialLoadDelay: 8000
    },

    getStyles: function() {
        return ["MMM-NOAA.css", "weather-icons.css"];
    },
    getScripts: function() {
        return ["moment.js"];
    },

    // Define start sequence.
    start: function() {
        Log.info("Starting module: " + this.name);
        this.weather = {};
		this.scheduleUpdate();
    },  

    processSRSS: function(data) {
        this.srss = data.results;
    },

    processAIR: function(data) {
        this.air = data.data.current.pollution;
    },  

    scheduleUpdate: function() {
        setInterval(() => {
            this.getNOAA();
        }, this.config.updateInterval);
        this.getNOAA(this.config.initialLoadDelay);
    },

    getNOAA: function() {
        this.sendSocketNotification("GET_NOAA");
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "NOAA_RESULT") {
            this.processNoaa(payload);
console.log("this is the payload");
console.log(payload);
        }
        this.updateDom;
    }, 
	
	  processNoaa: function(data) { 
        this.weather = data.currently;
        this.forecast = data.forecast;
		console.log("This is the data being processed");
		console.log(this.weather);
		//console.log(this.forecast);
    },

    getDom: function() {
        
        var wrapper = document.createElement("div");

var current = this.weather;
console.log("this is the dom");
console.log(current);
        
        var curCon = document.createElement("div");
        curCon.classList.add("small", "bright", "img");
        curCon.setAttribute('style', 'line-height: 105%;');
        curCon.innerHTML = current.weather;
        wrapper.appendChild(curCon);

        var cur = document.createElement("div");
        cur.classList.add("large", "bright","tempf");
        cur.setAttribute('style', 'line-height: 5%;');
        cur.setAttribute("style", "padding-bottom:15px;");
	    cur.innerHTML = "<font color=#7dfafd>" + current.temp_f + "&deg;";
		wrapper.appendChild(cur);
		
		return wrapper;
	},

});