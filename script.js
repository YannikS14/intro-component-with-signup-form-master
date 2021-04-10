const inputs = document.querySelectorAll(
  'input[type=text], input[type=email], input[type=password]',
);
const form = document.getElementsByTagName('form')[0];

inputs.forEach((el) => {
  const elementErrorDiv = document.querySelector(
    `#${el.id} + div.error`,
  );
  el.addEventListener('input', () => {
    if (el.validity.valid) {
      elementErrorDiv.textContent = '';
      elementErrorDiv.className = 'error';
      el.className = '';
    } else {
      showError(el, elementErrorDiv);
    }
  });
});

form.addEventListener('submit', (event) => {
  inputs.forEach((el) => {
    const elementErrorDiv = document.querySelector(
      `#${el.id} + div.error`,
    );
    if (!el.validity.valid) {
      showError(el, elementErrorDiv);
      event.preventDefault();
    }
  });
});

const showError = (input, inputErrorDiv) => {
  if (input.validity.valueMissing) {
    inputErrorDiv.textContent = `${input.placeholder} cannot be empty`;
  } else if (input.validity.typeMismatch) {
    inputErrorDiv.textContent = 'Looks like this is not an email';
  } else if (input.validity.tooShort) {
    inputErrorDiv.textContent = `Email should be at least ${input.minLength} characters; you entered ${input.value.length}`;
  }

  input.className = 'input-error';
  inputErrorDiv.className = 'error active';
};
