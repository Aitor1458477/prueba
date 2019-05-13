/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    
    
    
    
};


    
    
function loadXMLDoc(){
	//2 - Recepción de la llamada
	var xmlhttp=new XMLHttpRequest();
	var sharedPreferences = nuevo.plugins.SharedPreferences.getInstance("Login");
	var successCallback = function() {
    	console.log('OK');
	}
	var errorCallback = function(err) {
    	console.error(err);
	}	

	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			//Trabajar respuesta
			if (xmlhttp.responseText == 0){
			document.getElementById("dAjax").innerHTML=xmlhttp.responseText;
			alert("usuario y/o contraseña incorrectos");
			
			document.getElementById("User").value="";
			document.getElementById("Pass").value="";
			}
			else{
			document.getElementById("dAjax").innerHTML=xmlhttp.responseText;
			sharedPreferences.put('Usuario', user, successCallback, errorCallback);
			sharedPreferences.put('Contrasena', pass, successCallback, errorCallback);
			sharedPreferences.put('Id', xmlhttp.responseText, succesCallback, errorCallback);
			//localStorage.setItem("Usuario", user);
			//localStorage.setItem("Clave", pass);
			//loadHTML("https://siesoluciones.com/tickets2/movil/index2.php?usuario="+user+"&clave="+pass,10000);
			navigator.app.loadUrl("https://siesoluciones.com/tickets2/movil/index2.php?usuario="+user+"&clave="+pass, { openExternal:true });

			}
		}
	}


	//1 - Envio de la llamada
	var user = document.getElementById("User").value;
	var pass = document.getElementById("Pass").value;
	var url = "http://siesoluciones.com/funcionesPHP/funcionesAndroid.php?login=1&usuario=" + user + "&clave=" + pass;	
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
};

function loadHTML(url, timeout) {
if (timeout == undefined)
    timeout = 10000;
var req = new XMLHttpRequest();
var timer = setTimeout(function() {
    try {
        req.abort();
    } catch(e) {}
    navigator.notification.loadingStop();
},timeout);
req.onreadystatechange = function() {
    if (req.readyState == 4) {
        if (req.status < 300) {
            clearTimeout(timer);

            var html = req.responseText;
            //just a debug print   
    alert(html);
    document.write(html);

        }
        navigator.notification.loadingStop();
        delete req;
    }       
};          
req.open('GET', url, true);
req.send();
};

function Cambiar(){
document.getElementById("btn").setAttribute("disabled", "true");

}




