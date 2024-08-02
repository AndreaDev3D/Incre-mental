function saveGame() {
  const gameState = {
    bugs: bugs,
    bugChance: bugChance,
    additionalFeatures: additionalFeatures,
    devs: devs,
    devCost: devCost,
    testers: testers,
    managers: managers,
    cash: cash,
    devUpdateTime: devUpdateTime,
    intervalId: intervalId,
    projectIntervalId: projectIntervalId,
    bugIntervalId: bugIntervalId,
    gameSpeed: gameSpeed,
    baseProjectCash: baseProjectCash,
    additionalFeatureMultiplier: additionalFeatureMultiplier,
    bugPenalty: bugPenalty,
    newProductWidth: newProductWidth,
    paused: paused,
    projects: projects,
  };

  saveData(gameState);
}

function saveData(data) {
  localStorage.setItem('gameData', JSON.stringify(data));
}

function loadData() {
  var gameData = JSON.parse(localStorage.getItem('gameData'));

  bugs = gameData.bugs || 0;
  devs = gameData.devs || 0;
  cash = gameData.cash || 2000;
  devCost = gameData.devCost || 100;
  testers = gameData.testers || 0;
  managers = gameData.managers || 0;
  newProductWidth = gameData.newProductWidth || 0;
  bugChance = gameData.bugChance;
  additionalFeatures = gameData.additionalFeatures;
  devUpdateTime = gameData.devUpdateTime;
  intervalId = gameData.intervalId;
  projectIntervalId = gameData.projectIntervalId;
  bugIntervalId = gameData.bugIntervalId;
  gameSpeed = gameData.gameSpeed;
  baseProjectCash = gameData.baseProjectCash;
  additionalFeatureMultiplier = gameData.additionalFeatureMultiplier;
  bugPenalty = gameData.bugPenalty;
  paused = gameData.paused || false;
  projects = gameData.projects;


  updateDevCounter();
  updateTesterCounter();
  updateManagerCounter();
  updateCashCounter();
  renderProjects();
  // updateBugCounter();
  // updateAdditionalFeatureCounter();
}

function saveData(data) {
  localStorage.setItem('gameData', JSON.stringify(data));
}

function loadGame() {
  var gameData = localStorage.getItem('gameData');
  if (gameData) {
    loadData()
  }
}

function resetGame() {
  localStorage.removeItem('gameData');
  location.reload();
}

document.addEventListener('DOMContentLoaded', function () {
  loadGame();
  setInterval(saveGame, 1000);
});