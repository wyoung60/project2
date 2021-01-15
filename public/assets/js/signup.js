// Decided to not do it this way. It's simpler to use forms without JS
const signUpForm = document.querySelector("#signup");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");

signUpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let userData = {
    email: emailInput.value.trim(),
    password: passwordInput.value.trim(),
  };

  if (!userData.email || !userData.password) {
    return;
  }

  signUpUser(userData.email, userData.password);
  emailInput.value = "";
  passwordInput.value = "";
});

const signUpUser = (email, password) => {
  fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then(() => {
      window.location.replace("/members");
    })
    .catch(loginErr);
};

const loginErr = (err) => {
  document.querySelector("#alert .msg").textContent(err.responseJSON);
};
