// Outside API front end
const lineBody = document.getElementById("api-call");
const requestUrl = "https://type.fit/api/quotes";
let p = document.querySelector("#api-call");

function getApi() {
  fetch(requestUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // drawing a random quote from data.length
      let i = Math.floor(Math.random() * data.length);
// This if/else statement cahnges the word null to anonymous. Didn't want computer science jargon on the page.
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
