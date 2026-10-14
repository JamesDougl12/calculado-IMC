$(function () {
    const $altura = $('#altura');
    const $peso = $('#peso');
    const $calcular = $('#calcular');
    const $resultado = $('#resultado');

    function aplicarMascaraFloat(input) {
        let valor = input.val().replace(',', '.');
        valor = valor.replace(/[^\d.]/g, '');

        const partes = valor.split('.');
        if (partes.length > 2) {
            valor = partes.shift() + '.' + partes.join('');
        }

        if (valor.indexOf('.') !== -1) {
            const [inteiro, decimal] = valor.split('.');
            valor = inteiro + '.' + (decimal || '').slice(0, 2);
        }

        input.val(valor);
    }

    $altura.on('input', function () {
        aplicarMascaraFloat($(this));
    });

    $peso.on('input', function () {
        aplicarMascaraFloat($(this));
    });

    $calcular.on('click', function () {
        const altura = Number($altura.val().replace(',', '.'));
        const peso = Number($peso.val().replace(',', '.'));

        if (!altura || !peso || altura <= 0 || peso <= 0) {
            $resultado
                .removeClass('alert-info alert-success alert-warning')
                .addClass('alert-danger visible')
                .text('Informe valores válidos de altura e peso.');
            return;
        }

        const imc = peso / (altura * altura);
        let situacao = '';

        if (imc < 17) {
            situacao = 'Muito abaixo do peso';
        } else if (imc >= 17 && imc <= 18.49) {
            situacao = 'Abaixo do peso';
        } else if (imc >= 18.5 && imc <= 24.99) {
            situacao = 'Peso normal';
        } else if (imc >= 25 && imc <= 29.99) {
            situacao = 'Sobrepeso';
        } else if (imc >= 30 && imc <= 34.99) {
            situacao = 'Obesidade I';
        } else if (imc >= 35 && imc <= 39.99) {
            situacao = 'Obesidade II';
        } else {
            situacao = 'Obesidade III';
        }

        $resultado
            .removeClass('alert-danger')
            .addClass('alert-info visible')
            .html('<strong>IMC:</strong> ' + imc.toFixed(2) + '<br><strong>Situação:</strong> ' + situacao);
    });
});
