function scrollCarousel(carouselId, amount) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;

    const cards = carousel.querySelectorAll('.material-card');
    if (cards.length === 0) return;

    // Calcula a largura do card somada ao gap de 20px definido no CSS
    const cardWidth = cards[0].offsetWidth + 20;

    if (amount > 0) {
        // 1. Roda suavemente para a frente
        carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });

        // 2. Após a animação, joga o primeiro card para o final da fila e ajusta o scroll instantaneamente
        setTimeout(() => {
            carousel.appendChild(cards[0]);
            carousel.scrollLeft -= cardWidth;
        }, 300); // Tempo sincronizado com a animação suave
    } else {
        // 1. Pega o último card e joga para o início da fila antes de rolar para trás
        const lastCard = cards[cards.length - 1];
        carousel.insertBefore(lastCard, cards[0]);
        carousel.scrollLeft += cardWidth;

        // 2. Roda suavemente para trás
        carousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
}