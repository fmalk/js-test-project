const chai = require('chai');
const moment = require('moment');
const index = require('../index');
const Hotel = index.Hotel;
const expect = chai.expect;

describe('buscaPrece', function() {
   it('Basico', function() {
       const hotel = new Hotel('Hotel', 4);
       hotel.setPrice(true, true, 100);
       hotel.setPrice(true, false, 80);
       hotel.setPrice(false, true, 200);
       hotel.setPrice(false, false, 150);

       // fim de semana
       expect(hotel.buscaPreco(true, moment('2021-02-20'))).to.be.equal(200);

       // dia de semana
       expect(hotel.buscaPreco(false, moment('2021-02-19'))).to.be.equal(80);
   });
});

describe('trataInput', function() {
    it('Basico', function() {
        const texto = 'Regular: 16Mar2020(mon), 17Mar2020(tues), 18Mar2020(wed)';
        const resultado = index.trataEntrada(texto);
        expect(resultado).to.be.an('object');
        expect(resultado.tipo).to.be.equal('Regular');
        expect(resultado.datas.length).to.be.equal(3);
    })
})

describe('Checagem inicial', function () {
    it('Entrada #1', function () {
        const resultado = index.start('Regular: 16Mar2020(mon), 17Mar2020(tues), 18Mar2020(wed)');
        expect(resultado).to.be.equal('Parque das flores');
    });

    it('Entrada #2', function () {
        const resultado = index.start('Regular: 20Mar2020(fri), 21Mar2020(sat), 22Mar2020(sun)');
        expect(resultado).to.be.equal('Jardim Botânico');
    })

    it('Entrada #3', function () {
        const resultado = index.start('Fidelidade: 26Mar2020(thur), 27Mar2020(fri), 28Mar2020(sat)');
        expect(resultado).to.be.equal('Mar Atlântico');
    })
});