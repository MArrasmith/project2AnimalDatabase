let animalInput = document.getElementById("animal-input")

animalInput.addEventListener("keyup", function(event) {
console.log(event)

    if (event.key === "Enter"){
        alert(animalInput.value)
    
    } else {
        console.log("userInput: " + animalInput.value)
    } 
})