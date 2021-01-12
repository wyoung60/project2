fetch("/api/user_data")
  .then((res) => res.json())
  .then((data) => {
    document.querySelector("#member-name").textContent(data.email);
  });
