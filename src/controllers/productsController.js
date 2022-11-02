const { randomBytes } = require('crypto');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {products});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let product = products.find(product => product.id == req.params.id);
		res.render('detail', {product});
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {

		//Obtengo la imagen del producto
		//console.log(req.file);

		products.push({
			id: Number(Math.random()*1000000).toFixed(0),
			price: Number(req.body.price),
			discount: Number(req.body.discount),
			category: req.body.category,
			description: req.body.description,
			image: req.file.filename,
			name: req.body.name
		});

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/products');
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;