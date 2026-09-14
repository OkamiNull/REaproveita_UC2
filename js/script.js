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


//lixeira funcional

const lixos = document.querySelectorAll("[draggable='true']");
const lixeirareciclavel = document.querySelectorAll(".lixeirareciclavel");
const resetarlixo = document.querySelector("#resetarlixos");
const mudarlixo = document.querySelectorAll(".lixeirasespecifica")

function arrastarlixo(){
    console.log("Começou a arrastar");
    
    this.classList.add("arrastando");

}

function desaparecer(){

    const elementoarrastado = document.querySelector(".arrastando")
    
    if(elementoarrastado.id === "lixo1" && this.id === "lixeira1") {
        elementoarrastado.style.display = "none";
    } else if (elementoarrastado.id === "lixo4" && this.id === "lixeira2") {     
        elementoarrastado.style.display = "none";
    } else if (elementoarrastado.id === "lixo3" && this.id === "lixeira3") {
        elementoarrastado.style.display = "none"
    } else if (elementoarrastado.id === "lixo2" && this.id === "lixeira4") {
        elementoarrastado.style.display = "none"
    } else if (elementoarrastado.id === "lixo5" && this.id === "lixeira5") {
        elementoarrastado.style.display = "none"


    } else {alert("Você errou a lixeira!");
    }   

    elementoarrastado.classList.remove("arrastando");
    
}

function resetar(){
    lixos.forEach(function(lixos){
        lixos.style.display = "block";
    });
}

lixos.forEach((lixosreciclaveis1) =>{
    lixosreciclaveis1.addEventListener("dragstart", arrastarlixo)
});

lixeirareciclavel.forEach((lixeirareciclavels) =>{
    lixeirareciclavels.addEventListener("dragover",  function(event) { 
    event.preventDefault();
    
    
});

lixeirareciclavels.addEventListener("drop", desaparecer);

});

resetarlixo.addEventListener("click", resetar);

