/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');
const request = require('supertest');
const { TIME, NOW } = require('sequelize');

const agent = session(app);
const country = {
  name: 'Argentina',
};

describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  // beforeEach(() => Country.sync({ force: true })
  //   .then(() => Country.create()));
  describe('GET /countries', () => {
    it('should get 200', () =>
      agent.get('/countries').expect(200)
    )});
  describe('POST /activity', ()=> {
    it('should return status 200 and activity object if the activity was succesfully created', async () => {
      const res = await request(app)
                          .post('/activity')
                          .send({name: 'Activity 01', duration: 15, season: 'Winter',difficulty: 2,countryID: ['ARG'] });
      expect(res.statusCode).to.equal(200);
      
    });
    it('should return status 404 and corresponding text if any of the mandatory parameters is not send', async () => {
      const res = await request(app).post('/activity');
      expect(res.statusCode).to.equal(404);
      expect(res.text).to.equal('Te falta llenar algunos campos');
    });
  })
});

