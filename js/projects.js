class Project {

    // constructor(id) {
    //     this.id = id;

    //     this.bugs = 0;
    //     this.bugChance = 10;
    //     this.bugPenalty = 10;

    //     this.additionalFeatures = 0;
    //     this.additionalFeatureMultiplier = 10;

    //     this.devs = 10;
    //     this.tester = 1;
    //     this.manager = 1;

    //     this.intervalId = 0;
    //     this.projectIntervalId = 0;
    //     this.bugIntervalId = 0;

    //     this.featureProgress = 0;
    //     this.productProgress = 0;

    //     this.paused = false;

    //     this.autoFeatureProgress();
    //     this.autoBugDecrease();
    // }

    constructor(data) {
        this.id = data.id || generateRandomKey();
        this.bugs = data.bugs || 0;
        this.bugChance = data.bugChance || 10;
        this.bugPenalty = data.bugPenalty || 10;
        this.additionalFeatures = data.additionalFeatures || 0;
        this.additionalFeatureMultiplier = data.additionalFeatureMultiplier || 10;
        this.devs = data.devs || 10;
        this.tester = data.tester || 1;
        this.manager = data.manager || 1;
        this.intervalId = data.intervalId || 0;
        this.projectIntervalId = data.projectIntervalId || 0;
        this.bugIntervalId = data.bugIntervalId || 0;
        this.featureProgress = data.featureProgress || 0;
        this.productProgress = data.productProgress || 0;
        this.intervalDuration = data.intervalDuration || 0;
        this.paused = data.paused || false;

        this.autoFeatureProgress();
        this.autoBugDecrease();
    }

    increaseFeatureProgress(amount) {
        if (Math.floor(Math.random() * 100) < this.bugChance) {
            this.bugs++;
        }
        else {
            this.featureProgress += amount;
            if (this.featureProgress >= 100) {
                this.increaseProductProgress(1);
                this.featureProgress = this.featureProgress % 100;
            }
        }

        this.updateCounters();
        this.updateProgressBar('feature-progress', this.featureProgress);
    }

    increaseProductProgress(amount) {
        this.productProgress += amount;
        if (this.productProgress >= 100) {
            this.additionalFeatures += Math.floor(this.productProgress / 100);
            this.productProgress = 100;
        }

        if (this.managers > 0 && this.bugs <= 0) {
            if (this.additionalFeatures > (this.managers * 10)) {
                releaseProduct();
            }
        }

        this.updateCounters();
        this.updateProgressBar('product-progress', this.productProgress);
    }

    autoFeatureProgress() {

        clearInterval(intervalId);
        if (this.devs % 100 !== 0) {
            this.intervalDuration = 1000 / (this.devs % 100);
            this.intervalId = setInterval(() => this.increaseFeatureProgress(1), this.intervalDuration);
        }

        if (this.devs >= 100) {
            completions = Math.floor(devs / 100);
            clearInterval(this.projectIntervalId)
            this.projectIntervalId = setInterval(() => this.increaseProductProgress(1), this.gameSpeed / completions);
        }
    };

    decreaseBugCount() {
        this.bugs = Math.max(0, this.bugs - 1);

        this.updateCounters();
    }

    autoBugDecrease() {
        clearInterval(this.bugIntervalId);
        if (this.testers > 0) {
            this.bugIntervalId = setInterval(() => decreaseBugCount(), this.gameSpeed / this.testers);
        }
    }

    pauseDevelopment() {
        // Your implementation here
        console.log(`Pause development for ${this.id}`);
        if (this.paused == false) {
            clearInterval(this.intervalId);
            clearInterval(this.projectIntervalId);
            this.paused = true;
        }
        else if (this.paused == true) {
            this.autoFeatureProgress();
            this.paused = false;
        }
    }

    releaseProduct() {
        if (this.productProgress >= 100) {
            cash = cash + baseProjectCash + additionalFeatures * additionalFeatureMultiplier - bugs * bugPenalty;
            updateCashCounter();
            this.updateCounters();

            this.additionalFeatures = 0;
            this.productProgress = 0;
            this.updateProgressBar('product-progress', this.productProgress);
        } else {
            alert("Cannot release product before completion");
        }
    }

    updateCounters() {
        document.getElementById(`additional-feature-counter-${this.id}`).textContent = this.additionalFeatures;
        document.getElementById(`bug-counter-${this.id}`).textContent = this.bugs;
        document.getElementById(`dev-counter-${this.id}`).textContent = this.devs;
        document.getElementById(`tester-counter-${this.id}`).textContent = this.tester;
        document.getElementById(`manager-counter-${this.id}`).textContent = this.manager;
    }

    updateProgressBar(type, value) {
        const progressBar = document.getElementById(`${type}-${this.id}`).querySelector('.progress-bar');
        progressBar.style.width = `${value}%`;
        progressBar.textContent = `${value}%`;
        progressBar.setAttribute('aria-valuenow', value);
    }

    render() {
        const projectElement = document.createElement('div');
        projectElement.id = `project-${this.id}`;
        projectElement.className = 'border border-light rounded-4 p-2';

        projectElement.innerHTML = `
            <label>${this.id}</label>
            <div id="feature-progress-holder-${this.id}">  
                <h4>Feature Progress</h4>
                <div id="feature-progress-${this.id}" class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="${this.featureProgress}" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar bg-warning" style="width: ${this.featureProgress}%">${this.featureProgress}%</div>
                </div>
            </div>
            <div class="text-end">
                <button type="button" class="clickable btn btn-light my-3 code-feature-button">
                    <i class="bi bi-code-slash"></i> Code a Feature
                </button>
                <button type="button" class="clickable btn btn-warning my-3 remove-bug-button">
                    <i class="bi bi-bug"></i> Remove a bug
                </button>
            </div>
            <div id="product-progress-holder-${this.id}">     
                <h4>Product Progress</h4>
                <div id="product-progress-${this.id}" class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="${this.productProgress}" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar bg-light text-dark" style="width: ${this.productProgress}%">${this.productProgress}%</div>
                </div>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="pause-devs-${this.id}">
                <label class="form-check-label" for="pause-devs-${this.id}">Pause Feature Progress</label>
            </div>
            <div class="hstack gap-2 align-items-center">
                <div class="border border-light p-2 rounded-2">
                    <i class="bi bi-code-slash"></i> Additional features: <span id="additional-feature-counter-${this.id}">0</span>
                </div>
                <div class="text-warning border border-warning p-2 rounded-2">
                    <i class="bi bi-bug"></i> Bug count: <span id="bug-counter-${this.id}">0</span>
                </div>
                <button type="button" class="clickable btn btn-outline-light my-3 ms-auto release-product-button">
                    <i class="bi bi-cloud-arrow-up"></i> Release Product
                </button>
            </div>
            <div class="border border-light p-2 rounded-2">
                <i class="bi bi-people"></i> 
                Devs: <span id="dev-counter-${this.id}">${this.devs}</span>, 
                Testers: <span id="tester-counter-${this.id}">${this.tester}</span>, 
                Managers: <span id="manager-counter-${this.id}">${this.manager}</span>
            </div>
        `;

        // Add event listeners for buttons and switch
        projectElement.querySelector('.code-feature-button').addEventListener('click', () => this.increaseFeatureProgress(10));
        projectElement.querySelector('.remove-bug-button').addEventListener('click', () => this.decreaseBugCount());
        projectElement.querySelector('.release-product-button').addEventListener('click', () => this.releaseProduct());
        projectElement.querySelector(`#pause-devs-${this.id}`).addEventListener('change', () => this.pauseDevelopment());
        return projectElement;
    }
}