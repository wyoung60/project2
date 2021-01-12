ready(() => {
    const loginForm = document.querySelector("#login");
    const emailInput = document.querySelector("#email-input");
    const passwordInput = document.querySelector("#password-input");

    loginForm.addEventListener('click', (event) => {
        event.preventDefault();
        let userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }

        loginUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
    });

    const loginUser = (email, password) => {
        fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              password: password
            })
          })
          .then(() => {
              window.location.replace("/members")
          })
          .catch((err) => {
              console.log(err);
          })

    }
})