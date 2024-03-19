const createError = require('http-errors');
const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const pelisRouter = require('./routes/pelis');
const helmet = require('helmet');

const app = express();

// configurar plantillas de handlebars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// configurar middlewares
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// definir rutas
app.use('/', indexRouter);
app.use('/pelis', pelisRouter);

// Generar un error 404 para cualquier ruta no definida antes y pasarlo al manejo de errores
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);

    res.render('error', {
        mensaje: err.message,
        error: req.app.get('env') === 'development' ? err : null // solo exponer el error en desarrollo
    });
});

module.exports = app;
