const passwordInput = document.getElementById("password")
const passwordStrength = document.getElementById("password-strength")

passwordInput.addEventListener("input", (event) => {

  fetch("/api/checkpassword", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    password: event.target.value,
  }),
}).then((response) => {
  return response.json();
})
.then((data) => {
  passwordStrength.textContent = data.strength
})

})


