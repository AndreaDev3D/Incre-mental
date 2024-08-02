var startingCash = 2000
var bugs = 0;
var additionalFeatures = 0;
var devs = 0;
var devCost = 100;
var cash = startingCash; //temporarily
var devUpdateTime = 0;
var intervalId;
var projectIntervalId;
var bugIntervalId;
var gameSpeed = 1000;
var testers = 0;
var managers = 0;
var baseProjectCash = 200;
var additionalFeatureMultiplier = 10;
var bugChance = 10;
var bugPenalty = 10;
var currentProductWidth;
var newProductWidth;
var paused = false;
var projects = [];

function updateDevCounter() { updateTextbyId("dev-count", devs) }
function updateDevCost() { updateTextbyId("dev-price", devCost) }
function updateTesterCounter() { updateTextbyId("tester-count", testers) }
function updateManagerCounter() { updateTextbyId("manager-count", managers) }
function updateCashCounter() { updateTextbyId("cash-count", cash) }
// function updateBugCounter() { updateTextbyId("bug-counter", bugs) }
function updateAdditionalFeatureCounter() { updateTextbyId("additional-feature-counter", additionalFeatures) }




function closeAlertBox() {
  document.getElementById("alert-box").classList.add("d-none")
}

function alert(message) {
  document.getElementById("alert-box-text").innerText = message
  document.getElementById("alert-box").classList.remove("d-none")
}

// function pauseDevelopment() {
//   if (paused == false) {
//     clearInterval(intervalId);
//     clearInterval(projectIntervalId);
//     paused = true;
//   }
//   else if (paused == true) {
//     autoFeatureProgress();
//     paused = false;
//   }

// }

function AddProjects() {
  const projectsContainer = document.getElementById('projects-container');

  if (projectsContainer) {
    const key = generateRandomKey();
    const newProjectData = { id: key, bugs: 0, bugChance: 10, bugPenalty: 10, additionalFeatures: 0, additionalFeatureMultiplier: 10, devs: 10, tester: 1, manager: 1, intervalId: 0, projectIntervalId: 0, bugIntervalId: 0, featureProgress: 0, productProgress: 0, intervalDuration: 100, paused: false }; // Example project data
    const newProject = new Project(newProjectData);
    projects.push(newProject); // Add the new project to the projects array
    const projectElement = newProject.render();
    projectsContainer.appendChild(projectElement);
  }
}

// Render projects
function renderProjects() {
  const projectsContainer = document.getElementById('projects-container');
  console.log('Rendering projects:', projects);

  projects.forEach(project => {
    const projectElement = project.render();
    projectsContainer.appendChild(projectElement);
  });
}


document.addEventListener('DOMContentLoaded', function () {
  changePage('Projects');

});