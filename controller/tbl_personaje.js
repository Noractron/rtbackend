const personaje = require("../models").tbl_personaje;
const swappi = require('../swappi/swappi')
const lib = require('../libs/libs')
module.exports = {
    async create(req, res) {
        //valida campos
        if (!req.body.swappi_id)
            return res.status(404).send("No se encontro el valor")
            //consulta swappi
        await swappi.findPeople(req.body.swappi_id)
            .then(swappis => {
                
                //valida campos
                if (swappis[0].nombre == undefined)
                    return res.status(404).send("No se encontro el valor")
                //se calcula el IMC 
                let talla, IMC, composicion;
                talla = Math.pow(swappis[0].talla / 100, 2);
                IMC = swappis[0].peso / talla;
                //se llama a una funcion que trabaja con el IMC devolviendo un string de resultado al IMC
                composicion = lib.composicion(IMC)
                //se registra a la persona
                personaje.create({
                    nombre: swappis[0].nombre,
                    IMC: IMC,
                    composicion: composicion,
                    swappi_id: req.body.swappi_id
                }).then(function () {
                    return res.status(200).send("Creado")
                }).catch(error => res.status(400).send(error))
            })
            .catch(error => res.status(400).send(error))
    },
    list(req, res) {
        //condicionales para el endpoint limita, ordena por y organiza
        const limit = parseInt(req.query.limit) || null;
        const orderBy = req.query.orderBy || "id";
        const sort = req.query.sort || "asc";
        return personaje.findAll({
            where: {
                activo: 1
            },
            limit: limit,
            order: [
                [orderBy, sort],
            ]
        })
            .then(personaje => res.status(200).send(personaje))
            .catch(error => res.status(400).send(error))
    },
    async find(req, res) {
        //Busca un personaje especifico
        return personaje.findOne({
            where: {
                id:req.params.id,
                activo: 1
            }
        })
            .then(personaje => {
                if (!personaje)
                    return res.status(404).send("Persona no encontrada");
                return res.status(200).send(personaje)
            })
            .catch(error => res.status(400).send(error))
    },
    async update(req, res) {
        //validar campos
        if (!req.body.swappi_id)
            return res.status(404).send("No se encontro el valor")
        //se consulta a swappi
        await swappi.findPeople(req.body.swappi_id)
            .then(swappis => {
                //valida campos
                if (swappis[0].detail == "Not found")
                    return res.status(404).send("No se encontro el valor")
                    //se calcula el IMC
                let talla, IMC, composicion;
                talla = Math.pow(swappis[0].talla / 100, 2);
                IMC = swappis[0].peso / talla;
                //se llama a una funcion que trabaja con el IMC devolviendo un string de resultado al IMC
                composicion = lib.composicion(IMC)
                //se modifica los datos de la tabla tbl_personaje
                personaje.update(
                    {
                        nombre: swappis[0].nombre,
                        IMC: IMC,
                        composicion: composicion,
                        swappi_id: req.body.swappi_id
                    },
                    {
                        where:
                        {
                            id: req.params.id
                        }
                    }
                ).then(function () {
                    return res.status(200).send("Modificado")
                })
                    .catch(error => res.status(400).send(error))
            })
            .catch(error => res.status(400).send(error))
    },
    delete(req, res) {
        //se cambia de estado al personaje
        personaje.update(
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