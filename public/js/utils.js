let animalInput = document.getElementById("animal-input")
let searchbutton = document.querySelector("#search-button")

let handleuserInput = function(event) {    
        if (event.key === "Enter"){
            doSearch()      
        }
    }

let doSearch = async function() {
    const response = await fetch('/api/search', {
        method: 'POST',
        body: JSON.stringify({ animalName: animalInput.value }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        // document.location.replace('/profile');
        console.log(response)
      } else {
        console.warn(response)
      }

}

animalInput.addEventListener("keyup", handleuserInput)
searchbutton.addEventListener("click", doSearch)

