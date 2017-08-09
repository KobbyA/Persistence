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

        var expirationDays = 1;//1000 milliseconds * 60 seconds * 60 minutes * 24 hrs * 14 days. AKA 2 weeks
        var expirationMillis = 1000 * 60 * 60 * 24 * expirationDays;
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
                var newState = $.extend({}, this.persistenceState, state);
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
