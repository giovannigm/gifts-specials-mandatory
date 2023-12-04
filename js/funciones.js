window.addEventListener("load", inicio);
let miSistema = new Sistema();
let experienciasSeleccionada = "";

function inicio() {
    document.getElementById("idBotonAgregarCategoria").addEventListener("click", agregarCategoria);
    document.getElementById("idBotonBajaCategoria").addEventListener("click", botonBorrarCategoria);
    document.getElementById("idBotonAltaExperiencia").addEventListener("click", agregarExperinecia);
    document.getElementById("idCantidadPersonasCategoria").addEventListener(`change`, cargarExperienciasATabla);
    document.getElementById("idComboCategoriasIzquierda").addEventListener("change", cargarExperienciasATabla);
    document.getElementById("idOrdenPrecio").addEventListener("change", cargarExperienciasATabla);
    document.getElementById("idComboCategoriasIzquierda").addEventListener("change", cargarComprasALi);
    document.getElementById("idBotonComprar").addEventListener("click", agregarCompraDeExperiencia);
    document.getElementById("idBotonBajaExperiencia").addEventListener("click", botonBorrarExperiencia);
}

function agregarCategoria() {
    let formularioCategoria = document.getElementById("idFormCategoria");
    if (formularioCategoria.reportValidity()) {
        let nombreCategoria = document.getElementById("idNombreCategoria").value;
        let detalleCategoria = document.getElementById("idDetallesCategoria").value;
        let cat = new Categoria(nombreCategoria, detalleCategoria);
        if (miSistema.existeCategoria(cat)) {
            alert(`ya existe una categoria con ese nombre`)
        } else {
            miSistema.agregarCategoria(cat) /// agrega categorias a lista categorias
            cargarCategoriaAOption();
            habilitarBotonPorCondicion("idBotonBajaCategoria", miSistema.darCategorias().length >= 1);
            habilitarBotonPorCondicion("idBotonAltaExperiencia", miSistema.darCategorias().length >= 1);
            formularioCategoria.reset(); // vacia el formulario.
        }
    } else {
        alert("complete todos los campos son requeridos");
    }
}

function cargarCategoriaAOption() {
    listaCategoria = miSistema.darCategorias();
    const lista = document.getElementById("idComboCategoriasIzquierda");
    lista.innerHTML = "";
    const lista2 = document.getElementById("idCategoriaExperiencia");
    lista2.innerHTML = "";
    const lista3 = document.getElementById("idComboCategoriasAbajo");
    lista3.innerHTML = "";
    for (lis of listaCategoria) {
        const nodoOption = document.createElement("option");
        const nodoTexto = document.createTextNode(lis.nombre);
        nodoOption.appendChild(nodoTexto);
        lista.appendChild(nodoOption);
        const nodoOption2 = document.createElement("option");
        const nodoTexto2 = document.createTextNode(lis.nombre);
        nodoOption2.appendChild(nodoTexto2);
        lista2.appendChild(nodoOption2);
        const nodoOption3 = document.createElement("option");
        const nodoTexto3 = document.createTextNode(lis.nombre);
        nodoOption3.appendChild(nodoTexto3);
        lista3.appendChild(nodoOption3);
    }

}

function habilitarBotonPorCondicion(buttonId, condicion) {
    const button = document.getElementById(buttonId);
    button.disabled = !condicion;
}

function agregarExperinecia() {
    let formularioExperiencia = document.getElementById("idFormExperiencia");
    if (formularioExperiencia.reportValidity()) {
        let titulo = document.getElementById("idTituloExperiencia").value;
        let descripcion = document.getElementById("idDescripcionExperiencia").value;
        let precio = parseInt(document.getElementById("idPrecioExperiencia").value);
        let cantidadPersonas = document.getElementById("idCantidadPersonasExperiencia").value;
        let categoria = document.getElementById("idCategoriaExperiencia").value;
        let exp = new Experiencia(titulo, descripcion, precio, cantidadPersonas, categoria);
        if (miSistema.existeExperiencia(exp)) {
            alert(`ya existe una Experiencia con ese nombre`)
        } else {
            miSistema.agregarExperiencia(exp);
            habilitarBotonPorCondicion("idBotonBajaExperiencia", miSistema.darExperiencias().length >= 1);
            habilitarBotonPorCondicion("idBotonComprar", miSistema.darExperiencias().length >= 1);
            cargarExperienciasAOption();
            cargarExperienciasATabla();
            formularioExperiencia.reset();
            experienciasCaras();
        }
    } else {
        alert("complete todos los campos son requeridos");
    }
}

