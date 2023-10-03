const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Carregue o seu arquivo swagger.json aqui
const json = require('json-serializer');
const math = require('mathjs');

const app = express();
const PORT = process.env.PORT || 80;
const IP = '0.0.0.0';

app.use((req, res, next) => {
  res.json = (data) => {
    const jsonData = json.serialize(data);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.send(jsonData);
  };
  next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

class ConvertDays {
  get(days) {
    try {
      let x = days;

      let ano = Math.floor(x / 365);
      x %= 365;

      let mes = Math.floor(x / 30);
      x %= 30;

      let dia = x;

      this.response_data = {
        dia: dia,
        mes: mes,
        ano: ano,
      };
    } catch (e) {
      this.error = e.toString();
    }
  }
}

class Potencia {
  get(num1, num2) {
    this.resultado = num1 ** num2;
  }
}

class RaizQuadrada {
  get(num) {
    if (num < 0) {
      this.response_data = {
        error: 'Não é possível calcular a raiz quadrada de um número negativo',
      };
    } else {
      this.resultado = Math.sqrt(num);
    }
  }
}

class CalcularSalario {
  get(funcionario, hora, salario) {
    const salarioTotal = hora * salario;
    this.response_data = {
      'Funcionario: ': funcionario,
      'Salario : ': `U$ ${salarioTotal.toFixed(2)}`,
    };
  }
}

class IsPrime {
  get(number) {
    if (number <= 1) {
      this.resposta = { 'O número não é primo': number };
    } else if (number <= 3) {
      this.resposta = { 'O número é primo': number };
    } else {
      if (number % 2 === 0 || number % 3 === 0) {
        this.resposta = { 'O número não é primo': number };
      } else {
        let i = 5;
        while (i * i <= number) {
          if (number % i === 0 || number % (i + 2) === 0) {
            this.resposta = { 'O número não é primo': number };
            return;
          }
          i += 6;
        }
        this.resposta = { 'O número é primo': number };
      }
    }
  }
}

class Bhaskara {
  get(a, b, c) {
    const aInt = parseInt(a);
    const bInt = parseInt(b);
    const cInt = parseInt(c);
    const delta = bInt ** 2 - 4 * aInt * cInt;

    if (delta < 0) {
      const equacao = `${aInt}x² + ${bInt}x + ${cInt}`;
      this.resposta = { 'Os coeficientes não possuem raízes reais': equacao };
    } else {
      const x1 = (-bInt + Math.sqrt(delta)) / (2 * aInt);
      const x2 = (-bInt - Math.sqrt(delta)) / (2 * aInt);
      this.resposta = { X1: x1, X2: x2 };
    }
  }
}

const convertDays = new ConvertDays();
const potencia = new Potencia();
const raizQuadrada = new RaizQuadrada();
const calcularSalario = new CalcularSalario();
const isPrime = new IsPrime();
const bhaskara = new Bhaskara();

app.get('/api/convert_days/:days', (req, res) => {
  convertDays.get(parseInt(req.params.days));
  if (convertDays.error) {
    res.status(400).json({ error: convertDays.error });
  } else {
    res.json(convertDays.response_data);
  }
});

app.get('/api/potencia/:num1/:num2', (req, res) => {
  potencia.get(parseInt(req.params.num1), parseInt(req.params.num2));
  res.json({ 'O resultado do cálculo de potência é: ': potencia.resultado });
});

app.get('/api/raiz_quadrada/:num', (req, res) => {
  raizQuadrada.get(parseInt(req.params.num));
  if (raizQuadrada.response_data) {
    res.json(raizQuadrada.response_data);
  } else {
    res.json({ 'O resultado do cálculo de Raiz Quadrada é: ': raizQuadrada.resultado });
  }
});

app.get('/api/calcular_salario/:funcionario/:hora/:salario', (req, res) => {
  calcularSalario.get(
    parseInt(req.params.funcionario),
    parseFloat(req.params.hora),
    parseFloat(req.params.salario)
  );
  res.json(calcularSalario.response_data);
});

app.get('/api/primo/:number', (req, res) => {
  isPrime.get(parseInt(req.params.number));
  res.json(isPrime.resposta);
});

app.get('/api/bhaskara/:a/:b/:c', (req, res) => {
  bhaskara.get(req.params.a, req.params.b, req.params.c);
  res.json(bhaskara.resposta);
});

app.listen(PORT, IP, () => {
  console.log(`Servidor está rodando em: http://${IP}:${PORT}`);
});

