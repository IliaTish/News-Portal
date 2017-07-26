function Router(){
	Router.routes = new Object;
}
Router.routes = [];

Router.registerRoute = function(route,callback){
	Router.routes[route] = callback;
}

Router.executeRoute = function(route){
	Router.routes[route](route);
}