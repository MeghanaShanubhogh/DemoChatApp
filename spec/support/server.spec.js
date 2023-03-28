var request = require('request');

describe("Calculator",()=>{
    it('should multiply',()=>{
        expect(2*2).toBe(4);
    });
});
describe("get messages",()=>{
    it('Should should return 200 OK',(done)=>
    {
        request.get('http://localhost:4000/messages',(err,res)=>{
            console.log(res);
            expect(res.statusCode).toEqual(200);
            done();
        });
    });
    it('Should return list non empty',(done)=>
    {
        request.get('http://localhost:4000/messages',(err,res)=>{
            console.log(res);
            expect(res.body.length).toBeGreaterThan(0);
            done();
        });
    });
    it('Should return hi body',(done)=>
    {
        request.get('http://localhost:4000/messages/hi',(err,res)=>{
            console.log(res);
            expect(JSON.parse(res.body)[0].name).toEqual('hi');
            done();
        });
    });
});