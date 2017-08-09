/**
 * Persistence
 * Read and write from local storage
 * Written by Kobby Appiah
 *
 */

(function (win) {
    win.Persistence = function () {
        var lsKeys = {
            appData: "appData",
            time: 'appData_expTimestamp'
        };

        var expirationDays = 1;//data expires after 1 day by default
        var expirationMillis = 1000 * 60 * 60 * 24 * expirationDays;//1000 milliseconds * 60 seconds * 60 minutes * 24 hrs.
        var tStamp = localStorage.getItem(lsKeys.time);

        //check for expiration
        function checkForExpiration() {
            var now = Date.now();
            var expTime = now + expirationMillis;
            if (tStamp == null) {
                localStorage.setItem(lsKeys.time, expTime);
            } else if (tStamp - now > expirationMillis) {
                //expire data it's been here too long
                localStorage.clear();
                localStorage.setItem(lsKeys.time, expTime);
            }
        }
        
        function deepExtend(out) {
            out = out || {};

            for (var i = 1; i < arguments.length; i++) {
                var obj = arguments[i];

                if (!obj)
                    continue;

                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (typeof obj[key] === 'object')
                            out[key] = deepExtend(out[key], obj[key]);
                        else
                            out[key] = obj[key];
                    }
                }
            }

            return out;
        }


        function persist(data) {
            //persist to cookie
            checkForExpiration();
            localStorage.setItem(lsKeys.appData, JSON.stringify(data));
            return retrievePersistence();
        }

        function retrievePersistence() {
            var persistenceData = JSON.parse(localStorage.getItem(lsKeys.appData));

            if (persistenceData == null) {
                return {}
            }

            return persistenceData;
        }

        checkForExpiration();

        return {
            persistenceState: retrievePersistence(),

            getPersistenceStates: function () {
                return this.persistenceState;
            },

            clearPersistenceStates: function () {
                this.persistenceState = persist({});
            },

            getPersistenceState: function (state) {
                return this.persistenceState[state];
            },

            setPersistenceState: function (state) {
                var newState = deepExtend({}, this.persistenceState, state);
                this.persistenceState = persist(newState);

                return this.persistenceState;
            },

            getExpirationDays:function(){
                return expirationDays;
            },

            setExpirationDays: function(days){
                expirationDays = days;
            },

            setAppDataKey: function(keyName){
                lsKeys.appData = keyName;
                lsKeys.time = keyName + '_expTimestamp';
            },

            getAppDataKey: function(){
                return lsKeys.appData;
            }
        }

    }
})(window);
