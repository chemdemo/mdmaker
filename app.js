
/**
 * Mdmaker.
 * @Author: <yangdemo@gmail.com>
 */

var express = require('express')
    , routes = require('./server/routes')
    , http = require('http')
    , path = require('path')
    //, stylus = require('stylus')
    , settings = require('./settings');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || settings.APP_PORT);
    // app.set('views', __dirname + '/server/views');
    // app.engine('html', require('jade').__express);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser(settings.COOKIE_SECRET));
    app.use(express.session());
    app.use(app.router);
    /*app.use(stylus.middleware({
        src: __dirname + '/web/style',
        dest: __dirname + '/web/style',
        compile: function(srt, path, fn) {
            stylus(str)
            .set('filename', path)
            .set('compress', true)
            .render(fn);
        }
    }));*/
    app.use(express.static(path.join(__dirname, 'web')));
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

routes(app);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
