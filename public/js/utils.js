const animalInput = document.getElementById("animal-input")
const searchbutton = document.querySelector("#search-button")

const handleuserInput = function (event) {    
        if (event.key === "Enter"){
            doSearch();     
        }
};

// allows search bar functionality for the homepage
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
                saveSearchQuery(enteredAnimal);
                window.location.href = `/api/search?animalName=${enteredAnimal}`;
            } else {
                console.warn(response);
            }
        } catch (error) {
            console.error('Error making API request:', error.message);
        }
    }

};

const saveSearchQuery = (query) => {
    localStorage.setItem('savedSearchQuery', query);
};

animalInput.addEventListener("keyup", handleuserInput)
searchbutton.addEventListener("click", doSearch)