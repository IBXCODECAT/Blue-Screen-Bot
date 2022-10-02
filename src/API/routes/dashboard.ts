const dashboard_route = require('express').Router();

//Middleware function to check authorization of discord user
function isAuthorized(req: any, res: any, next: any) {
    if(req.user) {
        console.log(`User is logged in as ${req.user}`);
        next(); //Go to the next function (request handler)
    } else {
        console.log('User is not logged in');
        res.redirect('/');
    }
}

//This get function runs the isAuthorized middleware
dashboard_route.get('/', isAuthorized, (req: any, res: any) => {
    res.status(200).render('dashboard');
});

export = dashboard_route;