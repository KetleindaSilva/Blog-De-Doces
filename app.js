const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});


app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página inicial (Home)
app.get('/', (req, res) => {
  res.render('index');
});

// Rota para a página de contato
app.get('/contato', (req, res) => {
  res.render('contato');
});

// Rota para a página "Sobre"
app.get('/sobre', (req, res) => {
  res.render('sobre');
});

// Rota para a página de receitas de bolos
app.get('/receitas/bolos', (req, res) => {
  res.render('receitas/bolo');
});

// Rota para a página de receitas de brigadeiros
app.get('/receitas/brigadeiros', (req, res) => {
  res.render('receitas/brigadeiros');
});

// Rota para a página de receitas de mousses
app.get('/receitas/mousses', (req, res) => {
  res.render('receitas/mousses');
});

// Rota para a página de receitas de tortas
app.get('/receitas/tortas', (req, res) => {
  res.render('receitas/tortas');
});


  
// Rota para as páginas individuais de receitas
app.get('/receitas/:nomeReceita', (req, res) => {
  const { nomeReceita } = req.params;

  // Lê o arquivo JSON com as receitas
  fs.readFile('receitas.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo JSON de receitas:', err);
      return res.status(500).send('Erro interno do servidor');
    }

    const receitas = JSON.parse(data);

    // Verifica se a receita solicitada existe no arquivo JSON
    if (!receitas[nomeReceita]) {
      return res.status(404).send('Receita não encontrada');
    }

    // Renderiza a página da receita com os dados fornecidos pelo arquivo JSON
    res.render('receitas/receita', { receita: receitas[nomeReceita] });
  });
});

const port = 5000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}.`);
});
