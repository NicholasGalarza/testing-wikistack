const expect = require('chai').expect;
const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

describe('basic addition', function() {
  it('sums two numbers correctly', function() {
    let result = 2 + 2;
    expect(result).to.equal(4);
  });
});

describe('Testing asynchronous timeout', function() {
  it('SetTimeout Method wait for 1 second', function(done) {
    let start = new Date();
    setTimeout(function() {
      let duration = new Date() - start;
      expect(duration).to.be.closeTo(1000, 50);
      done();
    }, 1000);
  });
});

describe('Using Spy', () => {



  // let obj = {
  //   foobar: function() {
  //     console.log('foo');
  //     return 'bar';
  //   }
  // }
  // console.log();
  //chai.spy.on(obj, 'foobar');


  it('should call foobar() exactly 3 times', function() {
    let arr = [1, 2, 3];


    let obj = {
      foobar: function() {
        console.log('foo');
        return 'bar';
      }
    }

    let spy = chai.spy(obj.foobar);
    arr.forEach(spy);
    expect(spy).to.have.been.called.exactly(3);
  });

});
