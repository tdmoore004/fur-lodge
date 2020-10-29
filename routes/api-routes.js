const db = require("../models");

module.exports = function (app) {

    app.post("/host", async (req, res) => {
        console.log(req.body);
        const results = await db.Host.create(req.body);
        try {
            res.json(results);
        } catch (error) {
            console.log(error);
        }
    });

    app.post("/booking", (req,res) => {
        db.Booking.create(req.body)
            .then(results => res.json(results))
            .catch(error => console.log(error));
    });

    app.get("/booking", (req,res) => {
        db.Booking.findAll({
            include: [db.Host]
        })
            .then(results => res.json(results))
            .catch(error => console.log(error));
    });

    app.get("/host", (req,res) => {
        db.Host.findAll({
            include: [db.Booking]
        })
            .then(results => res.json(results))
            .catch(error => console.log(error));
    });
};