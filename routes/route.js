const homeRoute = require("../routes/home.route");
const userRoute = require("../routes/user.route");

const routes = [
	{
		path: "/",
		handler: homeRoute,
	},
	{
		path: "/user",
		handler: userRoute,
	},
];

module.exports = (app) => {
	routes.forEach((singleRoute) => {
		app.use(singleRoute.path, singleRoute.handler);
	});
};
