function scrollCarousel(carouselId, amount) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;

    // Trava para evitar que cliques muito rápidos quebrem a ordem dos cards
    if (carousel.classList.contains('is-animating')) return;
    carousel.classList.add('is-animating');

    const cards = carousel.querySelectorAll('.material-card');
    if (cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth + 20; 

    if (amount > 0) {
        // 1. Rola suavemente para a frente
        carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });

        // 2. Espera a animação terminar e move o primeiro card para o final da fila secretamente
        setTimeout(() => {
            carousel.style.scrollSnapType = 'none'; // Desliga o ímã do CSS
            carousel.appendChild(cards[0]);
            carousel.scrollLeft -= cardWidth; // Compensa o espaço instantaneamente
            
            // Religa o ímã e libera novos cliques
            setTimeout(() => {
                carousel.style.scrollSnapType = 'x mandatory';
                carousel.classList.remove('is-animating');
            }, 50);
        }, 400); 
        
    } else {
        // 1. Antes de rolar, joga o último card para o início
        carousel.style.scrollSnapType = 'none';
        const lastCard = cards[cards.length - 1];
        carousel.insertBefore(lastCard, cards[0]);
        carousel.scrollLeft += cardWidth; // Ajusta a tela pra esconder a troca

        // 2. Rola suavemente para trás
        requestAnimationFrame(() => {
            carousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
            
            // Religa o ímã e libera novos cliques
            setTimeout(() => {
                carousel.style.scrollSnapType = 'x mandatory';
                carousel.classList.remove('is-animating');
            }, 400);
        });
    }
}





// ======================================================
// BANCO DE DADOS LOCAL
// ======================================================

function getUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function getEmpresas() {
    return JSON.parse(localStorage.getItem("empresas")) || [];
}

function salvarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function salvarEmpresas(empresas) {
    localStorage.setItem("empresas", JSON.stringify(empresas));
}


// ======================================================
// MOSTRAR / ESCONDER SENHA
// ======================================================

function toggleSenha(id) {

    const campo = document.getElementById(id);

    if (!campo) return;

    if (campo.type === "password") {
        campo.type = "text";
    } else {
        campo.type = "password";
    }
}


// ======================================================
// CADASTRO DE USUÁRIO
// ======================================================

function cadastrarUsuario() {

    const nome = document.getElementById("nome").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const telefone = document.getElementById("telefone").value.trim();
    const cep = document.getElementById("cep").value.trim();
    const cidadeEstado = document.getElementById("cidadeEstado").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const senha = document.getElementById("senha").value;
    const foto = document.getElementById("foto").value.trim();
    const confirmaSenha = document.getElementById("confirma-senha").value;

    if (
        !nome ||
        !cpf ||
        !email ||
        !telefone ||
        !cep ||
        !cidadeEstado ||
        !endereco ||
        !senha ||
        !foto ||
        !confirmaSenha
    ) {
        alert("Preencha todos os campos.");
        return;
    }

    if (senha !== confirmaSenha) {
        alert("As senhas não coincidem.");
        return;
    }

    const usuarios = getUsuarios();
    const empresas = getEmpresas();

    const emailExiste =
        usuarios.some(usuario => usuario.email === email) ||
        empresas.some(empresa => empresa.email === email);

    if (emailExiste) {
        alert("Este e-mail já está cadastrado.");
        return;
    }

    const cpfExiste = usuarios.some(usuario => usuario.cpf === cpf);

    if (cpfExiste) {
        alert("Este CPF já está cadastrado.");
        return;
    }

    const novoUsuario = {
        id: Date.now(),
        tipo: "usuario",
        nome,
        cpf,
        email,
        telefone,
        cep,
        cidadeEstado,
        endereco,
        senha,
        foto
    };

    usuarios.push(novoUsuario);

    salvarUsuarios(usuarios);

    alert("Cadastro realizado com sucesso!");

    window.location.href = "login.html";
}


// ======================================================
// CADASTRO DE EMPRESA
// ======================================================

