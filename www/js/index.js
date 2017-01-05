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
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        main();
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

      var main = function() {
        document.getElementById("createContact").addEventListener("click", createContact);
        document.getElementById("findContact").addEventListener("click", findContact);
        document.getElementById("removeContact").addEventListener("click", removeContact);
      }

      var createContact = function() {
        var name = prompt("What is the contact name?");
        var myContact = navigator.contacts.create({"displayName": name});
        var phoneNumbers = [];
        var emails = [];
        var phone1 = prompt("What is the phone number?");
        var email1 = prompt("What is the email?");

        phoneNumbers[0] = new ContactField('work', phone1, true);
        emails[0] = new ContactField('main', email1, true);

        myContact.phoneNumbers = phoneNumbers;
        myContact.emails = emails;

        myContact.save(contactSuccess, contactError);

            function contactSuccess() {
                alert("Contact is saved!")
              }

            function contactError(message) {
              alert('Failed because: ' + message);
            }

      }

      var findContact = function() {

        var options = new ContactFindOptions();
          options.filter = prompt("What contact do you want to find?");
          options.multiple = true;

          fields = [navigator.contacts.fieldType.displayName];

          navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);

          function contactfindSuccess(contacts) {
              for (var i = 0; i < contacts.length; i++) {
                alert("Display Name = " + contacts[i].displayName);
              }
            }

          function contactfindError(message) {
            alert('Failed because: ' + message);
          }

        }
      var removeContact = function() {
        var options = new ContactFindOptions();
          options.filter = prompt("Which contact do you want to remove?");
          options.multiple = false;

          fields = [navigator.contacts.fieldType.displayName];

          navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);

            function contactfindSuccess(contacts) {

              var contact = contacts[0];
              contact.remove(contactRemoveSuccess, contactRemoveError);

              function contactRemoveSuccess(contact) {
                alert("Contact Deleted");
              }

              function contactRemoveError(message) {
                alert('Failed because: ' + message);
              }
            }

            function contactfindError(message) {
              alert('Failed because: ' + message);
            }
          }
app.initialize();
