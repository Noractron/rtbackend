const zona_ejercicio = require("../models").tbl_zona_ejercicio;
const entrenador = require("../models").tbl_entrenador;
const personaje = require("../models").tbl_personaje;
const entrenador_zona = require("../models").tbl_entrenador_zona;
const swappi = require('../swappi/swappi')
module.exports = {
    async create(req, res) {
        //validacion de campos
        if (!req.body.planeta_id)
            return res.status(404).send("No se encontro el valor")
        if (!req.body.personaje_id)
            return res.status(404).send("No se encontro el valor")
        let personaje_id = await personaje.findOne({ where: { activo: 1, id: req.body.personaje_id } })
        if (!personaje_id)
            return res.status(404).send("No se encontro el valor")
        //consulta api Swappi
        await swappi.findPlanet(req.body.planeta_id)
            .then(swappis => {
                //validacion campos
                if (swappis[0].nombre == undefined)
                    return res.status(404).send("No se encontro el planeta")
                //insert tabla zona_ejercicio
                zona_ejercicio.create({
                    nombre_planeta: swappis[0].nombre,
                    gravedad: swappis[0].gravedad,
                    planeta_id: req.body.planeta_id,
                    personaje_id: req.body.personaje_id
                }).then(async zona_ejercicio => {
                    //si no se asignan entrenadores para esta zona al momento de crear debe enviar una respuesta satisfactoria
                    if (!req.body.entrenador_id) {
                        return res.status(200).send("Creado")
                    } else {
                        //ciclo for para todos los ID de entrenadores que estaran asociados a la zona_ejercicio
                        for (let entrenador_id of req.body.entrenador_id.split(",")) {
                            await entrenador.findAll({
                                where: {
                                    id: entrenador_id,
                                    activo: 1
                                }
                            })
                                .then(async checkTrainer => {
                                    //se valida que los entrenadores existan
                                    if (checkTrainer.length > 0) {
                                        //se inserta la zona de ejercicio y a los entreandores a la tabla pivote
                                        await entrenador_zona.create({
                                            zona_ejercicio_id: zona_ejercicio.id,
                                            entrenador_id: entrenador_id
                                        })
                                    }
                                })
                        }
                        return res.status(200).send("Creado")
                    }
                })
                    .catch(error => res.status(400).send(error))
            })
            .catch(error => res.status(400).send(error))
    },
    list(req, res) {
        //condicionales para el endpoint limita, ordena por y organiza
        const limit = parseInt(req.query.limit) || null;
        const orderBy = req.query.orderBy || "id";
        const sort = req.query.sort || "asc";
        return zona_ejercicio.findAll({
            include: [{
                model: personaje,
                as: "tbl_personaje",
            },
            {
                model: entrenador,
                as: "tbl_entrenador",
                through: {
                }
            }],
            where: {
                activo: 1
            },
            limit: limit,
            order: [
                [orderBy, sort],
            ]
        })
            .then(zona_ejercicio => res.status(200).send(zona_ejercicio))
            .catch(error => res.status(400).send(error))
    },
    find(req, res) {
        //Busca una zona especifica
        return zona_ejercicio.findOne({
            include: [{
                model: personaje,
                as: "tbl_personaje",
            },
            {
                model: entrenador,
                as: "tbl_entrenador",
                through: {
                }
            }],
            where: {
                id: req.params.id,
                activo: 1
            }
        })
            .then(zona_ejercicio => {
                if (!zona_ejercicio)
                    return res.status(404).send("Zona no encontrado");
                return res.status(200).send(zona_ejercicio)
            })
            .catch(error => res.status(400).send(error))
    },
    async update(req, res) {
        //validacion de campos
        if (!req.body.planeta_id)
            return res.status(404).send("No se encontro el valor")
        if (!req.body.personaje_id)
            return res.status(404).send("No se encontro el valor")
        let personaje_id = await personaje.findOne({ where: { activo: 1, id: req.body.personaje_id } })
        if (!personaje_id)
            return res.status(404).send("No se encontro el valor")
        //consulta al api de swappi
        await swappi.findPlanet(req.body.planeta_id)
            .then(swappis => {
                //validacion de campos
                if (swappis[0].nombre == undefined)
                    return res.status(404).send("No se encontro el planeta")
                // actualiza la informacion en la tabla tbl_zona_ejercicio
                zona_ejercicio.update(
                    {
                        nombre_planeta: swappis[0].nombre,
                        gravedad: swappis[0].gravedad,
                        planeta_id: req.body.planeta_id,
                        personaje_id: req.body.personaje_id
                    },
                    {
                        where:
                        {
                            id: req.params.id
                        }
                    })
                    .then(async function () {
                        //elimina las zonas asociadas en la tabla pivote
                        await entrenador_zona.destroy({
                            where: {
                                zona_ejercicio_id: req.params.id
                            }
                        })
                    })
                    .then(async function () {
                        //si no se asignan entrenadores para esta zona al momento de modificar debe enviar una respuesta satisfactoria
                        if (!req.body.entrenador_id) {
                            return res.status(200).send("Modificado")
                        } else {
                            //ciclo for para todos los ID de entrenadores que estaran asociados a la zona_ejercicio
                            for (let entrenador_id of req.body.entrenador_id.split(",")) {
                                await entrenador.findAll({
                                    where: {
                                        id: entrenador_id,
                                        activo: 1
                                    }
                                })
                                    .then(async checkTrainer => {
                                        //se valida que el entrenador exista
                                        if (checkTrainer.length > 0) {
                                            //se registra a los entrenadores y a la zona asociada en la tabla pivote
                                            await entrenador_zona.create({
                                                entrenador_id: entrenador_id,
                                                zona_ejercicio_id: req.params.id
                                            })
                                        }
                                    })
                            }
                            return res.status(200).send("Modificado")
                        }
                    })
                    .catch(error => res.status(400).send(error))
            })
    },
    delete(req, res) {
        //se cambia de estado a la zona
        zona_ejercicio.update(
            { activo: 0 },
            {
                where:
                {
                    id: req.params.id
                }
            }
        ).then(function () { return res.status(200).send("Eliminado") })
            .catch(error => res.status(400).send(error))
    }
}