function cadastrarEmpresa() {

    const razaoSocial = document.getElementById("razaoSocial").value.trim();
    const cnpj = document.getElementById("cnpj").value.trim();
    const responsavel = document.getElementById("responsavel").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const telefone = document.getElementById("telefone").value.trim();
    const cep = document.getElementById("cep").value.trim();
    const cidadeEstado = document.getElementById("cidadeEstado").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const senha = document.getElementById("senha").value;
    const foto = document.getElementById("foto").value.trim();
    const confirmaSenha = document.getElementById("confirma-senha").value;

    if (
        !razaoSocial ||
        !cnpj ||
        !responsavel ||
        !email ||
        !telefone ||
        !cep ||
        !cidadeEstado ||
        !endereco ||
        !senha ||
        !foto ||
        !confirmaSenha
    ) {
        alert("Preencha todos os campos.");
        return;
    }

    if (senha !== confirmaSenha) {
        alert("As senhas não coincidem.");
        return;
    }

    const usuarios = getUsuarios();
    const empresas = getEmpresas();

    const emailExiste =
        usuarios.some(usuario => usuario.email === email) ||
        empresas.some(empresa => empresa.email === email);

    if (emailExiste) {
        alert("Este e-mail já está cadastrado.");
        return;
    }

    const cnpjExiste = empresas.some(empresa => empresa.cnpj === cnpj);

    if (cnpjExiste) {
        alert("Este CNPJ já está cadastrado.");
        return;
    }

    const novaEmpresa = {
        id: Date.now(),
        tipo: "empresa",
        razaoSocial,
        cnpj,
        responsavel,
        email,
        telefone,
        cep,
        cidadeEstado,
        endereco,
        senha,
        foto
    };

    empresas.push(novaEmpresa);

    salvarEmpresas(empresas);

    alert("Empresa cadastrada com sucesso!");

    window.location.href = "login.html";
}


// ======================================================
// LOGIN
// ======================================================

function fazerLogin(email, senha, tipo) {

    email = email.trim().toLowerCase();

    let conta = null;

    if (tipo === "usuario") {

        const usuarios = getUsuarios();

        conta = usuarios.find(usuario =>
            usuario.email === email &&
            usuario.senha === senha
        );

    } else if (tipo === "empresa") {

        const empresas = getEmpresas();

        conta = empresas.find(empresa =>
            empresa.email === email &&
            empresa.senha === senha
        );
    }

    if (!conta) {
        return false;
    }

    localStorage.setItem(
        "usuarioLogado",
        JSON.stringify(conta)
    );
    
    return true;
}


// ======================================================
// INICIALIZAÇÃO
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    carregarFotoPerfil();

    // ------------------------------------------
    // OLHO DA SENHA
    // ------------------------------------------

    document.querySelectorAll(".eye-icon").forEach(function (icone) {

        const alvo = icone.dataset.target;

        if (!alvo) return;

        icone.addEventListener("click", function () {
            toggleSenha(alvo);
        });

    });


    // ------------------------------------------
    // CADASTRO DE USUÁRIO
    // ------------------------------------------

    const formCadastroUsuario =
        document.getElementById("formCadastroUsuario");

    if (formCadastroUsuario) {

        formCadastroUsuario.addEventListener("submit", function (event) {

            event.preventDefault();

            cadastrarUsuario();

        });
    }


    // ------------------------------------------
    // CADASTRO DE EMPRESA
    // ------------------------------------------

    const formCadastroEmpresa =
        document.getElementById("formCadastroEmpresa");

    if (formCadastroEmpresa) {

        formCadastroEmpresa.addEventListener("submit", function (event) {

            event.preventDefault();

            cadastrarEmpresa();

        });
    }


    // ------------------------------------------
    // LOGIN DO USUÁRIO
    // ------------------------------------------

    const formLoginUsuario =
        document.getElementById("formLoginUsuario");

    if (formLoginUsuario) {

        formLoginUsuario.addEventListener("submit", function (event) {

            event.preventDefault();

            const email =
                document.getElementById("emailUsuario").value;

            const senha =
                document.getElementById("senhaUsuario").value;

            const sucesso =
                fazerLogin(email, senha, "usuario");
    

            if (sucesso) {

                alert("Sucesso ao logar");
               

            } else {

                alert("E-mail ou senha incorretos.");

            }

        });
    }


    // ------------------------------------------
    // LOGIN DA EMPRESA
    // ------------------------------------------

    const formLoginEmpresa =
        document.getElementById("formLoginEmpresa");

    if (formLoginEmpresa) {

        formLoginEmpresa.addEventListener("submit", function (event) {

            event.preventDefault();

            const email =
                document.getElementById("emailEmpresa").value;

            const senha =
                document.getElementById("senhaEmpresa").value;

            const sucesso =
                fazerLogin(email, senha, "empresa");
                

            if (sucesso) {

                alert("Sucesso ao logar");
                

            } else {

                alert("E-mail ou senha incorretos.");

            }

        });
    }

});

function carregarFotoPerfil() {
    const dados = localStorage.getItem("usuarioLogado");

    if (!dados) return;

    const usuario = JSON.parse(dados);

    const profilePic = document.getElementById("profilePic");

    if (!profilePic) return;

    if (usuario.foto) {
        profilePic.src = usuario.foto;
    }
}