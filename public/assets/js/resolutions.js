//Front end JS here

//Waits for document to be loaded
document.addEventListener("DOMContentLoaded", (e) => {
  if (e) {
    console.info("DOM loaded");
  }

  //JS for mobile nav side bar
  var elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  //Traversing the DOM variables
  const submitButton = document.querySelector("#submitButton");
  const resolutionTextArea = document.querySelector("#resolution");
  const selectedResolution = document.querySelectorAll("#selectedResolution");
  const goalsDiv = document.querySelectorAll("#goalsDiv");
  const deleteButton = document.querySelectorAll("#deleteButton");
  const completeButton = document.querySelectorAll("#completeButton");
  //Creating dynamic elements
  const milestones = document.createElement("button");
  const milestoneInput = document.createElement("input");
  const milestoneInputLabel = document.createElement("label");
  const milestoneDiv = document.createElement("div");
  //Creating object for new goal
  const newGoal = { goal: "", resolution: "" };

  //If statement to prevent code from running until element is present
  if (selectedResolution) {
    //Loop to go through all elements in querySelectorAll
    selectedResolution.forEach((item) => {
      //Click event
      item.addEventListener("click", () => {
        //Clears value in input
        milestoneInput.value = "";
        //Resets the display value
        goalsDiv.forEach((item) => {
          item.style.display = "none";
        });
        //Sets attributes and text content for elements
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
        //Adds resolutionID value to new goal object
        newGoal.resolution = item.getAttribute("value");
        //Selects element attached to clicked element
        const goalDiv = item.nextElementSibling;
        //Makes it visible
        goalDiv.style.display = "block";
        //Appends all necessary elements
        goalDiv.appendChild(milestoneDiv);
        milestoneDiv.appendChild(milestoneInput);
        milestoneInput.insertAdjacentElement("afterend", milestoneInputLabel);
        milestoneInputLabel.insertAdjacentElement("afterend", milestones);
      });
    });
  }

  //If statement to prevent code from running until element is present
  if (completeButton) {
    completeButton.forEach((button) => {
      button.addEventListener("click", () => {
        //Gets goal table id
        const goalValue = button.parentElement.getAttribute("value");
        //Fetch to api to update goal table boolean value for selected element
        fetch("/api/update", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: goalValue }),
        }).then((response) => {});
        //Disables button
        button.setAttribute(
          "class",
          "purple white-text waves-effect waves-light btn-small right disabled"
        );
        //Sets id and empties text content of button
        button.setAttribute("id", "completeButton");
        button.textContent = "";
        //Adds complete element
        const starElement = document.createElement("i");
        starElement.textContent = "beenhere";
        starElement.setAttribute("class", "material-icons");
        button.appendChild(starElement);
      });
    });
  }

  //If statement to prevent code from running until element is present
  if (milestones) {
    milestones.addEventListener("click", () => {
      //If no text present kicks out of click event function
      if (!milestoneInput.value) {
        return;
      }
      //Add text content of input to new goal object
      newGoal.goal = milestoneInput.value;
      //Fetch to post new goal to goals table
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
      //Gets value added to page of mind, body, or knowledge
      resolutionCategory = document.querySelector("#resolutionCategory");
      //Switch statement to add boolean values in resolutions table
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

  //If statement to prevent code from running until element is present
  if (deleteButton) {
    deleteButton.forEach((button) => {
      button.addEventListener("click", () => {
        //Get resolution id
        const resolutionId = button.parentElement.getAttribute("value");
        //Fetch to delete item from table
        fetch("/api/delete", {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: resolutionId }),
        }).then(() => {
          location.reload();
        });
      });
    });
  }
});
