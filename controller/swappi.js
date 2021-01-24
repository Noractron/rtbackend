const swappi = require('../swappi/swappi')
module.exports = {
    async listPeople(req, res) {
        let respuesta;
        respuesta = await swappi.getPeople()
           .then(respuesta => res.status(200).send(respuesta))
            .catch(error => res.status(400).send(error))

    },
    async findPeople(req, res) {
        let respuesta;
        respuesta = await swappi.findPeople(req.params.id)
           .then(respuesta => res.status(200).send(respuesta))
            .catch(error => res.status(400).send(error))
    },
    async listPlanet(req, res) {
        let respuesta;
        respuesta = await swappi.getPlanet()
            .then(respuesta => res.status(200).send(respuesta))
            .catch(error => res.status(400).send(error))
    },
    async findPlanet(req, res) {
        let respuesta;
        respuesta = await swappi.findPlanet(req.params.id)
            .then(respuesta => res.status(200).send(respuesta))
            .catch(error => res.status(400).send(error))
    },
    async listFilm(req, res) {
        let respuesta;
        respuesta = await swappi.getFilms()
            .then(respuesta => res.status(200).send(respuesta))
            .catch(error => res.status(400).send(error))
    },
    async findFilm(req, res) {
        let respuesta;
        respuesta = await swappi.findFilms(req.params.id)
            .then(respuesta => res.status(200).send(respuesta))
            .catch(error => res.status(400).send(error))
    },
    async listStarShips(req, res) {
        let respuesta;
        respuesta = await swappi.getStarShip()
           .then(respuesta => res.status(200).send(respuesta))
            .catch(error => res.status(400).send(error))
    },
    async findStarShips(req, res) {
        let respuesta;
        respuesta = await swappi.findStarShip(req.params.id)
           .then(respuesta => res.status(200).send(respuesta))
            .catch(error => res.status(400).send(error))
    },
    async listVehicle(req, res) {
        let respuesta;
        respuesta = await swappi.getVehicules()
           .then(respuesta => res.status(200).send(respuesta))
            .catch(error => res.status(400).send(error))
    },
    async findVehicle(req, res) {
        let respuesta;
        respuesta = await swappi.findVehicules(req.params.id)
           .then(respuesta => res.status(200).send(respuesta))
            .catch(error => res.status(400).send(error))
    },
    async listSpecies(req, res) {
        let respuesta;
        respuesta = await swappi.getSpecies()
           .then(respuesta => res.status(200).send(respuesta))
            .catch(error => res.status(400).send(error))
    },
    async findSpecies(req, res) {
        let respuesta;
        respuesta = await swappi.findSpecies(req.params.id)
           .then(respuesta => res.status(200).send(respuesta))
            .catch(error => res.status(400).send(error))
    }
}