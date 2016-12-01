var request = require('request');
var moment = require('moment')

function PublicGcal(options) {

  options = options || {};

  if (!options.API_key) {
    throw new Error('API_key must be specified!');
  }

  if (!options.calendarId) {
    throw new Error('calendarId must be specified!');
  }

  if (options.timeMin && !moment(options.timeMin).isUTC()) {
    throw new Error('timeMin must be an RFC3339 timestamp with mandatory time zone offset, e.g., 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z.')
  }

  if (options.timeMax && !moment(options.timeMax).isUTC()) {
    throw new Error('timeMax must be an RFC3339 timestamp with mandatory time zone offset, e.g., 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z.')
  }

  if (options.q && typeof options.q !== 'string') {
    throw new Error('q must be a string!')
  }

  if (options.orderBy && (options.orderBy !== 'startTime' || options.orderBy !== 'updated')) {
    throw new Error('orderBy must be either \'startTime\' or \'updated\'!')
  }

  if (options.singleEvents && typeof options.singleEvents !== 'boolean') {
    throw new Error('singleEvents must be boolean!')
  }

  this.API_key = options.API_key;
  this.calendarId = options.calendarId;
  this.singleEvents = options.singleEvents || true; // default false
  this.timeMin = options.timeMin;
  this.timeMax = options.timeMax;
  this.q = options.q;
  this.orderBy = options.orderBy || 'startTime';

}

PublicGcal.prototype.getEvents = function (callback) {

  var url = 'https://www.googleapis.com/calendar/v3/calendars/' +this.calendarId +
    "/events?key=" + this.API_key;

  if (this.singleEvents) { url = url + '&singleEvents=' + this.singleEvents; }
  if (this.timeMin) { url = url + '&timeMin=' + this.timeMin; }
  if (this.timeMax) { url = url + '&timeMax=' + this.timeMax; }
  if (this.q) { url = url + '&q=' + this.q; }
  if (this.orderBy) { url = url + '&orderBy=' + this.orderBy; }

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