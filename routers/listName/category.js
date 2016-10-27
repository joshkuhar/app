var categoryRouter = require('express').Router();
var Category = require('./categoryModel');


categoryRouter.post('/category', function(req, res) {
		console.log(req.body.name);
		Category.create({
			name: req.body.name
		}, function(err, items) {
			if (err) {
				console.log(err);
				return res.status(500).json({
					message: 'Internal Server Error'
					});
				} 
				res.status(200).json(items);
			});   
    });

// categoryRouter.get('/category/:name', function(req, res){
// 	Category.findOne({
// 		name: req.params.name
// 	})
// 	.populate('items')
// 	.exec(function(err, cat){
// 		if (err) {
// 			console.log(err);
// 		}
// 		res.json(cat);
// 	});
// });

module.exports = categoryRouter;

