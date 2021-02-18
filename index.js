const moment = require('moment');

class Hotel {
    constructor(nome, classificacao) {
        this.nome = nome;
        this.wday_regular = 0;
        this.wday_fidelidade = 0;
        this.wend_regular = 0;
        this.wend_fidelidade = 0;
        this.classificacao = classificacao;
    }

    setPrice(is_wday, is_regular, price) {
        if (is_regular) {
            if (is_wday)
                this.wday_regular = price;
            else
                this.wend_regular = price;
        } else {
            if (is_wday)
                this.wday_fidelidade = price;
            else
                this.wend_fidelidade = price;
        }
    }

    buscaPreco(is_regular, data) {
        const is_weekend = data.day() === 0 || data.day() === 6;
        if (is_weekend) {
            if (is_regular) return this.wend_regular
            else return this.wend_fidelidade
        } else {
            if (is_regular) return this.wday_regular
            else return this.wday_fidelidade
        }
    }
}

const hotel1 = new Hotel('Parque das Flores', 3);
const hotel2 = new Hotel('Jardim Botanico', 4);
const hotel3 = new Hotel('Mar Atlantico', 5);

const trataEntrada = (input) => {
    const first = input.split(':');
    const tipo = first[0];
    let second = first[1].split(',');
    second = second.map((str) => {
        str = str.trim();
        return moment(str, 'DDMMMYYYY');
    });
    return {
        tipo,
        datas: second
    }
}


const start = (input) => {
    const argumentos = trataEntrada(input);
    const is_regular = argumentos.tipo === 'Regular';
    const datas = argumentos.datas;

    let preco1, preco2, preco3;

    datas.forEach(d => {
        preco1 = hotel1.buscaPreco(is_regular, d);
        preco2 = hotel2.buscaPreco(is_regular, d);
        preco3 = hotel3.buscaPreco(is_regular, d);
    });

    const valores = [preco1, preco2, preco3];

    let min_valor = 1000;
    let min_index = -1;
    valores.forEach( (valor, idx) => {
        if (valor < min_valor) {
            min_valor = valor;
            min_index = idx;
        }
    });
    switch (min_index) {
        case 1:
            return 'Parque das Flores';
        case 2:
            return 'Jardim Botanico';
        case 3:
            return 'Mar Atlantico';
    }
}

module.exports = {
    start,
    trataEntrada,
    Hotel
};