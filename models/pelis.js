const fs = require('fs').promises;

const FILE_PATH = `${process.env.RUTA_MODELOS}/pelis.json`;

async function contenidoArchivo() {
    const contenidoArchivo = await fs.readFile(FILE_PATH, 'utf8');
    return JSON.parse(contenidoArchivo);
}

async function reescribirArchivo(contenido) {
    return !!fs.writeFile(FILE_PATH, JSON.stringify(contenido, null, 4), 'utf8');
}

async function obtenerPeli(id) {
    const pelis = await contenidoArchivo();
    return pelis[id];
}

async function listarPelis() {
    const pelis = await contenidoArchivo();
    return Object.keys(pelis)
        .map(idPeli => ({ ...pelis[idPeli] }));
}

async function agregarPeli(peli) {
    let pelis = await contenidoArchivo();
    pelis[peli.id] = peli;
    return await reescribirArchivo(pelis);
}

async function actualizarPeli(peli) {
    const pelis = await contenidoArchivo();
    if (pelis[peli.id]) {
        Object.assign(pelis[peli.id], peli);
        return await reescribirArchivo(pelis);
    }
    return;
}

async function eliminarPeli(id) {
    const pelis = await contenidoArchivo();
    if (pelis[id]) {
        delete pelis[id];
        return await reescribirArchivo(pelis);
    }
}

module.exports = {
    obtenerPeli,
    listarPelis,
    agregarPeli,
    actualizarPeli,
    eliminarPeli
}
