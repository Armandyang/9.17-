var ModelUser = require('../model/user.js');
var ModelBlog = require('../model/blog.js');
module.exports.login = {
		get : function(req, res, next){
			res.render('login', {title : '登陆'})						  
			},
			
			
		post : function(req, res, next){
		var postData = {
					name : req.body.name
				};
				
				ModelUser.findOne(postData, function(err, data){
					if(err) console.log(err);
					if(data){
						if(data.password == req.body.password){
							req.session.user = data;
							res.redirect('/user/' + data._id);
						}else{
							res.send('登陆失败');
							}
					}else{
						res.send(" 此用户不存在");
						}
				});
				
	}
	
	
};



//  注册
module.exports.reg = {
	get : function(req, res, next){
			res.render('reg', {title : '注册'});
	},
	post : function(req, res, next){
			var postData = {
					name : req.body.name,
					password : req.body.password
				};
				ModelUser.findOne({name : req.body.name}, function(err, data){
						if(err) console.log(err);
						if(data){
							res.send("已经被注册");	
						}else{
							ModelUser.create(postData, function(err, data){
									if(err) console.log(err);
									req.session.user = data;
									res.send(data);
								});
							
							};
				});
				  
	}
	
};

//退出

module.exports.exit = {
	get : function(req, res, next){
		delete req.session.user;
		res.redirect('/');							  
	}
};


//个人
module.exports.user = {
	get :  function(req, res, next){
	var getData = {
		_id : req.param("_id")
		};
	if(getData._id){
		ModelUser.findById(getData, function(err, data){
				if(err) console.log(err);	
				
				if(data){
					res.render('user', {
							   title : data.name + '的个人资料',
							   view : data
							   });
					}else{
							res.send('查询不到此用户');
						};
		});
	}
	//res.send('用户中心正在开发中');							  
	}
};

//add
module.exports.add = {
	get : function(req, res, next){
			res.render('add', {
					   	title : ' 发表'
					   })			  
	},
	post : function(req, res, next){
			var postData= {
				author : req.session.user._id,
				title : req.body.title,
				content : req.body.content
				};
				ModelBlog.create(postData, function(err, data){
						if(err) console.log(err);
						res.redirect('/view/' + data._id);
						
				});
	}
	
}

//view
module.exports.view = {
	get : function(req, res, next){
		var getData = {
			_id : req.param('_id')
			};
		ModelBlog.findOne(getData, function(err, data){
			if(err) console.log(err);
			if(data){
				
				res.render('view', {
						   	title : data.title,
							view : data
						   });
				}else{
					res.send(" 内容不存在");
					}
			});
	}
		
};
//list

module.exports.list = {
	get : function(req, res, next){
		var aList = ModelBlog.find( {}, null, {sort:{_id : -1}});
		aList.populate('author').exec(function(err, data){
			 if(err) console.log(err);
			 res.render('list', {
						title : "列表",
						list : data
						});
			});	
	}
};

//登陆后才能访问的页面
module.exports.loginYes = {
		yes : function(req, res, next){
				var user = req.session.user;
				if(!user){
					res.redirect('/login');
					}else{
						next()
						};
			}
};
//登陆后不能访问的页面
module.exports.loginNo = function(req, res, next){
	var user = req.session.user;
	if(user){
		res.redirect('/user/' + user._id);
		}else{
			next();
			}
};


