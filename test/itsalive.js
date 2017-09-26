const expect = require('chai').expect;

describe('basic addition', function(){
    it('sums two numbers correctly', function(){
        let result = 2 + 2;
        expect(result).to.equal(4);
    });
});

describe('Testing asynchronous timeout', function(){
    it('SetTimeout Method wait for 1 second', function(done){
        let start = new Date();
        setTimeout(function(){
            let duration = new Date() - start;
            expect(duration).to.be.closeTo(1000, 50);
            done();
        }, 1000);
    });
});

