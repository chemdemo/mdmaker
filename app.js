
/**
 * A lightweight markdown editer.
 * @Author: <yangdemo@gmail.com>
 */

var express = require('express')
    , routes = require('server/routes')
    , http = require('http')
    , path = require('path')
    , settings = require('./settings');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || settings.APP_PORT);
    app.set('views', __dirname + '/server/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser(settings.COOKIE_SECRET));
    app.use(express.session());
    app.use(app.router);
    //app.use(require('stylus').middleware(__dirname + '/web'));
    app.use(express.static(path.join(__dirname, 'web')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

routes(app);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
