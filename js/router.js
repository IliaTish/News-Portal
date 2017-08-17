function Router(){
	Router.routes = new Object;
}
Router.routes = [];

Router.registerRoute = function(route,callback){
	Router.routes[route] = callback;
}

Router.executeRoute = function(route,object){
	if(object == undefined){
		console.log("aaa");
		console.log(Router.routes);
		var splitRoute = route.split("?");
		Router.routes[splitRoute[0]](route);
	}
	else
	{
		Router.routes[route](route,object);
	}
}