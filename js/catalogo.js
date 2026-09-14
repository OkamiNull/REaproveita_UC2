const filterTitles = document.querySelectorAll('.filter-title');

filterTitles.forEach(title => {
  title.addEventListener('click', () => {
    const filterGroup = title.parentElement;
    const arrow = title.querySelector('.arrow');

    filterGroup.classList.toggle('open');

    if (filterGroup.classList.contains('open')) {
      arrow.innerHTML = '&#9650;';
    } else {
      arrow.innerHTML = '&#9660;';
    }
  });
});


const btnOpenModal = document.getElementById('btnOpenModal');
const btnCloseModal = document.getElementById('btnCloseModal');
const modalAnnounce = document.getElementById('modalAnnounce');

btnOpenModal.addEventListener('click', () => {
  modalAnnounce.classList.add('active');
});

btnCloseModal.addEventListener('click', () => {
  modalAnnounce.classList.remove('active');
  resetarFormulario();
});

//NAVEGAÇÃO BÁSICA PELAS ABAS
const tabs = document.querySelectorAll('.tab-item');
const tabContents = document.querySelectorAll('.tab-content');

let stepAtual = 1; // controla em que passo o usuário está

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetStep = tab.getAttribute('data-tab'); // ex: "step-2"
    const numeroAlvo = Number(targetStep.replace('step-', ''));

    // só permite clicar em abas de passos JÁ visitados (voltar), nunca pra frente
    if (numeroAlvo > stepAtual) {
        return; // ignora o clique, não faz nada
    }

    mostrarPasso(numeroAlvo);
  });
});

const areaUpload = document.getElementById("areaUpload");
const fotosProduto = document.getElementById("fotosProduto");

areaUpload.addEventListener("dragover", function (event) {
    event.preventDefault();
    areaUpload.classList.add("dragover");
});

areaUpload.addEventListener("dragleave", function () {
    areaUpload.classList.remove("dragover");
});

areaUpload.addEventListener("drop", function (event) {
    event.preventDefault();

    areaUpload.classList.remove("dragover");

    const arquivos = event.dataTransfer.files;

    fotosProduto.files = arquivos;

    processarImagemSelecionada(arquivos[0]);
});

// captura também quando o usuário clica e escolhe o arquivo (não só no drag-and-drop)
fotosProduto.addEventListener("change", function () {
    if (fotosProduto.files.length > 0) {
        processarImagemSelecionada(fotosProduto.files[0]);
    }
});

async function processarImagemSelecionada(arquivo) {
    const base64 = await converterImagemParaBase64(arquivo);
    fotosSelecionadas = [base64]; // por enquanto guardando só a primeira imagem

    // opcional: mostrar preview no próprio passo 2
    areaUpload.querySelector("p").textContent = "Imagem selecionada: " + arquivo.name;
}

let fotosSelecionadas = [];

function converterImagemParaBase64(arquivo) {
    return new Promise(function(resolve) {
        const reader = new FileReader();

        reader.onload = function(event) {
            resolve(event.target.result);
        };

        reader.readAsDataURL(arquivo);
    });
}

function mostrarPasso(numero) {

    document.querySelectorAll(".tab-content").forEach(function(passo) {
        passo.classList.remove("active");
    });

    document
        .getElementById("step-" + numero)
        .classList.add("active");

    document.querySelectorAll(".tab-item").forEach(function(tab) {
        tab.classList.remove("active");
    });

    document
        .querySelector('.tab-item[data-tab="step-' + numero + '"]')
        .classList.add("active");

    if (numero > stepAtual) {
        stepAtual = numero;
    }

    if (numero === 4) {
        mostrarResumo();
    }

    if (numero === 4) {
        mostrarResumo();
    }
}

