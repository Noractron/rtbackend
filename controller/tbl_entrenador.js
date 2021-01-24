const entrenador = require("../models").tbl_entrenador;
const zona_ejercicio = require("../models").tbl_zona_ejercicio;
const entrenador_zona = require("../models").tbl_entrenador_zona;
const personaje = require("../models").tbl_personaje;
module.exports = {
    async create(req, res) {
        //se valida campos
        if (!req.body.nombre)
            return res.status(404).send("No se encontro el valor")
        if (!req.body.apellido)
            return res.status(404).send("No se encontro el valor")
        if (!req.body.codigo_imperial)
            return res.status(404).send("No se encontro el valor")
        //se crea el entrenador
        await entrenador.create({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            edad: req.body.edad,
            codigo_imperial: req.body.codigo_imperial,
            religion: req.body.religion
        }).then(async entrenador => {
            //se valida campos
            if (!req.body.zona_ejercicio_id) {
                return res.status(200).send("Creado")
            } else {
                //si no se asignan zonas de ejercicios para este entrenador al momento de crear debe enviar una respuesta satisfactoria
                for (let zona_ejercicio_id of req.body.zona_ejercicio_id.split(",")) {
                    await zona_ejercicio.findAll({
                        where: {
                            id: zona_ejercicio_id,
                            activo: 1
                        }
                    })
                        .then(async checkZona => {
                            //valida campos
                            if (checkZona.length > 0) {
                                //inserta al entrenador y las zonas asociadas a la tabla pivote
                                await entrenador_zona.create({
                                    entrenador_id: entrenador.id,
                                    zona_ejercicio_id: zona_ejercicio_id
                                })
                            }
                        })
                }
                return res.status(200).send("Creado")
            }
        })
            .catch(error => res.status(400).send(error))
    },
    list(req, res) {
        //condicionales para el endpoint limita, ordena por y organiza
        const limit = parseInt(req.query.limit) || null;
        const orderBy = req.query.orderBy || "id";
        const sort = req.query.sort || "asc";
        return entrenador.findAll({
            include:
            {
                model: zona_ejercicio,
                as: "tbl_zona_ejercicio",
                through: {},
                where: {
                    activo: 1
                },
                required: false,
                include: {
                    model: personaje, as: 'tbl_personaje',
                    where: {
                        activo: 1
                    }
                }
            },
            where: {
                activo: 1
            },
            limit: limit,
            order: [
                [orderBy, sort],
            ]
        })
            .then(entrenador => res.status(200).send(entrenador))
            .catch(error => res.status(400).send(error))
    },
    find(req, res) {
        //Busca un entrenador especifico
        return entrenador.findOne({
            include:
            {
                model: zona_ejercicio,
                as: "tbl_zona_ejercicio",
                through: {},
                where: {
                    activo: 1
                },
                required: false,
                include: {
                    model: personaje, as: 'tbl_personaje',
                    where: {
                        activo: 1
                    }
                }
            },
            where: {
                activo: 1,
                id: req.params.id
            }
        })
            .then(entrenador => {
                if (!entrenador)
                    return res.status(404).send("Entrenador no encontrado");
                return res.status(200).send(entrenador)
            })
            .catch(error => res.status(400).send(error))
    },
    async update(req, res) {
        let query_entrenador = {}
        //genera un arreglo con solo los campos que se requieren modificar, asi podemos editar solo el apellido, como todo los campos si el usuario gusta
        if (req.body.name !== undefined) {
            query_entrenador["nombre"] = req.body.nombre
        }
        if (req.body.weight !== undefined) {
            query_entrenador["apellido"] = req.body.apellido
        }
        if (req.body.quantity !== undefined) {
            query_entrenador["edad"] = req.body.edad
        }
        if (req.body.packaging_id !== undefined) {
            query_entrenador["codigo_imperial"] = req.body.codigo_imperial
        }
        if (req.body.packaging_id !== undefined) {
            query_entrenador["religion"] = req.body.religion
        }
        //se modifica la informacion de la tabla tbl_entrenador
        await entrenador.update(
            query_entrenador,
            {
                where:
                {
                    id: req.params.id
                }
            })
            .then(async function () {
                //se elimina los datos de la tabla pivote con el id del entreandor
                await entrenador_zona.destroy({
                    where: {
                        entrenador_id: req.params.id
                    }
                })
            })
            .then(async function () {
                //validar campos
                if (!req.body.zona_ejercicio_id) {
                    return res.status(200).send("Modificado")
                } else {
                    //ciclo for para todos los ID de zonas que estaran asociados al entrenador
                    for (let zona_ejercicio_id of req.body.zona_ejercicio_id.split(",")) {
                        await zona_ejercicio.findAll({
                            where: {
                                id: zona_ejercicio_id,
                                activo: 1
                            }
                        })
                            .then(async checkZona => {
                                //valida campos
                                if (checkZona.length > 0) {
                                    //se inserta la el entreandor y a las zonas asociadas a la tabla pivote
                                    await entrenador_zona.create({
                                        entrenador_id: req.params.id,
                                        zona_ejercicio_id: zona_ejercicio_id
                                    })
                                }
                            })
                    }
                    return res.status(200).send("Modificado")
                }
            })
            .catch(error => res.status(400).send(error))
    },
    delete(req, res) {
        //se cambia de estado al entrenador
        entrenador.update(
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