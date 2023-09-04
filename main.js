const cep = document.querySelector("#cep");     // Obtém referência ao campo 'cep'

// Declara uma função com ASYNC / AWAIT
async function buscaEndereco (cep) {

    const mensagemErro = document.querySelector("#erro");      // Obtém referência ao elemento 'erro'
    mensagemErro.innerHTML = "";                               // Inicia com uma mensagem vazia

    try {

        const consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);     // Obtém a API de consulta CEP

        const consultaCEPConvertida = await consultaCEP.json();     // Converte os dados obtidos em Json

        if (consultaCEPConvertida.erro) {           // Se o CEP for inválido, apresenta uma mensagem de erro no console
            throw Error("CEP não encontrado!");
        }

        // Obtém elementos do form
        const endereco = document.querySelector("#endereco");
        const complemento = document.querySelector("#complemento");
        const bairro = document.querySelector("#bairro");
        const cidade = document.querySelector("#cidade");
        const estado = document.querySelector("#estado");

        // Atribui valores aos campos do form de acordo com o CEP
        endereco.value = consultaCEPConvertida.logradouro;
        complemento.value = consultaCEPConvertida.complemento;
        bairro.value = consultaCEPConvertida.bairro;
        cidade.value = consultaCEPConvertida.localidade;
        estado.value = consultaCEPConvertida.uf;
        
        console.log(consultaCEPConvertida);

        return consultaCEPConvertida;

    } catch (erro) {

        mensagemErro.innerHTML = `<p>CEP Inválido. Tente Novamente!</p>`;      // Imprime uma mensagem de alerta para o usuário caso o CEP seja inválido

        console.log(erro);

    }

};

cep.addEventListener("focusout", () => buscaEndereco(cep.value));