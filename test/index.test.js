
const app = require("../index");
const chai = require("chai");
const request = require("supertest");

const expect = chai.expect;

describe("Check if exist endpoints", function () {

  this.timeout(15000);

  it("GET /client/find-by-name Should return 200 OK", async function () {

    const response = await request('http://localhost:3000/api')
      .get("/client/find-by-name")
      .send({name: "1"})
      .expect(200)
      .expect("Content-Type", /json/);

  });

  it("GET /client/find-by-state Should return 200 OK", async function () {

    const response = await request('http://localhost:3000/api')
      .get("/client/find-by-state")
      .send({state: "1"})
      .expect(200)
      .expect("Content-Type", /json/);

  });

  it("GET /members Should return 200 OK", async function () {

    const response = await request('http://localhost:3000/api')
      .get("/member")
      .expect(200)
      .expect("Content-Type", /json/);

  });

  it("GET /note Should return 200 OK", async function () {

    const response = await request('http://localhost:3000/api')
      .get("/note")
      .expect(200)
      .expect("Content-Type", /json/);

  });

});