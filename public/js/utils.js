const animalInput = document.getElementById("animal-input")
const searchbutton = document.querySelector("#search-button")

const handleuserInput = function (event) {    
        if (event.key === "Enter"){
            doSearch();     
        }
};

const doSearch = async function() {
    const enteredAnimal = animalInput.value.trim();
    
    if (enteredAnimal !== "") {
        console.log(enteredAnimal);
        try {
            const response = await fetch(`/api/search?animalName=${enteredAnimal}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log(response);
                window.location.href = `/api/search?animalName=${enteredAnimal}`;
            } else {
                console.warn(response);
            }
        } catch (error) {
            console.error('Error making API request:', error.message);
        }
    }

};

animalInput.addEventListener("keyup", handleuserInput)
searchbutton.addEventListener("click", doSearch)