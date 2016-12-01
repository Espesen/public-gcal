var PublicGcal = require('../index.js')
  , API_key = require('./API_key.js');


describe('constructor PublicGcal', function () {

  var testFuncs = [
    function () {
      var gcal = new PublicGcal();
    },
    function () {
      var gcal = new PublicGcal({ API_key: 'foo' });
    }
  ];

  it('should throw error if options omitted', function () {
    testFuncs.forEach(function (func) {
      expect(func).toThrowError(/must be specified/i);
    });
  });

  describe('method getEvents', function () {

    var gcal
      , result;

    beforeEach(function (done) {
      gcal = new PublicGcal({API_key: API_key, calendarId: '199slga5i4eh632182h41sr98g@group.calendar.google.com'});
      if (!result) {
        gcal.getEvents(function (err, data) {
          if (err) {
            return done(err);
          }
          result = data;
          done();
        });
      }
      else {
        done();
      }
    });

    it('should return array of events', function () {
      expect(result instanceof Array).toBeTruthy();
    });

    it('should return error if Google returns error', function (done) {
      new PublicGcal({ API_key: 'foo', calendarId: 'bar' }).getEvents(function (error, result) {
        expect(error).toBeTruthy();
        expect(error.toString()).toMatch(/keyinvalid/i);
        done();
      });
    });

    describe('resulting array', function () {

      it('should contain events with summary (string) and start date (Date object)', function () {
        result.forEach(function (item) {
          expect('summary' in item).toBeTruthy();
          expect(item.summary).toMatch(/event/);
          expect(item.startDate instanceof Date).toBeTruthy();
        });
      });

      it('should be date-sorted (ascending)', function () {
        result.forEach(function (item, index) {
          if (index < result.length - 2) {
            expect(item.startDate.toISOString()).not.toBeGreaterThan(result[index + 1].startDate.toISOString())
          }
        })
      });
    });
  });

});
