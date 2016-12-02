var request = require('request');
var moment = require('moment');

function PublicGcal(options) {

  options = options || {};

  if (!options.API_key) {
    throw new Error('API_key must be specified!');
  }

  if (!options.calendarId) {
    throw new Error('calendarId must be specified!');
  }

  this.API_key = options.API_key;
  this.calendarId = options.calendarId;

}

PublicGcal.prototype.getEvents = function (options, callback) {


  if (!callback) {
    callback = options;
    options = {};
  }

  // thanks to user RichardLitt for following code
  
  options.singleEvents = ("singleEvents" in options) ? options.singleEvents : true; // default true
  options.orderBy = options.orderBy || 'startTime';

  if (options.timeMin && !moment(options.timeMin).isUTC()) {
    callback(new Error('timeMin must be an RFC3339 timestamp with mandatory time zone offset, e.g., 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z.'));
  }

  if (options.timeMax && !moment(options.timeMax).isUTC()) {
    callback(new Error('timeMax must be an RFC3339 timestamp with mandatory time zone offset, e.g., 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z.'));
  }

  if (options.q && typeof options.q !== 'string') {
    callback(new Error('q must be a string!'));
  }

  if (options.orderBy && options.orderBy !== 'startTime' && options.orderBy !== 'updated') {
    callback(new Error('orderBy must be either \'startTime\' or \'updated\'!'));
  }

  if (options.singleEvents && typeof options.singleEvents !== 'boolean') {
    callback(new Error('singleEvents must be boolean!'));
  }

  var url = 'https://www.googleapis.com/calendar/v3/calendars/' +this.calendarId +
    "/events?key=" + this.API_key;

  if (options.singleEvents) { url = url + '&singleEvents=True'; }
  if (options.timeMin) { url = url + '&timeMin=' + options.timeMin; }
  if (options.timeMax) { url = url + '&timeMax=' + options.timeMax; }
  if (options.q) { url = url + '&q=' + options.q; }
  if (options.orderBy) { url = url + '&orderBy=' + options.orderBy; }

  var result = [];

  request(url, function (error, response, data) {
    if (error) {
      return callback(error);
    }

    data = JSON.parse(data);

    if ('error' in data) {
      return callback(new Error('Error from Google: ' + JSON.stringify(data.error.errors)));
    }

    var events = data.items;

    result = events.map(function (item) {
      return {
        summary: item.summary,
        description: item.description ? item.description : '',
        location: item.location ? item.location : '',
        start: item.start,
        end: item.end
      };
    });

    callback(null, result);
  });

};

module.exports = PublicGcal;