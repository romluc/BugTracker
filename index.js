const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const GoogleSpreadsheet = require('google-spreadsheet');
const credentials = require('./bugtracker.json');

// Configuracoes
const docId = '1Zv4N1QY4_UnjgZajZa8eYyCGf_VAE7sA1HLOmcJmjjA';
const worksheetIndex = 0;

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.render('home');
});

app.post('/', (req, res) => {
	const doc = new GoogleSpreadsheet(docId);
	doc.useServiceAccountAuth(credentials, err => {
		if (err) {
			console.log('Nao foi possivel abrir a planilha');
		} else {
			console.log('Planilha aberta');
			doc.getInfo((err, info) => {
				console.log(info);
				const worksheet = info.worksheets[worksheetIndex];
				worksheet.addRow(
					{ name: req.body.name, email: req.body.email },
					err => {
						res.send('Bug reportado com sucesso');
					}
				);
			});
		}
	});
});

app.listen(3000, err => {
	if (err) {
		console.log('Ocorreu um erro');
	} else {
		console.log('BugTracker rodando na port 3000');
	}
});
