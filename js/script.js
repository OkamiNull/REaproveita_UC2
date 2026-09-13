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