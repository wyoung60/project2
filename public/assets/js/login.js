// Decided to not do it this way. It's simpler to use forms without JS
const loginForm = document.querySelector("#login");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let userData = {
    email: emailInput.value.trim(),
    password: passwordInput.value.trim(),
  };

  if (!userData.email || !userData.password) {
    return;
  }

  loginUser(userData.email, userData.password);
  emailInput.value = "";
  passwordInput.value = "";
});

const loginUser = (email, password) => {
  fetch("/api/login", {
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
      window.location.replace("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
