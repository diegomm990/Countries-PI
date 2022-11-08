const {Sequelize} = require('sequelize');
const Op = Sequelize.Op;
const { Country, Activity } = require("../db");

async function getAllCountries(req, res){
    const {name} = req.query;
    try {
        if (!name) {
          const countryAll = await Country.findAll({ include: Activity});
          res.send(countryAll);
        } else {
          
          const countryQuery = await Country.findAll({
            where: {
              name: {
                [Op.iLike]: `%${name}%`
              },
            },
            include: Activity
          });
  
          if (!countryQuery[0]) {  
            return res.status(404).json({
                error: ` no se encuentra ningun Pais con el nombre , ${name}`,
              });
          }
          return res.send(countryQuery);
        }
      } catch (error) {
        res.status(404).send(error);
      }
} 

async function getCountryById(req, res){
    const idPais = req.params.idPais.toUpperCase();
        try {
            const pais = await Country.findByPk(idPais,{
                include: Activity
            })
            return res.send(pais)
        } catch (error) {
            res.status(400).send(error)
    }
}

module.exports = {getAllCountries, getCountryById}