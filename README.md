# public-gcal

Get events from a public Google Calendar.

Install:
```
npm install public-gcal
```

Usage example:
```
var PublicGcal = require('public-gcal')
  , API_key = 'your_api_key_here' (get one in Google developer console)
  , calendarID = 'public_calendar_id_here';

var gcal = new PublicGcal({API_key: API_key, calendarId: calendarID});

gcal.getEvents(function (error, result) {
  // result is now array of events
});
```
 