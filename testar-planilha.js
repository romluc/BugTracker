const GoogleSpreadsheet = require('google-spreadsheet');
const credentials = require('./bugtracker.json');

const doc = new GoogleSpreadsheet(
	'1Zv4N1QY4_UnjgZajZa8eYyCGf_VAE7sA1HLOmcJmjjA'
);

doc.useServiceAccountAuth(credentials, err => {
	if (err) {
		console.log('Nao foi possivel abrir a planilha');
	} else {
		console.log('Planilha aberta');
		doc.getInfo((err, info) => {
			console.log(info);
			const worksheet = info.worksheets[0];
			worksheet.addRow({ name: 'Romulo', email: 'teste' }, err => {
				console.log('Linha inserida');
			});
		});
	}
});
