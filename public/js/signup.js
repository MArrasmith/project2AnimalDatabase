// js for handling the sign up form
const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  const enteredAnimal = getSavedSearchQuery();

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      loginForm.action = `/api/search?animalName=${enteredAnimal}`;
    } else {
      alert(response.statusText);
    }
  }
};

const getSavedSearchQuery = () => {
  return localStorage.getItem('savedSearchQuery') || '';
};