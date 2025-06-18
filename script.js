const form = document.getElementById("myForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const genderInputs = document.querySelectorAll('input[name="gender"]');
const courseInputs = document.querySelectorAll('input[name="course"]');
const errorMsg = document.getElementById("errorMsg");

// Regular expression for email
const emailRegex = /^[a-zA-Z0-9._%]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,}$/;

// Apply live validation styles
emailInput.addEventListener("input", () => {
  styleField(emailInput, emailRegex.test(emailInput.value.trim()));
});

passwordInput.addEventListener("input", () => {
  styleField(passwordInput, passwordInput.value.length >= 6);
});

genderInputs.forEach((input) =>
  input.addEventListener("change", () => {
    const selected = document.querySelector('input[name="gender"]:checked');
    genderInputs.forEach((el) => styleField(el, !!selected));
  })
);

courseInputs.forEach((input) =>
  input.addEventListener("change", () => {
    const anyChecked = document.querySelectorAll('input[name="course"]:checked').length > 0;
    courseInputs.forEach((el) => styleField(el, anyChecked));
  })
);

// Helper: Apply green or red border
function styleField(field, isValid) {
  field.style.border = isValid ? "2px solid green" : "2px solid red";
}

// Submit handler
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let email = emailInput.value.trim();
  let password = passwordInput.value;
  let genderChecked = document.querySelector('input[name="gender"]:checked');
  let coursesChecked = document.querySelectorAll('input[name="course"]:checked');

  let error = "";

  if (!emailRegex.test(email)) {
    error = "Invalid email format!";
    styleField(emailInput, false);
  } else if (password.length < 6) {
    error = "Password must be at least 6 characters!";
    styleField(passwordInput, false);
  } else if (!genderChecked) {
    error = "Please select a gender!";
    genderInputs.forEach((el) => styleField(el, false));
  } else if (coursesChecked.length === 0) {
    error = "Please select at least one course!";
    courseInputs.forEach((el) => styleField(el, false));
  }

  if (error) {
    errorMsg.innerText = error;
  } else {
    errorMsg.innerText = "";
    alert("Form submitted successfully!");
    form.reset();
    resetStyles();
  }
});

// Helper: Remove all borders after submission
function resetStyles() {
  [emailInput, passwordInput].forEach((el) => (el.style.border = ""));
  [...genderInputs, ...courseInputs].forEach((el) => (el.style.border = ""));
}
