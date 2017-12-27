const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});

app.use((req, res, next) => {
  res.render('maintenence.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  //res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'Tejas',
  //   likes: [
  //     'Racing',
  //     'coding'
  //   ]
  // });
  res.render('home.hbs', {
    welcomeMessage: 'Welcome to my website',
    pageTitle: 'About Page',
    //currentYear: new Date().getFullYear()
  })
});

app.get('/about', (req,res) => {
  //res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'About Page',
    //currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req,res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () => {
  console.log('server is up on port 3000');
});