function mostrarResumo() {

    const tipoMaterial =
        document.getElementById("tipoMaterial").value;

    const quantidade =
        document.getElementById("quantidade").value;

    const descricao =
        document.getElementById("descricao").value;

    const disponibilidade =
        document.getElementById("disponibilidade").value;

    const preco =
        document.getElementById("preco").value;

    const localizacao =
        document.getElementById("localizacao").value;

    const resumo =
        document.getElementById("resumoProduto");

    const imagemHTML = fotosSelecionadas.length > 0
        ? `<img src="${fotosSelecionadas[0]}" alt="Foto do material" style="max-width: 200px; border-radius: 8px; margin-bottom: 10px;">`
        : `<p style="color: #999;">Nenhuma imagem selecionada</p>`;

    resumo.innerHTML = `
        ${imagemHTML}
        <p><strong>Material:</strong> ${tipoMaterial}</p>
        <p><strong>Quantidade:</strong> ${quantidade} kg</p>
        <p><strong>Descrição:</strong> ${descricao}</p>
        <p><strong>Disponibilidade:</strong> ${disponibilidade}</p>
        <p><strong>Preço:</strong> R$ ${preco}/kg</p>
        <p><strong>Localização:</strong> ${localizacao}</p>
    `;
}

function getProdutos() {
    return JSON.parse(localStorage.getItem("produtos")) || [];
}

