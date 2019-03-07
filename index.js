const qs = require('querystring');
const http = require('http');

let data = {
    'relaxation': process.argv[2],
    'tipoCEP': 'ALL',
    'semelhante': 'N'

};

const par = {
    'method': 'POST',
    'hostname': 'www.buscacep.correios.com.br',
    'path': '/sistemas/buscacep/resultadoBuscaCepEndereco.cfm',
    'headers': {
        'content-type': 'application/x-www-form-urlencoded'
    }
};

const req = http.request(par, function (httpResponse) {
    let response = [];

    httpResponse.on('data', function (res) {
        response.push(res);

    });

    httpResponse.on('end', function () {
        let body = Buffer.concat(response);
        let html = body.toString('latin1');
        let regularExpression = /(?:<td.*?>)(.*?)(?:<\/td>)/g

        let result = [];
        let m;

        while((m = regularExpression.exec(html)) !== null){
            result.push(m[1].replace('&nbsp;',''));
        }
       console.log(`logradouro... ${result[0]}`);
       console.log(`Bairro....... ${result[1]}`);
       console.log(`Cidade/UF:... ${result[2]}`);
       console.log(`CEP:......... ${result[3]}`);
    });

});
req.write(qs.stringify(data));
req.end();
