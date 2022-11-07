const axios = require('axios');
const { Country, Activity} = require ('../db')
const allApi = 'https://restcountries.com/v3/all'

async function cargarDB(req, res){
    const allCountries = await Country.findAll({include: Activity});
    if(!allCountries.length){
        const getData = await axios.get(allApi);
        const filterData = await getData.data?.map((e)=>{
            return {
                id: e.cca3,
                name: e.name.common,
                continent: e.continents[0],
                capital: e.capital,
                flagimg: e.flags,
                subregion: e.subregion,
                area: e.area,
                population: e.population
            }
        })
        await Country.bulkCreate(filterData);
        console.log('Se guardo la info')
    }
};

module.exports={cargarDB}