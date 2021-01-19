//Front end JS here

//Waits for document to be loaded
document.addEventListener("DOMContentLoaded", (e) => {
  if (e) {
    console.info("DOM loaded");
  }

  var elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  //Traversing the DOM variables
  const submitButton = document.querySelector("#submitButton");
  const resolutionTextArea = document.querySelector("#resolution");
  const selectedResolution = document.querySelectorAll("#selectedResolution");
  const goalsDiv = document.querySelectorAll("#goalsDiv");
  const milestones = document.createElement("button");
  const milestoneInput = document.createElement("input");
  const milestoneInputLabel = document.createElement("label");
  const milestoneDiv = document.createElement("div");
  const completeButton = document.querySelectorAll("#completeButton");
  const newGoal = { goal: "", resolution: "" };

  if (selectedResolution) {
    selectedResolution.forEach((item) => {
      item.addEventListener("click", () => {
        milestoneInput.value = "";
        goalsDiv.forEach((item) => {
          item.style.display = "none";
        });
        milestoneDiv.setAttribute("class", "input-field col s12");
        milestoneInput.setAttribute("type", "text");
        milestoneInput.setAttribute("id", "milestone");
        milestoneInputLabel.setAttribute("for", "milestone");
        milestoneInputLabel.textContent =
          "What goals will help you achieve your resolution?";
        milestones.setAttribute("id", "milestone");
        milestones.textContent = "Add Milestone";
        milestones.setAttribute(
          "class",
          "purple white-text waves-effect waves-light btn-flat"
        );
        newGoal.resolution = item.getAttribute("value");
        const goalDiv = item.nextElementSibling;
        goalDiv.style.display = "block";
        goalDiv.appendChild(milestoneDiv);
        milestoneDiv.appendChild(milestoneInput);
        milestoneInput.insertAdjacentElement("afterend", milestoneInputLabel);
        milestoneInputLabel.insertAdjacentElement("afterend", milestones);
      });
    });
  }

  if (completeButton) {
    completeButton.forEach((button) => {
      button.addEventListener("click", () => {
        const goalValue = button.parentElement.getAttribute("value");
        fetch("/api/update", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: goalValue }),
        }).then((response) => {});
        button.setAttribute(
          "class",
          "purple white-text waves-effect waves-light btn-small right disabled"
        );
        button.setAttribute("id", "completeButton");
        button.textContent = "";
        const starElement = document.createElement("i");
        starElement.textContent = "stars";
        starElement.setAttribute("class", "material-icons");
        button.appendChild(starElement);
      });
    });
  }

  if (milestones) {
    milestones.addEventListener("click", () => {
      if (!milestoneInput.value) {
        return;
      }
      newGoal.goal = milestoneInput.value;
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

      resolutionCategory = document.querySelector("#resolutionCategory");

      switch (resolutionCategory.getAttribute("value")) {
        case "mind":
          resolutionValue.mind = true;
          resolutionValue.body = false;
          resolutionValue.knowledge = false;
          break;
        case "body":
          resolutionValue.mind = false;
          resolutionValue.body = true;
          resolutionValue.knowledge = false;
          break;
        case "knowledge":
          resolutionValue.mind = false;
          resolutionValue.body = false;
          resolutionValue.knowledge = true;
          break;
      }
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
