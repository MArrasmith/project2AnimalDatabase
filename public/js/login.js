// js for handling the login form for the login page
const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    const enteredAnimal = getSavedSearchQuery();

    const loginForm = document.querySelector('.login-form');

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        loginForm.action = `/api/search?animalName=${enteredAnimal}`;
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
};

const getSavedSearchQuery = () => {
  return localStorage.getItem('savedSearchQuery') || '';
};