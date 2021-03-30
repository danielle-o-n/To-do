window.addEventListener('load', start); // adiciona evento para carregar a pagina primeiro
    var input1 = null; //declara a variavel para ter acesso dela fora da função
    var lista = ["Danielle", "Rosilene", "Davilene", "Gabriel"]
    var inEditando = null;
    var indexAtual = null;

function start () {
    console.log("ok");
    input1 = document.querySelector('#input1')
    ativandoInput(); // chama a função
    renderiza()
}

function ativandoInput() {
    function inserindoNome(nome) {
        lista.push(nome) // insere o novo nome no array
        renderiza()
        
        console.log(lista);
    }

    function novoNome(valorAtualizado) {
        lista[indexAtual] = valorAtualizado // atribui novo valor no mesmo indice do array
        
    }

    function precionaEnter(event) { // função ao precionar a tecla enter
        if(event.key === 'Enter'){ 
            if(inEditando){
                console.log("entrou");
                novoNome(event.target.value);
                renderiza()
                input1.value="";
            }else{
                inserindoNome(event.target.value)
                input1.value=""; // limpa input
            }
            inEditando = false; // volta para a condição de atribuição
        }
    }
    input1.focus(); // destaca o campo de digitação
    input1.addEventListener('keyup', precionaEnter)
}

function renderiza() {
    function editandoNome(nome, index) {
        function editar() {
            indexAtual = index
            input1.value = nome // adiciona o nome que ira ser editado no input
            input1.focus(); 
            inEditando = true // ao apertar enter  ira entrar na condição de edição
        }
        var botaoEditar = document.createElement('button')
        botaoEditar.textContent = "Editar"
        botaoEditar.addEventListener('click', editar)
        return botaoEditar;
    }
    function criaBotaoDelete(index) { // função que cria o botão passando o indice da li como parametro
        function deletaNome() {
            lista.splice(index, 1); // remove 1 elemento do index passado ( cada index possui 1 li )
            renderiza(); // chama função para atualizar
        }
        var botao = document.createElement('button')
        botao.textContent = "X"
        botao.classList.add("xis")
        botao.addEventListener('click', deletaNome)
        return botao; 
    }
    var div = document.querySelector(".lista");
    div.innerHTML= ""; // limpa div
    var ul = document.createElement("ul")
    for (var i = 0; i< lista.length; i ++) { 
        var nome = lista[i];
        var li = document.createElement('li'); // cria li para cada nome
        var botao = criaBotaoDelete(i); // botao é a função que retorna o botão ( passando o indice da li como parametro)
        li.textContent = nome;
        li.appendChild(botao);
        var botaoEditar = editandoNome(nome , i); // passa nome e indice como parametros para a função
        li.appendChild(botaoEditar)
        ul.appendChild(li)
    }

    div.appendChild(ul)
}