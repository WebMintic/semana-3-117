/*en caso de  hacer uso con el directorio controlador se 
debe importar como se observa en la siguiente linea, con el nombre del archivo js
que contiene la logica */
const express = require ('express');
const morgan = require('morgan');
const apiRouter = require('./routes/index'); //Accede por defecto al archivo index.js
const bodyParser = require('body-parser');
const cors = require('cors');

//instancia de Express en mi app
const app = express();

//Instancia de CORS para permitir lectura de recursos remotos
app.use(cors())

app.use((req, res, next) =>{
    res.header("Acces-Control-Allow-Origin", "*");
    res.header("Acces-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Acces-Control-Allow-Methods: GET, POST, PUT, DELETE");
    next();
});


//Middleware MORGAN para detectar peticiones
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', apiRouter);
// API ENDPOINTS
/*se debe contar un una ruta por medio de método post para el inicio de sesión de la siguiente manera:
'/api/auth/signin'
*/
app.set('PORT', process.env.PORT || 3000);

app.get('/', function(req, res) {
    console.log("Estructura base del proyecto backend");
    res.send("Estructura base del proyecto backend");
});

app.listen(app.get('PORT'), () => {
    console.log(`Running on http://localhost:${app.get('PORT')}`)
})

module.exports = app;