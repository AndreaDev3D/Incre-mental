
function updateTextbyId(elemenId, text) {
    document.getElementById(elemenId).textContent = text;
}

function changePage(page) {
    var pages = document.querySelectorAll(".page")
    var newActivePage = document.getElementById(page)
    pages.forEach(element => {
        element.classList.add("d-none")
    });
    newActivePage.classList.remove("d-none")
}

function generateRandomKey() {
    const now = new Date();
    const timestamp = now.getTime(); // Get the current time in milliseconds since January 1, 1970
    const randomNumber = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
    return `project-${timestamp}-${randomNumber}`;
}

function createProjectElement(project) {
    const projectElement = document.createElement('div');

    projectElement.id = `${project.id}`;
    projectElement.className = 'border border-light rounded-4 p-2';

    projectElement.innerHTML = `
                <div id="feature-progress-holder-${project.id}">  
                    <h4>Feature Progress</h4>
                    <div id="feature-progress-${project.id}" class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar bg-warning" style="width: 25%">25%</div>
                    </div>
                </div>
                <div class="text-end">
                    <button type="button" class="clickable btn btn-light my-3" onclick="increaseFeatureProgress('${project.id}', 100)">
                        <i class="bi bi-code-slash"></i> Code a Feature
                    </button>
                    <button type="button" class="clickable btn btn-warning my-3" onclick="decreaseBugCount('${project.id}')">
                        <i class="bi bi-bug"></i> Remove a bug
                    </button>
                </div>
                <div id="product-progress-holder-${project.id}">     
                    <h4>Product Progress</h4>
                    <div id="product-progress-${project.id}" class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar bg-light text-dark" style="width: 25%">25%</div>
                    </div>
                </div>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="pause-devs-${project.id}" onclick="pauseDevelopment('${project.id}')">
                    <label class="form-check-label" for="pause-devs-${project.id}">Pause Feature Progress</label>
                </div>
                <div class="hstack gap-2 align-items-center">
                    <div class="border border-light p-2 rounded-2">
                        <i class="bi bi-code-slash"></i> Additional features: <span id="additional-feature-counter-${project.id}">0</span>
                    </div>
                    <div class="text-warning border border-warning p-2 rounded-2">
                        <i class="bi bi-bug"></i> Bug count: <span id="bug-counter-${project.id}">0</span>
                    </div>
                    <button type="button" class="clickable btn btn-outline-light my-3 ms-auto" onclick="releaseProduct('${project.id}')">
                        <i class="bi bi-cloud-arrow-up"></i> Release Product
                    </button>
                </div>
            `;
    return projectElement;
}