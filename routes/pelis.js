const express = require('express');
const router = express.Router();
const {
  listaPelis,
  formularioPelis,
  agregaPeli,
  actualizaPeli,
  eliminaPeli
} = require('../middlewares/pelis')
const {
  uuidParamValidator,
  formularioPeliValidator,
  eliminaPeliValidator
} = require('../middlewares/validators');

router.get('/', listaPelis);

router.post('/agregar', formularioPeliValidator, agregaPeli);

router.post('/actualizar', formularioPeliValidator, actualizaPeli);

router.post('/eliminar', eliminaPeliValidator, eliminaPeli);

router.get('/nueva', formularioPelis);

router.get('/:id', uuidParamValidator, formularioPelis);

module.exports = router;
