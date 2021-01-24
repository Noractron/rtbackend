const request = require("supertest");
const expect = require('chai').expect;
const app = require("../index.js");



/**
 * Testea el GET para todos los personajes
 */
describe("GET /api/v1/personajes", () => {
  it("respuesta con json que contiene una lista de todas los personajes", (done) => {
    request(app)
      .get("/personajes")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
/**
 * Testea el endpoint de personaje, dandole un personaje especifico
 */
describe("GET /api/v1/personajes/:id", () => {
  it("respuesta con json que contiene una lista de un solo personaje", (done) => {
    request(app)
      .get("/api/v1/personajes/1")
      .set("Accept", "application/json")
      .expect(200, done);
  });
  it("responder con json cuando la persona no existe", (done) => {
    request(app)
      .get("/api/v1/personajes/nonexistingperson")
      .set("Accept", "application/json")
      .expect(404)
      .expect("Persona no encontrada")
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

/**
 * Testanedo el Endpoint POST para los personajes
 */
describe("POST /api/v1/personajes", () => {
  it("responder con 200 creado", () => {
    const data = {
      swappi_id: 8
    };
    const res = request(app)
      .post("/api/v1/personajes")
      .set("Accept", "application/json")
      .send(data)
      .expect(200)
    // res.end((err) => {
    //   done();
    // });

  });

  it("responder con 404 bad request",  () => {

    const data = {
      // no swappi_id
    };
    const res =  request(app)
      .post("/api/v1/personajes")
      .set("Accept", "application/json")
      .send(data)
      .expect(404)
      .expect("No se encontro el valor")
  });
});

/**
 * Testanedo el Endpoint PUT para los personajes
 */
describe("PUT /api/v1/personajes/:id", () => {
  it("respuesta con 200 modificado", () => {
    const data = {
      swappi_id: 8
    };
    request(app)
      .put("/api/v1/personajes/1")
      .set("Accept", "application/json")
      .send(data)
      .expect(200);
  });

  it("respuesta con 404 bad request", () => {
    const data = {
      // no swappi_id
    };
    request(app)
      .put("/api/v1/personajes/:id")
      .set("Accept", "application/json")
      .send(data)
      .expect(404)
      .expect("No se encontro el valor")

  });
});



/**
 * Testea el GET para todos los entrenadores
 */
describe("GET /api/v1/entrenador", () => {
  it("responde con un json que contene una lista de todos los entrenadores", (done) => {
    request(app)
      .get("/entrenador")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
/**
 * Testea el endpoint de etrenador, dandole un entrenador especifico
 */
describe("GET /api/v1/entrenador/:id", () => {
  it("responde con un json que contiene un solo entreandor", (done) => {
    request(app)
      .get("/api/v1/entrenador/1")
      .set("Accept", "application/json")
      .expect(200, done);
  });
  it("responde con un json entrenador no encontrado cnado el entrenador no existe", (done) => {
    request(app)
      .get("/api/v1/entrenador/nonexistingperson")
      .set("Accept", "application/json")
      .expect(404)
      .expect("Entrenador no encontrado")
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

/**
 * Testanedo el Endpoint POST para los entrenadores
 */
describe("POST /api/v1/entrenador", () => {
  it("responde con 200 creado", () => {
    const data = {
      nombre: "cecilia",
      apellido: "carreño",
      edad: 26,
      codigo_imperial: "r0062b2",
      religion: "Hermandad del Resplandor Glorioso",
      zona_ejercicio_id: '12,13'
    };
    request(app)
      .post("/api/v1/entrenador")
      .set("Accept", "application/json")
      .send(data)
      .expect(200)
  });

  it("responde con 404 sobre un bad request", () => {
    const data = {
      // no swappi_id
    };
    request(app)
      .post("/api/v1/entrenador")
      .set("Accept", "application/json")
      .send(data)
      .expect(404)
      .expect("No se encontro el valor")
  });
});

/**
 * Testanedo el Endpoint PUT para los entreandores
 */
describe("PUT /api/v1/entrenador/:id", () => {
  it("responde con 200 modificado", () => {
    const data = {
      nombre: "cecilia",
      apellido: "carreño",
      edad: 26,
      codigo_imperial: "r0062b2",
      religion: "Hermandad del Resplandor Glorioso",
      zona_ejercicio_id: "12"
    };
    request(app)
      .put("/api/v1/entrenador/7")
      .set("Accept", "application/json")
      .send(data)
      .expect(200);
  });
});



/**
 * Testea el GET para todos las zonas de ejercicio
 */
describe("GET /api/v1/zona-ejercicio", () => {
  it("responde con un json que contiene una lista de todas las zonas de ejercicio", (done) => {
    request(app)
      .get("/zona-ejercicio")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
/**
 * Testea el endpoint de zona-ejercicio, dandole una zona de ejercicio especifica
 */
describe("GET /api/v1/zona-ejercicio/:id", () => {
  it("responde con un json que contiene una sola zona de ejercicio", (done) => {
    request(app)
      .get("/api/v1/zona-ejercicio/7")
      .set("Accept", "application/json")
      .expect(200, done);
  });
  it("responde con un json zona no encontrada cuando la zona de ejercicio no exista", (done) => {
    request(app)
      .get("/api/v1/zona-ejercicio/nonexistingperson")
      .set("Accept", "application/json")
      .expect(404)
      .expect("Zona no encontrado")
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

/**
 * Testanedo el Endpoint POST para las Zonas de ejercicio
 */
describe("POST /api/v1/zona-ejercicio", () => {
  it("responde con 200 creado", () => {
    const data = {
      planeta_id: 12,
      personaje_id: 21,
      entrenador_id: "1"
    };
    request(app)
      .post("/api/v1/zona-ejercicio")
      .set("Accept", "application/json")
      .send(data)
      .expect(200)
  });

  it("responde con 404 cuando hay un bad request", () => {
    const data = {
      // no swappi_id
    };
    request(app)
      .post("/api/v1/zona-ejercicio")
      .set("Accept", "application/json")
      .send(data)
      .expect(404)
      .expect("No se encontro el valor")

  });
});

/**
 * Testanedo el Endpoint PUT para las Zonas de ejercicio
 */
describe("PUT /api/v1/zona-ejercicio/:id", () => {
  it("respode con un 200 modificado", () => {
    const data = {
      planeta_id: 12,
      personaje_id: 21,
      entrenador_id: "1"
    };
    request(app)
      .put("/api/v1/zona-ejercicio/7")
      .set("Accept", "application/json")
      .send(data)
      .expect(200);
  });
});
