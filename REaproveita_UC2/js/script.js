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

let produtoAtual = null;

const dadosProdutos = {
    1: {
        titulo: "Fardos de Papelão", tipo: "kg", pesoUnitario: 1200, textoPeso: "📦 1200kg por fardo", local: "📍 Campinas, SP",
        precoTexto: "R$ 0,50/kg", precoNum: 0.50, vendedor: "Irani Reciclagem", avaliacao: "⭐ 4.8 (150 vendas)", 
        fotoVendedor: "imagens/irani.png", imgPrincipal: "imagens/fardoPapelão.jpg",
        thumbs: ["imagens/fardoPapelão.jpg", "imagens/fardoPapelão2.jpg", "imagens/fardoPapelão3.jpg"]
    },
    2: {
        titulo: "Lacres de Alumínio", tipo: "kg", pesoUnitario: 1500, textoPeso: "📦 1500kg por lote", local: "📍 São José, SC",
        precoTexto: "R$ 0,25/kg", precoNum: 0.25, vendedor: "Ball Corporation", avaliacao: "⭐ 5.0 (320 vendas)", 
        fotoVendedor: "imagens/ballCorporation.png", imgPrincipal: "imagens/lacreAluminio.jpg",
        thumbs: ["imagens/lacreAluminio.jpg", "imagens/lacreAluminio2.jpg", "imagens/lacreAluminio3.jpg"]
    },
    3: {
        titulo: "Garrafas PET", tipo: "kg", pesoUnitario: 800, textoPeso: "📦 800kg por lote", local: "📍 Belo Horizonte, MG",
        precoTexto: "R$ 0,80/kg", precoNum: 0.80, vendedor: "PackPet", avaliacao: "⭐ 4.7 (89 vendas)", 
        fotoVendedor: "imagens/packPet.png", imgPrincipal: "imagens/garrafasPet.jpg",
        thumbs: ["imagens/garrafasPet.jpg", "imagens/garrafasPet2.jpg", "imagens/garrafasPet3.jpg"]
    },
    4: {
        titulo: "Ecobag REaproveita!", tipo: "unidade", textoPeso: "📦 348 unidades disponíveis", local: "📍 São Paulo, SP",
        precoTexto: "R$ 35,00", precoNum: 35.00, vendedor: "REaproveita!", avaliacao: "⭐ 4.9 (410 vendas)", 
        fotoVendedor: "imagens/logoTeste.jpg", imgPrincipal: "imagens/ecobag.jpg",
        thumbs: ["imagens/ecobag.jpg", "imagens/ecobag2.jpg", "imagens/ecobag3.jpg"]
    },
    5: {
        titulo: "Vaso de Planta Reciclado", tipo: "unidade", textoPeso: "📦 100 unidades disponíveis", local: "📍 Aparecida de Goiania, GO",
        precoTexto: "R$ 24,99", precoNum: 24.99, vendedor: "José Evanil Santana", avaliacao: "⭐ 4.6 (230 vendas)", 
        fotoVendedor: "imagens/vôZé.jpg", imgPrincipal: "imagens/vasoPlanta.jpg",
        thumbs: ["imagens/vasoPlanta.jpg", "imagens/vasoPlant2.jpg", "imagens/vasoPlanta3.jpg"]
    },
    6: {
        titulo: "Jogo das Varetas", tipo: "unidade", textoPeso: "📦 2 unidades disponíveis", local: "📍 Rio de Janeiro, RJ",
        precoTexto: "R$ 25,00", precoNum: 25.00, vendedor: "Professor Jefferson Almeida", avaliacao: "⭐ 4.9 (110 vendas)", 
        fotoVendedor: "imagens/professor.jpg", imgPrincipal: "imagens/bolinhaPalito.jpg",
        thumbs: ["imagens/bolinhaPalito.jpg", "imagens/bolinhaPalito2.jpg", "imagens/bolinhaPalito3.jpg"]
    }
};

