// const fetch = require("node-fetch");
const tableBody = document.getElementById('repo-table');
const fetchButton = document.getElementById('fetch-button');
const requestUrl = "https://type.fit/api/quotes"

function getApi() {
fetch(requestUrl)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let i= Math.floor( Math.random() * data.length )
    let createTableRow = document.createElement('tr');
    let tableData = document.createElement('td');
    let link = document.createElement('a');
    let p= document.createElement('p');

   
    link.textContent = `"${data[i].text}" - ${data[i].author}`;
    

    document.body.appendChild(p);
    tableData.appendChild(link);
    createTableRow.appendChild(tableData);
    tableBody.appendChild(createTableRow);


  });


}


fetchButton.addEventListener('click', getApi);



