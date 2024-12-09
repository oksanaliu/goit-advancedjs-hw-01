import { save, load } from './localStorage';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const feedbackFormEl = document.querySelector('.js-feedback-form');

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
};

const onFeedbackFormSubmit = event => {
  event.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    iziToast.error({
      title: 'Error',
      message: 'Fill all form fields!',
      position: 'topRight',
      timeout: 3000,
    });
    return;
  }

  console.log('Form submitted with data:', formData);

  feedbackFormEl.reset();
  localStorage.removeItem('feedback-form-state');
  formData.email = '';
  formData.message = '';

  iziToast.success({
    title: 'Success',
    message: 'Form submitted successfully!',
    position: 'topRight',
    timeout: 3000, //
  });
};

fillFormField();

feedbackFormEl.addEventListener('input', onFormFieldChange);
feedbackFormEl.addEventListener('submit', onFeedbackFormSubmit);