function cargarExperienciasAOption() {
    let opcionTexto = miSistema.darExperiencias()
    const lista = document.getElementById("idComboBajaExperiencia");
    lista.innerHTML = "";
    for (lis of opcionTexto) {
        const nodoOption = document.createElement("option");
        const nodoTexto = document.createTextNode(lis.titulo);
        nodoOption.appendChild(nodoTexto);
        lista.appendChild(nodoOption);
    }
}

function cargarExperienciasATabla() {
    let experiencias = seleccion();
    let nodoTabla = document.getElementById("idTabla");
    nodoTabla.innerHTML = "";
    let nodoTbody = document.createElement("tbody");
    nodoTbody.id = 'miTabla';
    nodoTabla.appendChild(nodoTbody);
    let nodoTr = document.createElement("tr");
    nodoTbody.appendChild(nodoTr);
    let columnasEnFila = 0;
    for (experiencia of experiencias) {
        if (columnasEnFila >= 2) {
            nodoTr = document.createElement("tr");
            nodoTbody.appendChild(nodoTr);
            columnasEnFila = 0;
        }
        let nodoTd = document.createElement("td");
        nodoTd.id = `infoTd`;
        let nodoDiv = document.createElement("div");
        nodoDiv.id = `informacion`;
        let nodoPtitulo = document.createElement("p");
        let nodoTextoT = document.createTextNode(experiencia.titulo);
        nodoPtitulo.id = `titulo`;
        nodoPtitulo.appendChild(nodoTextoT);
        nodoDiv.appendChild(nodoPtitulo);
        let nodoPdescripcion = document.createElement("p");
        let nodoTextoD = document.createTextNode(experiencia.descripcion);
        nodoPdescripcion.id = `descripcion`;
        nodoPdescripcion.appendChild(nodoTextoD);
        nodoDiv.appendChild(nodoPdescripcion);
        let nodoPprecio = document.createElement("p");
        let nodoTextoP = document.createTextNode(`$${experiencia.precio}`);
        nodoPprecio.id = `precio`;
        nodoPprecio.appendChild(nodoTextoP);
        nodoDiv.appendChild(nodoPprecio);
        let nodoImg = document.createElement("img");
        nodoImg.id = `imagenExperiencia`;
        if (experiencia.cantidadPersona == "uno") {
            nodoImg.src = `./img/uno.png`;
        } else if (experiencia.cantidadPersona == "dos") {
            nodoImg.src = `./img/dos.png`;
        } else if (experiencia.cantidadPersona == "varias") {
            nodoImg.src = `./img/muchos.png`;
        }
        nodoTd.appendChild(nodoDiv);
        nodoTd.appendChild(nodoImg);
        nodoTr.appendChild(nodoTd);
        columnasEnFila++;
    }
    agregarEventoClickATd();
}

function agregarEventoClickATd() {
    let nodosTd = document.querySelectorAll('#idTabla td');
    nodosTd.forEach(function (nodoTd) {
        nodoTd.addEventListener('click', function () {
            let tituloSeleccionado = this.querySelector('#titulo').textContent;
            experienciasSeleccionada = miSistema.darExperiencias().find(experiencia => experiencia.titulo === tituloSeleccionado);
            this.setAttribute('data-experiencia', JSON.stringify(experienciasSeleccionada));
            const estaSeleccionado = this.classList.contains('seleccionado');
            if (experienciasSeleccionada) {
                document.querySelectorAll('#idTabla td.seleccionado').forEach(function (nodo) {
                    nodo.classList.remove('seleccionado');
                });
            }
            if (!estaSeleccionado) {
                this.classList.add('seleccionado');
            }
        });
    });
}

function cargarExperienciasMasCompradas() {
    let opcionTexto = miSistema.experienciaMasComprada();
    const lista = document.getElementById("idExperienciasMasCompradas");
    lista.innerHTML = "";
    for (experiencia of opcionTexto) {
        const nodoOption = document.createElement("li");
        const nodoTexto = document.createTextNode(experiencia.titulo);
        nodoOption.appendChild(nodoTexto);
        lista.appendChild(nodoOption);
    }
}

