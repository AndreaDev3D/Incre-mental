function buyCoders() {

    if (cash >= devCost) {
        devs += 1;
        cash -= devCost

        // Increment the cost by 5% every new dev
        devCost = 100 + ((100 * 0.05) * devs);

        resetFeatureProgress();
        autoFeatureProgress();

        updateDevCounter();
        updateDevCost();
        updateCashCounter();
    }
    else {
        alert("Not enough cash to buy a coder");
    }
}

function buyTesters() {
    if (cash >= 500) {
        testers += 1;
        cash -= 500
        updateTesterCounter();
        updateCashCounter();
        autoBugDecrease();
    }
    else {
        alert("Not enough cash to buy a tester");
    }
}

function buyManager() {
    managers += 1;
    cash -= 10;
    updateManagerCounter();
    updateCashCounter();
}