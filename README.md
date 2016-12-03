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

Method `getEvents(options, callback)` accepts following options:
- `singleEvents`: defaults to true. Expand recurring events to single instances.
- `orderBy`: defaults to `startTime`. Is ignored if `singleEvents` is false. See [Google Calendar API](https://developers.google.com/google-apps/calendar/v3/reference/events/list)
- `timeMin`, `timeMax`: query date limits. Must be an RFC3339 timestamp with mandatory time zone offset, e.g., 2011-06-03T10:00:00-07:00
- `q`: query string
 
 