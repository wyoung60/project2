//Front end JS here
//Waits for document to be loaded
document.addEventListener("DOMContentLoaded", (e) => {
  if (e) {
    console.info("DOM loaded");
  }
  //Traversing the DOM variables
  const submitButton = document.querySelector("#submitButton");
  const resolutionTextArea = document.querySelector("#resolution");
  const selectedResolution = document.querySelectorAll("#selectedResolution");
  const milestones = document.createElement("button");
  const milestoneInput = document.createElement("textarea");
  const newGoal = { goal: "", resolution: "" };

  if (selectedResolution) {
    selectedResolution.forEach((item) => {
      item.addEventListener("click", () => {
        milestoneInput.value = "";
        milestones.textContent = "Add Milestone";
        item.insertAdjacentElement("afterend", milestoneInput);
        milestoneInput.insertAdjacentElement("afterend", milestones);
        newGoal.resolution = item.getAttribute("value");
      });
    });
  }

  if (milestones) {
    milestones.addEventListener("click", () => {
      if (!milestoneInput.value) {
        return;
      }
      newGoal.goal = milestoneInput.value;
      console.log(newGoal);
      fetch("/api/goal", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGoal),
      }).then((response) => {
        //Reloads page
        location.reload();
      });
    });
  }

  //If statement to prevent error when not present
  if (submitButton) {
    //Event listener
    submitButton.addEventListener("click", () => {
      if (!resolutionTextArea.value) {
        return;
      }
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
