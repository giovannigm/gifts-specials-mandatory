class Sistema {
    constructor() {
        this.listaCategorias = [];
        this.listaExperiencias = [];
        this.listaCompra = [];
    }

    agregarCategoria(laCategoria) {
        this.listaCategorias.push(laCategoria);
    }

    agregarCompra(lacompra) {
        this.listaCompra.push(lacompra);
    }

    agregarExperiencia(laExperiencia) {
        this.listaExperiencias.push(laExperiencia);
    }

    darCategorias() {
        return this.listaCategorias;
    }

    darCompra() {
        return this.listaCompra;
    }

    darExperiencias() {
        return this.listaExperiencias;
    }

    eliminarElementoDeCategorias(pos) {
        this.listaCategorias.splice(pos, 1);
    }

    eliminarElementoDeExperiencias(pos) {
        this.listaExperiencias.splice(pos, 1);
    }

    existeCategoria(laCategoria) {
        return this.listaCategorias.some(categoria => categoria.nombre.toLowerCase() === laCategoria.nombre.toLowerCase());
    }

    existeCategoriaEnExperiencias(laCategoria) {
        return this.listaExperiencias.some(experiencia => experiencia.categoria === laCategoria);
    }

    existeExperiencia(laExperiencia) {
        return this.listaExperiencias.some(experiencia => experiencia.titulo.toLowerCase() === laExperiencia.titulo.toLowerCase());
    }

    existeExperienciaEnCompra(laExperiencia) {
        return this.listaExperiencias.some(experiencia => experiencia.contadorCompras >= 1 && experiencia.titulo === laExperiencia);
    }

    experienciaMasComprada() {
        let experienciasMasCompradas = [this.listaExperiencias[0]];

        for (let i = 1; i < this.listaExperiencias.length; i++) {
            let experienciaActual = this.listaExperiencias[i];

            if (experienciaActual.contadorCompras > experienciasMasCompradas[0].contadorCompras) {
                experienciasMasCompradas = [experienciaActual];
            } else if (experienciaActual.contadorCompras === experienciasMasCompradas[0].contadorCompras) {
                experienciasMasCompradas.push(experienciaActual);
            }
        }
        return experienciasMasCompradas;
    }

    fechaYhora() {
        const fechaHoraActual = new Date();

        const dia = String(fechaHoraActual.getDate()).padStart(2, '0');
        const mes = String(fechaHoraActual.getMonth() + 1).padStart(2, '0');
        const año = fechaHoraActual.getFullYear();

        const horas = String(fechaHoraActual.getHours()).padStart(2, '0');
        const minutos = String(fechaHoraActual.getMinutes()).padStart(2, '0');

        const fechaFormateada = `${dia}/${mes}/${año}`;
        const horaFormateada = `${horas}:${minutos}`;

        return { hora: horaFormateada, fecha: fechaFormateada };
    }

    montoExperienciaMasCara() {
        let montoMasAlto = this.listaExperiencias[0].precio;

        for (let i = 1; i < this.listaExperiencias.length; i++) {
            if (this.listaExperiencias[i].precio > montoMasAlto) {
                montoMasAlto = this.listaExperiencias[i].precio;
            }
        }

        return montoMasAlto;
    }

    obtenerDescripcionCategoriaPorNombre(nombreCategoria) {
        const categoriaEncontrada = this.listaCategorias.find(categoria => categoria.nombre === nombreCategoria);

        if (categoriaEncontrada) {
            return categoriaEncontrada.descripcion;
        }
    }

    sumarUnaCompra(tituloExperiencia) {
        const experienciaEncontrada = this.listaExperiencias.find(experiencia => experiencia.titulo === tituloExperiencia);

        if (experienciaEncontrada) {
            experienciaEncontrada.contadorCompras++;
        }
    }
}

class Categoria {
    constructor(nombCat, desCat) {
        this.nombre = nombCat;
        this.descripcion = desCat;
    }
    toString() {
        return `${this.nombre} ${this.descripcion} `;
    }
}

class Experiencia {
    constructor(elTitulo, laDescripcion, elPrecio, laCantidadPersona, laCategoria) {
        this.titulo = elTitulo;
        this.descripcion = laDescripcion;
        this.precio = elPrecio;
        this.cantidadPersona = laCantidadPersona;
        this.categoria = laCategoria;
        this.contadorCompras = 0;
    }
    toString() {
        return `${this.titulo} ${this.descripcion} ${this.precio} ${this.cantidadPersona} ${this.categoria}`;
    }
}

class Compra {
    constructor(elNombreComprador, elEmailComprador, elTituloCompra, laCategoriaExperiencia, laFecha, laHora) {
        this.titulo = elTituloCompra;
        this.categoria = laCategoriaExperiencia;
        this.emailComprador = elEmailComprador;
        this.nombreComprador = elNombreComprador;
        this.fecha = laFecha;
        this.hora = laHora;

    }
    toString() {
        return `${this.titulo} ${this.categoria} ${this.emailComprador} ${this.nombreComprador}`;
    }
}