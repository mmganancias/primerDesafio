function notNull(valor, mensaje) {
  if (valor === null || valor === undefined) {
    throw new Error(el valor no puede ser null);
  }
  return valor;
}
class Evento {
  #id
  #capacidad
  #participantes
  #precio

  constructor({ nombre, lugar, precio, capacidad = 50, fecha = new Date() }) {
    this.#id = Evento.getNextId(); // Get the next available ID
    this.#capacidad = notNull(capacidad, "Capacidad es requerida");
    this.#participantes = [];
    this.#precio = notNull(precio, "Precio es requerido");
    notNull(nombre, "Nombre es requerido");
    notNull(lugar, "Lugar es requerido");
    notNull(fecha, "Fecha es requerida");
  }

  static lastId = 0;

  static getNextId() {
    Evento.lastId += 1;
    return Evento.lastId;
  }
}

class ManagerEventos {
  #eventos
  constructor() {
    this.#eventos = [];
  }

  agregarEvento(datosEvento) {
    const evento = new Evento(datosEvento);
    this.#eventos.push(evento);
    return evento;
  }

  agregarUsuario({ idEvento, idUsuario }) {
    const evento = this.#eventos.find((e) => e.id === idEvento);
    if (!evento) throw new Error(`El evento con id ${idEvento} no existe`);
    evento.agregarParticipante(idUsuario);
  }

asPOJO(){
  return {
    id: this.id,
  nombre: this.nombre,
  lugar: this.lugar,
  precio: this.precio,
  capacidad: this.capacidad,
  fecha: this.fecha,
  participantes:this.parcitipantes,
  }
}

ponerEventoEnGira({ idEvento, nuevaLocalidad, nuevaFecha }) {
  const eventoOriginal = this.#eventos.find(e => e.id === idEvento)
  if (!eventoOriginal) throw new Error(`el evento con id ${idEvento} no existe`)
  const nuevoEvento = new Evento({
    ...eventoOriginal.asPOJO(),
    id: generarId(),
    lugar: nuevaLocalidad,
    fecha: nuevaFecha
  })
  this.#eventos.push(nuevoEvento)
  return nuevoEvento.asPOJO()
}

}

const em = new ManagerEventos();

const datosEvento1 = {
  nombre: "Marcela",
  lugar: "Neuquen",
  precio: 1000,
};

const datosEvento2 = {
  nombre: "John's Event",
  lugar: "New York",
  precio: 500,
};

em.agregarEvento(datosEvento1);
em.agregarEvento(datosEvento2);