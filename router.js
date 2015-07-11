var routes = require('i40') (),
    madlibRoutes = require('./routes/madlibs'),
    splatRoutes = require('./routes/splat');

//  CRUD routes
routes.addRoute('/', madlibRoutes.index)
routes.addRoute('/madlibs/:id', madlibRoutes.show)
routes.addRoute('/madlibs/new', madlibRoutes.new)
routes.addRoute('/madlibs/:id/edit', madlibRoutes.edit)
routes.addRoute('/madlibs/:id/update', madlibRoutes.update)
routes.addRoute('/madlibs/:id/delete', madlibRoutes.destroy)

//splat route
routes.addRoute('/public/*', splatRoutes.splat)

// User authentication routes

module.exports = routes
