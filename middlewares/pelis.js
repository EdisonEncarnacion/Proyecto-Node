const uuid = require('uuid');
const Pelis = require('../models/pelis')

// listado de pelis
async function listaPelis(req, res, next) {
    try {
        const pelis = await Pelis.listarPelis();
        res.render('pelis', { pelis });
    } catch (error) {
        next(error);
    }
}

// formulario para agregar o editar una peli
async function formularioPelis(req, res, next) {
    const id = req.params.id;
    const peli = id ? await Pelis.obtenerPeli(id) : null;
    if (id && !peli) {
        return next(createError(404));
    } else if (id && peli) {
        peli.id = id;
    }
    return res.render('pelis-form', { peli });
}

// agregar una peli con los datos del formulario
async function agregaPeli(req, res, next) {
    try {
        let peli = req.body;
        peli.id = uuid.v4();
        await Pelis.agregarPeli(peli);
    } catch (error) {
        next(error);
    }
    res.redirect('/pelis');
}

// actualizar la informacion de una peli
async function actualizaPeli(req, res, next) {
    try {
        let peli = req.body;
        await Pelis.actualizarPeli(peli);
    } catch (error) {
        next(error);
    }
    res.redirect('/pelis');
}

// eliminar una peli
async function eliminaPeli(req, res, next) {
    try {
        await Pelis.eliminarPeli(req.body.peliId);
        res.redirect('/pelis');
    } catch (error) {
        next(error);
    }
    next();
}

module.exports = {
    listaPelis,
    formularioPelis,
    agregaPeli,
    actualizaPeli,
    eliminaPeli
};
