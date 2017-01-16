global.DATABASE_URL = 'mongodb://localhost/app-test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');
var Item = require('../models/item');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);


describe('App', function() {
  before(function(done) {
    server.runServer(function() {
      Item.create({'_id': '1',
        'item': { 
          "price" : "4.42", 
          "name" : "beer",
          "category":"111aaa" 
        }}, 
        function() {
          done();
      });
    });
  });

    it('should return 200', function(done) {
        chai.request(app)
            .get('/category/111aaa')
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });	
    });

   //  it('should return 201 on post', function(done) {
   //     chai.request(app)
   //     .post('/b')
   //     .send({'_id': '1',
   //      'items': [{ "price" : "4.42", "item" : "beer" }], 
   //      'name': 'Foo'})
   //     .end(function(err, res) {
   //     		res.should.have.status(201);
   //          done();
   //     });
   // });

    after(function(done) {
    Item.remove(function() {
      done();
    });
  });
});


// exports.app = app;




    
