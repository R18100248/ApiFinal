const request = require("supertest");
const url = "http://localhost:8082";

describe('Testear GET a la ruta de productosAlimenticios2 con CALLBACK', ()=>
{
    it("Debería regresar código 200",()=>
    {
        request(url)
        .get('/productosAlimenticios2')
        .end(function(err,res)
        {
            expect(res.statusCode).toBe(200);
        });
    });
});

describe('Testear GET a la ruta de productosAlimenticios con CALLBACK ASYNC-AWAIT', ()=>
{
    it("Debería regresar código 200", async ()=>
    {
        let response = await request(url).get('/productosAlimenticios2')
        expect(response.statusCode).toBe(200);
    })
})