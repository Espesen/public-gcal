var PublicGcal = require('./index.js')
  , API_key = 'your_api_key_here'
  , calendarID = 'your_calendar_id_here';

var gcal = new PublicGcal({API_key: API_key, calendarId: calendarID});

gcal.getEvents(function (error, result) {
  // result is now array of events
});