import _, { now } from 'lodash';

const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('.feedback-form').elements.email;
const messageInput = document.querySelector('.feedback-form').elements.message;

function saveFormState() {
  // Create an object to store the form state
  const formState = {};

  // Save the email and message values in the formState object
  formState.email = form.elements.email.value;
  formState.message = form.elements.message.value;

  // Save the formState object in local storage
  localStorage.setItem('feedback-form-state', JSON.stringify(formState));
}

// Add an event listener to the form that listens for the "input" event with throttle
form.addEventListener('input', _.throttle(saveFormState, 500));

// When the page loads, check for saved form state in local storage
const savedFormState = localStorage.getItem('feedback-form-state');

if (savedFormState) {
  // If form state is found in local storage, parse it from the JSON string and fill in the form
  const formState = JSON.parse(savedFormState);
  emailInput.value = formState.email;
  messageInput.value = formState.message;
}

// Add an event listener to the form's submit button that clears the form state from local storage
form.addEventListener('submit', e => {
  e.preventDefault();
  console.log(localStorage.getItem('feedback-form-state'));
  emailInput.value = '';
  messageInput.value = '';
  localStorage.removeItem('feedback-form-state');
});
