"use strict";

var express  = require('express'),
    YQL      = require('yql'),
    re1      = new RegExp('[0-9]{5}'),
    app      = express();

// Generic Send Error Function
function sendError(res, code, msg) 
{
    res.status(code);
    res.json({ error: msg });
}

// GET /forecast
app.get('/forecast', function(request, response) 
{
    try 
    {
        // is the zipcode parameter present and valid?
        if (!request.query.zipcode || !request.query.zipcode.match(re1)) 
        {
            sendError(response, 400, 'Missing or invalid query parameter - zipcode');
        }
        else 
        {
            // Create the query according to YQL requirements.
            // No need to further sanitize the query param, because of regex check above.
            var forecastQuery =
              'SELECT * FROM weather.forecast WHERE woeid IN (SELECT woeid FROM geo.places(1) WHERE text="'+
              request.query.zipcode +'")';

            var query = new YQL(forecastQuery);
            // execute the query and then asynchronously create/send the
            // response in the anonymous callback function.
            query.exec(function(error, data) 
            {
                if (error) 
                {
                    sendError(response, 500, error);
                }
                else 
                {
                    response.json({
                        location : data.query.results.channel.location,
                        units : data.query.results.channel.units,
                        condition : data.query.results.channel.item.condition,
                        forecast : data.query.results.channel.item.forecast
                    });
                }
            });
        }
    }
    catch(e) 
    {
        sendError(response, 500, "Internal Server Error - " + e.message);
    }
});

// catch and return 404
app.use(function(req, res, next) 
{
    res.status(404);
    res.json({ message: "Not found" });
});

// start the server
var listener = app.listen(process.env.PORT || 7000, function() {
      var host = listener.address().address;
      var port = listener.address().port;
      console.log('server listening at http://%s:%s', host, port);
    });