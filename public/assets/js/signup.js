const signUpForm = document.querySelector("#signup");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");

signUpForm.addEventListener("click", (event) => {
  event.preventDefault();
  let userData = {
    email: emailInput.val().trim(),
    password: passwordInput.val().trim(),
  };

  if (!userData.email || !userData.password) {
    return;
  }

  signUpUser(userData.email, userData.password);
  emailInput.val("");
  passwordInput.val("");
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
