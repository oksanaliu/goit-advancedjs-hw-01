import { save, load } from './localStorage';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const feedbackFormEl = document.querySelector('.js-feedback-form');
const errorMessageEl = document.querySelector('.js-error-message');

const formData = {
  email: '',
  message: '',
};

const fillFormField = () => {
  const formDataFromLS = load('feedback-form-state');

  if (!formDataFromLS) return;

  if (formDataFromLS.email) {
    feedbackFormEl.elements.email.value = formDataFromLS.email;
    formData.email = formDataFromLS.email;
  }

  if (formDataFromLS.message) {
    feedbackFormEl.elements.message.value = formDataFromLS.message;
    formData.message = formDataFromLS.message;
  }
};

const onFormFieldChange = event => {
  const { name, value } = event.target;

  formData[name] = value.trim();
  save('feedback-form-state', formData);

  errorMessageEl.style.display = 'none';
};

const onFeedbackFormSubmit = event => {
  event.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    errorMessageEl.style.display = 'block';
    return;
  }

  console.log('Form submitted with data:', formData);

  feedbackFormEl.reset();
  localStorage.removeItem('feedback-form-state');
  formData.email = '';
  formData.message = '';
  errorMessageEl.style.display = 'none';
};

fillFormField();

feedbackFormEl.addEventListener('input', onFormFieldChange);
feedbackFormEl.addEventListener('submit', onFeedbackFormSubmit);
