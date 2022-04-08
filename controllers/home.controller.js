exports.homeGetController = async (req, res, next) => {
	res.send("<h1>This is the home page</h1>");
};

exports.dashboardGetController = async (req, res, next) => {
	res.json({
		username: req.username,
		userId: req.userId,
	});
};
