window.onload = function(){

    const limparFormulario = (endereco) =>{
        document.querySelector("#rua").value = "";
        document.querySelector("#bairro").value = "";
        document.querySelector("#cidade").value = "";
        document.querySelector("#estado").value = "";
    }

    const preencherFormulario = (endereco) =>{        
        document.querySelector("#rua").value = endereco.logradouro;
        document.querySelector("#bairro").value = endereco.bairro;
        document.querySelector("#cidade").value = endereco.localidade;
        document.querySelector("#estado").value = endereco.uf;
    }

    const eNumero = (numero) => /^[0-9]+$/.test(numero);

    const cepValido = (cep) => cep.length == 8 && eNumero(cep);

    const pesquisarCep = async() => {
        limparFormulario();

        const cep = document.querySelector("#cep").value;
        let url = `https://viacep.com.br/ws/${cep}/json/`;

        if(cepValido(cep)){
            const dados = await fetch(url);
            const endereco = await dados.json();

            if(endereco.hasOwnProperty('erro')){
                document.querySelector("#rua").value = (`O Cep: ${cep} não foi encontrado! 
                Por favor digite outro.`)
                return;
            } else {
                preencherFormulario(endereco);
            }
        } else {
            document.querySelector("#rua").value = 'CEP digitado incorretamente!';
        }
    }

    const cep = document.querySelector("#cep");
    const botao = document.querySelector("#buscar");
    botao.addEventListener('click', pesquisarCep);
}