function cargarComprasALi() {
    let categoriaSeleccionada = document.getElementById("idComboCategoriasIzquierda").value;
    let compras = miSistema.darCompra();
    compras = compras.filter(compra => compra.categoria === categoriaSeleccionada);
    if (compras.length >= 1) {
        let lista = document.getElementById("idListaCompras");
        lista.innerHTML = "";
        let pTexto = document.getElementById("idDetallesCualCategoria")
        pTexto.innerHTML = "";
        let descripcionCategoria = miSistema.obtenerDescripcionCategoriaPorNombre(categoriaSeleccionada);
        let nodoTextoP = document.createTextNode(`Infomracion Detallada de la Categoria ${categoriaSeleccionada} ${descripcionCategoria}`);
        pTexto.appendChild(nodoTextoP);
        for (const compra of compras) {
            let nodoLi = document.createElement("li");
            let nodoTexto = document.createTextNode(`Nombre: ${compra.nombreComprador} Mail:${compra.emailComprador}   Fecha: ${compra.fecha}    Hora:${compra.hora}`)
            nodoLi.appendChild(nodoTexto);
            lista.appendChild(nodoLi);
        }
    } else {
        let lista = document.getElementById("idListaCompras");
        lista.innerHTML = "";
        let pTexto = document.getElementById("idDetallesCualCategoria")
        pTexto.innerHTML = "Sin datos";
    }
}

function agregarCompraDeExperiencia() {
    let formularioCompra = document.getElementById("idFormCompra");
    if (experienciasSeleccionada === "") {
        alert("selccione una experiencia");
    } else {
        if (formularioCompra.reportValidity()) {
            let nombreComprador = document.getElementById("idNombreComprador").value;
            let emailComprador = document.getElementById("idMail").value;
            let tituloCompra = experienciasSeleccionada.titulo;
            let categoriaExperiencia = experienciasSeleccionada.categoria;
            let fechaYhora = miSistema.fechaYhora();
            let com = new Compra(nombreComprador, emailComprador, tituloCompra, categoriaExperiencia, fechaYhora.fecha, fechaYhora.hora);

            miSistema.agregarCompra(com);
            miSistema.sumarUnaCompra(experienciasSeleccionada.titulo); // busca entre experiencias y va a la experiencia con el mismo nombre del titulo y le agrega +1 a contador compras.
            cargarExperienciasMasCompradas();
            cargarComprasALi();
            alert("compra registrada!")
            formularioCompra.reset();
        } else {
            alert("todos los campos son requeridos");
        }
    }
}

function seleccion() {
    let personaSeleccionada = document.getElementById("idCantidadPersonasCategoria").value;
    let categoriaSeleccionada = document.getElementById("idComboCategoriasIzquierda").value;
    let ordenSeleccionada = document.getElementById("idOrdenPrecio").value;
    let experiencias = miSistema.darExperiencias();
    if (personaSeleccionada !== "todos") {
        experiencias = experiencias.filter(experiencia => experiencia.cantidadPersona === personaSeleccionada);
    }
    if (categoriaSeleccionada !== "") {
        experiencias = experiencias.filter(experiencia => experiencia.categoria === categoriaSeleccionada);
    }
    if (ordenSeleccionada === "1") {
        experiencias.sort(function (a, b) {
            return a.precio - b.precio;
        });
    } else if (ordenSeleccionada === "2") {
        experiencias.sort(function (a, b) {
            return b.precio - a.precio;
        });
    }
    return experiencias;
}

function botonBorrarCategoria() {
    let datosDelSection = document.getElementById("idComboCategoriasAbajo");
    let posSeleccionada = datosDelSection.selectedIndex;
    if (miSistema.existeCategoriaEnExperiencias(datosDelSection.value)) {
        alert(`esta categoria no se puede borrar por que pertenece a una experiencia`);
        cargarCategoriaAOption();
    } else {
        miSistema.eliminarElementoDeCategorias(posSeleccionada);
        alert(`categoria borrada correctamente`);
        cargarCategoriaAOption();
    }
}

function botonBorrarExperiencia() {
    let datosDelSection = document.getElementById("idComboBajaExperiencia");
    let posSeleccionada = datosDelSection.selectedIndex;
    if (miSistema.existeExperienciaEnCompra(datosDelSection.value)) {
        alert(`esta Experiencia no se puede borrar por que tiene una compra`);
        cargarExperienciasAOption();
    } else {
        miSistema.eliminarElementoDeExperiencias(posSeleccionada);
        alert(`Experiencia borrada correctamente`);
        cargarExperienciasAOption();
        cargarExperienciasATabla();
    }
}

function experienciasCaras() {
    let nodoP = document.getElementById("idExperienciaMasCara");
    nodoP.innerHTML = "";
    nodotext = document.createTextNode(miSistema.montoExperienciaMasCara());
    nodoP.appendChild(nodotext);
}