function salvarProdutos(produtos) {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

function publicarProduto() {

    const produtos = getProdutos();

    const usuarioLogado =
        JSON.parse(localStorage.getItem("usuarioLogado"));

    const novoProduto = {
        id: Date.now(),

        vendedorId: usuarioLogado.id,

        nome:
            document.getElementById("nome").value,

        tipoMaterial:
            document.getElementById("tipoMaterial").value,

        quantidade:
            document.getElementById("quantidade").value,

        descricao:
            document.getElementById("descricao").value,

        disponibilidade:
            document.getElementById("disponibilidade").value,

        preco:
            document.getElementById("preco").value,

        localizacao:
            document.getElementById("localizacao").value,

        foto: fotosSelecionadas.length > 0 ? fotosSelecionadas[0] : "../imagens/papelao.jpg"
    };

    produtos.unshift(novoProduto);

    salvarProdutos(produtos);

    fotosSelecionadas = []; // limpa pro próximo cadastro

    alert("Produto publicado com sucesso!");

    modalAnnounce.classList.remove('active'); // fecha o modal
    resetarFormulario();
    carregarCatalogo(); // recarrega os cards sem precisar de F5

}

function carregarCatalogo() {

    const produtos = getProdutos();

    const catalogo =
        document.getElementById("catalogoProdutos");

    if (!catalogo) return;

    catalogo.innerHTML = "";

    produtos.forEach(function(produto) {

        catalogo.innerHTML += `
            <div class="card"  data-categoria="${produto.tipoMaterial}" data-quantidade="${produto.quantidade}" data-preco="${produto.preco}">
                    <img class="card-image" src="${produto.foto}" alt="Fardos de papelão">
                    <div class="card-content">
                        <div class="card-title">${produto.nome}</div>
                        <div class="card-info">🛍️ ${produto.quantidade} kg</div>
                        <div class="card-info">📍 ${produto.localizacao}</div>
                        <div class="card-price">R$ ${produto.preco}/kg</div>
                        <div class="card-footer">
                            <img class="avatar" src="https://i.pravatar.cc/100?img=12" alt="Usuário">
                            <button class="btn-details" onclick="abrirModal('${produto.id}', event)">Ver detalhes</button>
                        </div>
                    </div>
                </div>
        `;
    });
}

const MARGEM_QUANTIDADE = 100; // pra mais ou pra menos

const FAIXAS_PRECO = [
    { min: 5, max: 30 },
    { min: 31, max: 60 },
    { min: 61, max: 90 },
    { min: 91, max: 120 },
    { min: 120, max: Infinity } // R$ 120+
];



function resetarFormulario() {
    document.getElementById("nome").value = "";
    document.getElementById("tipoMaterial").selectedIndex = 0;
    document.getElementById("quantidade").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("disponibilidade").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("localizacao").value = "";

    document.getElementById("resumoProduto").innerHTML = "";

    fotosSelecionadas = [];
    fotosProduto.value = ""; // limpa o input file
    areaUpload.querySelector("p").textContent = "Clique ou arraste suas fotos aqui"; // volta o texto original

    // volta pro step-1
    mostrarPasso(1);
}

function validarCampos(idsObrigatorios) {
    for (const id of idsObrigatorios) {
        const campo = document.getElementById(id);
        if (!campo.checkValidity()) {
            campo.reportValidity(); // mostra a mensagem nativa apontando pro campo
            campo.focus();
            return false;
        }
    }
    return true;
}

function avancarParaStep2() {
    const camposObrigatorios = ["nome", "quantidade", "disponibilidade", "preco"];

    if (validarCampos(camposObrigatorios)) {
        mostrarPasso(2);
    }
}

function avancarParaStep3() {
    if (fotosSelecionadas.length === 0) {
        alert("Por favor, adicione pelo menos uma foto do material.");
        return;
    }
    mostrarPasso(3);
}

function aplicarFiltros() {
    // --- categoria ---
    const checkboxesMarcados = document.querySelectorAll(
        '.filter-group .checkbox-list input[type="checkbox"]:checked'
    );
    const categoriasSelecionadas = Array.from(checkboxesMarcados).map(
        (cb) => cb.parentElement.textContent.trim()
    );

    // --- quantidade ---
    const rangeSlider = document.querySelector('.range-slider');
    const valorCentral = Number(rangeSlider.value);
    const limiteMin = valorCentral - MARGEM_QUANTIDADE;
    const limiteMax = valorCentral + MARGEM_QUANTIDADE;

    // --- preço ---
    const checkboxesPreco = document.querySelectorAll(
        '.checkbox-list-price input[type="checkbox"]'
    );
    const faixasSelecionadas = [];
    checkboxesPreco.forEach((checkbox, index) => {
        if (checkbox.checked) {
            faixasSelecionadas.push(FAIXAS_PRECO[index]);
        }
    });

    const cardsDinamicos = document.querySelectorAll('#catalogoProdutos .card');

    cardsDinamicos.forEach((card) => {
        const categoriaCard = card.dataset.categoria;
        const quantidadeCard = Number(card.dataset.quantidade);
        const precoCard = Number(card.dataset.preco);

        const passaCategoria =
            categoriasSelecionadas.length === 0 ||
            categoriasSelecionadas.includes(categoriaCard);

        const passaQuantidade =
    !sliderFoiTocado ||
    (quantidadeCard >= limiteMin && quantidadeCard <= limiteMax);

        const passaPreco =
            faixasSelecionadas.length === 0 ||
            faixasSelecionadas.some(
                (faixa) => precoCard >= faixa.min && precoCard <= faixa.max
            );

        card.style.display = (passaCategoria && passaQuantidade && passaPreco) ? "" : "none";
    });
}

let produtoAtual = null;

function abrirModal(idProduto, event) {
    event.preventDefault();

    const produtos = getProdutos();
    const produto = produtos.find(p => String(p.id) === String(idProduto));

    if (!produto) return;

    produtoAtual = {
        titulo: produto.nome,
        pesoUnitario: Number(produto.quantidade),
        textoPeso: `📦 ${produto.quantidade}kg disponíveis`,
        local: `📍 ${produto.localizacao}`,
        precoTexto: `R$ ${Number(produto.preco).toFixed(2).replace('.', ',')}/kg`,
        precoNum: Number(produto.preco),
        vendedor: `Vendedor #${produto.vendedorId}`,
        avaliacao: "⭐ Sem avaliações ainda",
        fotoVendedor: "https://i.pravatar.cc/100?img=12",
        imgPrincipal: produto.foto,
        thumbs: [produto.foto]
    };

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

    const precoTotal = qtd * produtoAtual.precoNum;
    const formatadoTotal = precoTotal.toFixed(2).replace('.', ',');

    document.getElementById('modal-price').innerHTML =
        `${produtoAtual.precoTexto} <span>(Preço: R$ ${formatadoTotal} por ${qtd}kg)</span>`;
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

document
    .querySelectorAll('.filter-group .checkbox-list input[type="checkbox"]')
    .forEach((checkbox) => {
        checkbox.addEventListener('change', aplicarFiltros);
    });

let sliderFoiTocado = false;

document.querySelector('.range-slider').addEventListener('input', function () {
    sliderFoiTocado = true;
    aplicarFiltros();
});

document
    .querySelectorAll('.checkbox-list-price input[type="checkbox"]')
    .forEach((checkbox) => {
        checkbox.addEventListener('change', aplicarFiltros);
    });

document.addEventListener("DOMContentLoaded", function () {
    carregarCatalogo();
    carregarFotoPerfil();
});

