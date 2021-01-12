//Front end JS here
document.addEventListener("DOMContentLoaded", (e) => {
  if (e) {
    console.info("DOM loaded");
  }
  const submitButton = document.querySelector("#submitButton");
  const resolutionTextArea = document.querySelector("#resolution");

  if (submitButton) {
    submitButton.addEventListener("click", () => {
      let resolutionValue = { title: resolutionTextArea.value };
      console.log(resolutionValue);
      fetch("/api/resolution", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resolutionValue),
      }).then((response) => {
        console.log(response);
        location.reload();
      });
    });
  }
});