function abrirModal(idProduto, event) {
    event.preventDefault();
    produtoAtual = dadosProdutos[idProduto];
    
    document.getElementById('input-qtd').value = 1;
    document.getElementById('modal-img-principal').src = produtoAtual.imgPrincipal;
    document.getElementById('modal-title').innerText = produtoAtual.titulo;
    document.getElementById('modal-peso').innerText = produtoAtual.textoPeso;
    document.getElementById('modal-local').innerText = produtoAtual.local;
    document.getElementById('modal-seller-name').innerText = produtoAtual.vendedor;
    document.getElementById('modal-seller-rating').innerText = produtoAtual.avaliacao;
    document.getElementById('modal-seller-pic').src = produtoAtual.fotoVendedor;
    
    atualizarTotal();
    
    const thumbsContainer = document.getElementById('modal-thumbnails');
    thumbsContainer.innerHTML = ''; 
    
    produtoAtual.thumbs.forEach(thumbSrc => {
        const img = document.createElement('img');
        img.src = thumbSrc;
        img.onclick = () => document.getElementById('modal-img-principal').src = thumbSrc;
        thumbsContainer.appendChild(img);
    });

    document.getElementById('modal-detalhes').style.display = 'flex';
}

function mudarQtd(delta) {
    const input = document.getElementById('input-qtd');
    let atual = parseInt(input.value) || 1;
    atual += delta;
    if (atual < 1) atual = 1;
    input.value = atual;
    atualizarTotal();
}

function atualizarTotal() {
    const qtd = parseInt(document.getElementById('input-qtd').value) || 1;
    
    // calcula diferente se for por kg (1, 2 e 3) ou por unidade (4, 5 e 6)
    if (produtoAtual.tipo === 'kg') {
        const totalKg = qtd * produtoAtual.pesoUnitario;
        const precoTotal = totalKg * produtoAtual.precoNum;
        const formatadoTotal = precoTotal.toFixed(2).replace('.', ',');
        
        document.getElementById('modal-price').innerHTML = `${produtoAtual.precoTexto} <span>(Total: R$ ${formatadoTotal} - ${totalKg}kg)</span>`;
    } else {
        const precoTotal = qtd * produtoAtual.precoNum;
        const formatadoPreco = produtoAtual.precoNum.toFixed(2).replace('.', ',');
        const formatadoTotal = precoTotal.toFixed(2).replace('.', ',');
        
        document.getElementById('modal-price').innerHTML = `R$ ${formatadoPreco} <span>(Total est.: R$ ${formatadoTotal})</span>`;
    }
}

function selecionarPagamento(elemento) {
    document.querySelectorAll('.payment-option').forEach(el => el.classList.remove('active'));
    elemento.classList.add('active');
}

function fecharModal() {
    document.getElementById('modal-detalhes').style.display = 'none';
}

function fecharModalFora(event) {
    if (event.target.id === 'modal-detalhes') fecharModal();
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
    const foto = fotoPerfilBase64;
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
    const foto = fotoPerfilBase64;
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
    configurarUploadFotoPerfil();

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
                window.location.href = "index.html";
               

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
                window.location.href = "index.html";

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

function converterImagemParaBase64(arquivo) {
    return new Promise(function (resolve) {
        const reader = new FileReader();
        reader.onload = function (event) {
            resolve(event.target.result);
        };
        reader.readAsDataURL(arquivo);
    });
}

let fotoPerfilBase64 = null;

function configurarUploadFotoPerfil() {
    const inputFoto = document.getElementById("foto-perfil");
    const nomeArquivoSpan = document.getElementById("nome-arquivo");

    if (!inputFoto) return;

    inputFoto.addEventListener("change", async function () {
        if (inputFoto.files.length > 0) {
            const arquivo = inputFoto.files[0];
            fotoPerfilBase64 = await converterImagemParaBase64(arquivo);

            if (nomeArquivoSpan) {
                nomeArquivoSpan.textContent = arquivo.name;
            }
        }
    });
}

function getContaPorId(id) {
    const usuarios = getUsuarios();
    const empresas = getEmpresas();
    return usuarios.find(u => u.id === id) || empresas.find(e => e.id === id);
}