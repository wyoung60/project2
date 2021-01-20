const lineBody = document.getElementById("api-call");
const requestUrl = "https://type.fit/api/quotes";
let p = document.querySelector("#api-call");

function getApi() {
  fetch(requestUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let i = Math.floor(Math.random() * data.length);

      let author;
      if (data[i].author === null) {
        author = "Anonymous";
      } else {
        author = data[i].author;
      }
      p.textContent = `${data[i].text} - ${author}`;
    });
}
if (p) {
  getApi();
}
