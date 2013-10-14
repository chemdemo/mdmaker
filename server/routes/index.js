
/*
 * Routes home page
 */

exports = module.exports = function(app) {
    /*app.get('/cache.manifest', function(req, res) {
    	res.header('Content-Type', 'text/cache-manifest');
    	res.end('CACHE MANIFEST');
    });*/

    app.get('/auth/:type', function(req, res, next) {
        res.send(200, req);
    });
}