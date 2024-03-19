const createError = require('http-errors');
const { body, param, validationResult } = require('express-validator');

const GENEROS_VALIDOS = [
    'accion',
    'aventura',
    'comedia',
    'documental',
    'drama',
    'suspenso'
];

function crearErrorOContinuar(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(createError(400));
    }
    return next();
}

module.exports = {
    uuidParamValidator: [
        param('id').trim().escape().isUUID(),
        crearErrorOContinuar
    ],
    formularioPeliValidator: [
        body('titulo').trim().escape().notEmpty(),
        body('genero').trim().escape().notEmpty().isLowercase().isIn(GENEROS_VALIDOS),
        body('calificacion').trim().escape().notEmpty().isInt({min:1, max:5}),
        crearErrorOContinuar
    ],
    eliminaPeliValidator: [
        body('peliId').isUUID(),
        crearErrorOContinuar
    ]
}
