var request = require('request');

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

PublicGcal.prototype.getEvents = function (callback) {

  var url = 'https://www.googleapis.com/calendar/v3/calendars/' +this.calendarId +
    "/events?key=" + this.API_key + '&singleEvents=True&orderBy=startTime';

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
        startDate: new Date(item.start.dateTime)
      };
    });

    callback(null, result);
  });

};

module.exports = PublicGcal;