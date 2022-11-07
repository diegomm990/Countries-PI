const {Sequelize} = require('sequelize');
const { Country, Activity } = require("../db");

async function newActivity(req, res){
    let obj = req.body;
    try {
        if(obj.name || obj.duration || obj.season || obj.difficulty || obj.countryID){
              const valdidateact = await Activity.findOne({
                  where: {
                    name: obj.name,
                  },
                });
            if(!valdidateact){
                const addActivity = await Activity.create({
                    name: obj.name,
                    difficulty: obj.difficulty,
                    duration: obj.duration,
                    season: obj.season
                })
                for (let i = 0; i < obj.countryID.length; i++) {
                    const country = await Country.findAll({where : {
                        id: obj.countryID[i]
                    }})
                    if(country){
                        await addActivity.addCountries(country)
                    } 
                }
                res.status(200).send(addActivity)
            }else {
                res.status(404).send("Ya existe una actividad con ese nombre")
            }
        }else {
            res.status(404).send('Te falta llenar algunos campos')
        }
    } catch (error) {
        res.status(404).send(error)
    }
}


module.exports={newActivity}


