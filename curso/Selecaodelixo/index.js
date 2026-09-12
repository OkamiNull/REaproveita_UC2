const titulo = document.querySelector("#titulo")
const texto = document.querySelector("#texto") // tag p
const lixo1 = document.querySelector("#lixo1")
const lixo2 = document.querySelector("#lixo2")
const lixo3 = document.querySelector("#lixo3")
const lixo4 = document.querySelector("#lixo4")
const lixo5 = document.querySelector("#lixo5")
const lixo6 = document.querySelector("#lixo6")



lixo1.addEventListener('click', function(){

    const video = document.createElement("iframe") //esse comando chamada o iframe
    // const video1 = document.createElement("iframe") //você pode criar diversas variaveis com a mesma tag
    const quebra = document.createElement("br") //esse comando chamada o br
    const quebra1 = document.createElement("br")
    
    texto.textContent = "Lixo não reciclável: resíduos que não podem ser reciclados, como fraldas, papel higiênico e cerâmicas. Devem ser descartados corretamente."
    titulo.textContent = ""    
    texto.appendChild(quebra) //esse comando chama a variavel do br dentro da div texto

    video.src = "https://www.youtube.com/embed/qlRXN2dOVdE"
    video.width = "250px"
    video.height = "155px"
    texto.appendChild(video) //esse comando chama a variavel do iframe dentro da div texto

    // video1.src = "https://www.youtube.com/embed/Q8RQ7D5MzW8?si=9tOn0s7_d3tJVQDy"
    // video1.width = "560px"
    // video1.height = "315px"
    // texto.appendChild(video1)
    
})

lixo2.addEventListener('click', function(){

    const video = document.createElement("iframe") 
    const quebra = document.createElement("br")

    texto.textContent = 'Vidros: materiais recicláveis que podem ser reutilizados e transformados em novos produtos, como garrafas, potes e frascos.'
    titulo.textContent = ""  
    texto.appendChild(quebra)

    video.src = "https://www.youtube.com/embed/5ADi0ZBEkqc"
    video.width = "250px"
    video.height = "155px"
    texto.appendChild(video)

})

lixo3.addEventListener('click', function(){

     const video = document.createElement("iframe") 

    texto.textContent = 'Lixo orgânico: são resíduos de origem natural, como restos de alimentos, cascas de frutas e folhas. Podem ser utilizados para compostagem e virar adubo.'
    titulo.textContent = ""

    video.src = "https://www.youtube.com/embed/fzxN53Inik8"
    video.width = "250px"
    video.height = "155px"
    texto.appendChild(video)

})

lixo4.addEventListener('click', function(){
    const video = document.createElement("iframe") 

    texto.textContent = 'Papéis: materiais recicláveis que podem ser reaproveitados na produção de novos papéis. Devem estar limpos e secos para facilitar a reciclagem.'
    titulo.textContent = ""

    video.src = "https://www.youtube.com/embed/-Mwi9b8RjBw"
    video.width = "250px"
    video.height = "155px"
    texto.appendChild(video)

})

lixo5.addEventListener('click', function(){
    const video = document.createElement("iframe") 
    
    texto.textContent = 'Plásticos: materiais recicláveis presentes em embalagens, garrafas e sacolas. Devem ser descartados corretamente para facilitar a reciclagem.'
    titulo.textContent = ""

    video.src = "https://www.youtube.com/embed/hwxIoW3cj4U"
    video.width = "250px"
    video.height = "155px"
    texto.appendChild(video)

})

lixo6.addEventListener('click', function(){
     const video = document.createElement("iframe") 
     const quebra = document.createElement("br")

    
    texto.textContent = 'Metais: materiais recicláveis, como latas e objetos de alumínio, aço ou ferro. Podem ser reaproveitados na produção de novos produtos.'
    titulo.textContent = ""
    texto.appendChild(quebra)

    video.src = "https://www.youtube.com/embed/wgPn3kZZtIY"
    video.width = "250px"
    video.height = "155px"
    texto.appendChild(video)
})


// lixos.forEach(function(lixos){
//     lixos.addEventListener('click',function(){
//         texto.textContent = 'Neymar'
//     })
// })

// lixos.forEach(function(lixos){
//     lixos.addEventListener('mouseout',function(){
//         texto.textContent = 'selecione um lixo'
//     })
// })



// texto.addEventListener('click', function(){
//     texto.textContent = 'Olá mundo'
// })

// texto.addEventListener('mouseout', function(){
//     texto.textContent = 'selecione um lixo'
// })