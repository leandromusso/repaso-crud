const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		res.render('index', {products});
	},
	search: (req, res) => {
		res.render('results', {
			products : products.filter(product => product.name.toLowerCase().includes(req.query.keywords.toLowerCase())),
			search : req.query.keywords
		});
	},
};

module.exports = controller;
