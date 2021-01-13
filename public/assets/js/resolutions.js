//Front end JS here
//Waits for document to be loaded
document.addEventListener("DOMContentLoaded", (e) => {
  if (e) {
    console.info("DOM loaded");
  }
  //Traversing the DOM variables
  const submitButton = document.querySelector("#submitButton");
  const resolutionTextArea = document.querySelector("#resolution");

  //If statement to prevent error when not present
  if (submitButton) {
    //Event listener
    submitButton.addEventListener("click", () => {
      //Gets data from text area
      let resolutionValue = { title: resolutionTextArea.value };
      //Calls post from api-routes
      fetch("/api/resolution", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resolutionValue),
      }).then((response) => {
        //Reloads page
        location.reload();
      });
    });
  }
});
