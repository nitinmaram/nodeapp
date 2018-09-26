const app = require('./app.js');
var assert = require('assert');
const chai =  require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

describe("Reading file content from disk api test cases",function(){
  it('When no file str is passed as command line argument',function(done) {
      chai.request(app).get(`/readFile`).end(function(err,res){
             expect(res).to.have.status(404);
             expect(res.text).to.equal(`Not Found`);
             done();
           })
      })
})

describe("Product api test cases",function(){
  it('Inputs must be numbers',function(done) {
    chai.request(app).get(`/product/x/y`).end(function(err,res){
           expect(res).to.have.status(404);
           expect(res.text).to.equal('Not Found');
           done();
         })
    })

    it('When no Inputs are passed',function(done) {
        chai.request(app).get(`/product`).end(function(err,res){
               expect(res).to.have.status(404);
               expect(res.text).to.equal(`<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>Error</title>\n</head>\n<body>\n<pre>Cannot GET /product</pre>\n</body>\n</html>\n`);
               done();
             })
        })

  it('Get the product of 2 numbers',function(done) {
    chai.request(app).get(`/product/2/3`).end(function(err,res){
         expect(res).to.have.status(200);
         expect(res.text).to.equal(`6`);
         done();
       })
  })
})

describe("1st non repitative character api test cases",function(){
   it('When no Input is passed',function(done) {
       chai.request(app).get(`/string`).end(function(err,res){
              expect(res).to.have.status(404);
              expect(res.text).to.equal(`<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>Error</title>\n</head>\n<body>\n<pre>Cannot GET /string</pre>\n</body>\n</html>\n`);
              done();
            })
       })
       it('When Input is a number',function(done) {
           chai.request(app).get(`/string/123`).end(function(err,res){
                  expect(res).to.have.status(404);
                  expect(res.text).to.equal(`Not Found`);
                  done();
                })
           })
    it('Print the 1st non repitative character',function(done) {
      chai.request(app).get(`/string/nitin`).end(function(err,res){
            expect(res.text).to.equal(`t`);
            expect(res.status).to.equal(200);
            done();
         })
    })
  })

  describe("writing file content to the disk api test cases",function(){
    it('When no Content is passed',function(done) {
        chai.request(app).get(`/writeFile`).end(function(err,res){
               expect(res).to.have.status(404);
               expect(res.text).to.equal(`<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>Error</title>\n</head>\n<body>\n<pre>Cannot GET /writeFile</pre>\n</body>\n</html>\n`);
               done();
             })
        })
      it('Writing content to the local file',function(done) {
        chai.request(app).get('/writeFile/sample text to be written in output file').end(function(err,res){
            expect(res.status).to.equal(200);
            expect(res.text).to.equal(`sample_output.txt created`);
            done();
         })
    })
  })
