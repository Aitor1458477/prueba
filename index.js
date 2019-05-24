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
     	   Automatico();
     	  // Ready();
     	   app.setupPush();    	   
     	   
    },
    
    setupPush: function() {
    
    	var push = PushNotification.init({
            	
	           "android": {
	               "senderID": "405185187585"
	           },
	           "ios": {
	             "alert": true,
	             "sound": true,
	             "vibration": true,
	             "badge": true
	           },
	           "windows": {}
	       });

       push.on('registration', function(data) {
           //console.log("registration event: " + data.registrationId);
           //document.getElementById("regId").innerHTML = data.registrationId;
           alert("hola2");
           alert(data.registrationId);
           var oldRegId = localStorage.getItem('registrationId');
           var id = localStorage.getItem('Id');
           var xmlhttp=new XMLHttpRequest();
           

           if (oldRegId != data.registrationId || id!=null ) {
               // Save new registration ID
               localStorage.setItem('registrationId', data.registrationId);
               // Post registrationId to your app server as the value has changed
               var urlToken="https://siesoluciones.com/tickets2/movil/ajaxGuardarToken.php?idUsu="+id+"&token="+oldRegId;
               xmlhttp.open("GET",urlToken,true);
			   xmlhttp.send();

           }
       });

       push.on('error', function(e) {
           console.log("push error = " + e.message);
       });

        /*push.on('notification', function(data) {
          console.log('notification event');
          var cards = document.getElementById("cards");
          var push = '<div class="row">' +
            '<div class="col s12 m6">' +
            '  <div class="card darken-1">' +
            '    <div class="card-content black-text">' +
            '      <span class="card-title black-text">' + data.title + '</span>' +
            '      <p>' + data.message + '</p>' +
            '      <p>' + data.additionalData.foreground + '</p>' +
            '    </div>' +
            '  </div>' +
            ' </div>' +
            '</div>';
          cards.innerHTML += push;
        });*/
     
                   

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
    
    
    
    
};


    
    
function loadXMLDoc(){
	//2 - Recepción de la llamada
	var xmlhttp=new XMLHttpRequest();
	//var sharedPreferences = nuevo.plugins.SharedPreferences.getInstance("Login");
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
			//sharedPreferences.put('Usuario', user, successCallback, errorCallback);
			//sharedPreferences.put('Contrasena', pass, successCallback, errorCallback);
			//sharedPreferences.put('Id', xmlhttp.responseText, succesCallback, errorCallback);
			localStorage.setItem("Usuario", user);
			localStorage.setItem("Clave", pass);
			localStorage.setItem("Id", xmlhttp.responseText)
			window.open("https://siesoluciones.com/tickets2/movil/index2.php?usuario="+user+"&clave="+pass, "_blank", "location=no");

		    var oldRegId = localStorage.getItem('registrationId');
            var id = localStorage.getItem('Id');
            var urlToken="https://siesoluciones.com/tickets2/movil/ajaxGuardarToken.php?idUsu="+id+"&token="+oldRegId;

            if (oldRegId != data.registrationId || id!=null ) {
            	alert("hola");
               // Save new registration ID
               localStorage.setItem('registrationId', data.registrationId);
               // Post registrationId to your app server as the value has changed
               xmlhttp.open("GET",urlToken,true);
			   xmlhttp.send();

            }

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


function Automatico(){
	var user = localStorage.getItem("Usuario");
	var pass = localStorage.getItem("Clave");
	if(user!=null || pass!=null){

		window.open("https://siesoluciones.com/tickets2/movil/index2.php?usuario="+user+"&clave="+pass, "_blank", "location=no");
	}
	 
};





