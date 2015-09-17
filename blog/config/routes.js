
var PluginUser = require('../plugin/user');
module.exports = function(app){
	app.use(function(req, res, next){
		var user = req.session.user;
		if(user){
			app.locals.user = user;
		}else{
			app.locals.user = user;
			}
			next();
	});
	
	app.get('/', function(req, res, next){
			res.render('index', { title : '首页' });				  
	});
	app.get('/login', PluginUser.loginNo, PluginUser.login.get);
	app.post('/login', PluginUser.login.post);
	
	
	
	app.get('/reg',  PluginUser.loginNo,PluginUser.reg.get);
	app.post('/reg', PluginUser.reg.post);
	
	
	
	app.get('/exit', PluginUser.exit.get);
	
	
	
	app.get('/user/:_id', PluginUser.user.get);
	
	app.get('/add', PluginUser.loginYes.yes, PluginUser.add.get);
	app.post('/add', PluginUser.add.post);
	
	
	app.get('/view/:_id', PluginUser.view.get);
	
	app.get('/list', PluginUser.list.get);
	
	
}

