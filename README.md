# Persistence
A small Javascript Library aimed at making it easier to read and write to localstorage

###Usage 
Instantiate a new Persistence object:
```javascript
var _p = new Persistence();
```
To get all data within localStorage for your this instance
```javascript
var _p = new Persistence();
var allData = _p.getPersistenceStates(); //returns JSON Object of all data
```
To get a specific value to a key in a key/value pair in local storage
```javascript
var _p = new Persistence();
var specificData = _p.getPersistenceState('key'); //returns value of that key in the JSON object of all localstorage for this intance
```
To set persistence data
```javascript
var _p = new Persistence();
var newData = {foo: "bar"};
var updatedData = _p.setPersistenceState(newData); //updates localstorage and returns JSON Object of all updated data
```
To clear all localStorage data for a Persistence instance:
```javascript
var _p = new Persistence();
_p.clearPersistenceStates(); //resets localstorage and deletes all data for that Persistence instance
```
A Persistence Object instance has an expiration date. By Default it's set to 1 day. To change:
```javascript
var _p = new Persistence();
_p.setExpirationDays(5); //sets expiration of data to 5 days
```
To get the current expiration date of a Persistence instance:
```javascript
var _p = new Persistence();
_p.getExpirationDays(); //returns expiration of data in this instance
```
A Persistence object uses a key in local storage to set the data, by default its `appData`. To change:
```javascript
var _p = new Persistence();
_p.setAppDataKey('newAppKey'); //sets the key in localStorage for this persistence object to "newAppKey"
```
To get the current key:
```javascript
var _p = new Persistence();
_p.getAppDataKey(); //sets the key in localStorage for this persistence object to "newAppKey"
```
