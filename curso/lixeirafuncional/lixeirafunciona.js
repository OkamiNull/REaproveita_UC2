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


