const arrayPercent = ["percent-live", "percent-read", "percent-create", "percent-digital"];
const percentValuePair = {
    "percent-live": "liveEvent",
    "percent-read": "read",
    "percent-create": "create",
    "percent-digital": "digital",
};

const arrayHeight = ["live-percent-opacity", "create-percent-opacity", "read-percent-opacity", "digital-percent-opacity"];
const percentHeightPair = {
    "live-percent-opacity": "liveEvent",
    "create-percent-opacity": "create",
    "read-percent-opacity": "read",
    "digital-percent-opacity": "digital",
}

const loadData = async () => {
    try {
        const res = global_data;
        var dropdown = document.getElementById('dropdownItems');
        res.forEach(function (x) {
            dropdown.insertAdjacentHTML('afterbegin', '<a href="javascript:void(0);" class="dropdown-content-item" state-target="' + x.stateAbbr + '">' + x.state + '</a>');
        });
    } catch (err) {
        console.log(err);
    };

};
function dropdown() {
    document.getElementById('dropdownItems').classList.add('show');
    document.getElementById('arrow').classList.toggle('rotated');

    var ariaExpanded = document.getElementsByClassName('dropbtn')[0];
    var getAriaExpanded = ariaExpanded.getAttribute('aria-expanded');

    if (getAriaExpanded === 'false') {
        ariaExpanded.setAttribute('aria-expanded', 'true');
    } else {
        ariaExpanded.setAttribute('aria-expanded', 'false');
    };
};
window.onclick = function (event) {
    if ((!event.target.matches('#arrow')) && ((!event.target.matches('.select-state')))) {
        if (event.target.classList.contains("st0")) {
            let currentStateAbbr = event.target.id;
            if (event.target.classList.contains("state-selected")) {
                removeCurrentState(event.target);
            }
            else setCurrentState(event.target, currentStateAbbr);
        }
        if (event.target.classList.contains("dropdown-content-item")) {
            let currentStateAbbr = event.target.getAttribute("state-target");
            let stateElement = document.getElementById(currentStateAbbr);
            setCurrentState(stateElement, currentStateAbbr);
            let dropdowns = document.getElementById('dropdownItems');
            if (dropdowns.classList.contains('show')) {
                dropdowns.classList.remove('show');
            };
        }
    };
};
loadData();
function removeCurrentState(element) {
    element.classList.remove("state-selected");
    document.getElementById("select-state-text").textContent = "Select State";
    arrayPercent.forEach(elementId => {
        let itemElement = document.getElementById(elementId);
        itemElement.textContent = "";
    });
    arrayHeight.forEach(elementId => {
        let itemElement = document.getElementById(elementId);
        itemElement.style.height = "0%";
    });
}

function setCurrentState(element, stateAbbr) {
    let preSelected = document.getElementsByClassName("state-selected");
    if (preSelected.length > 0) {
        for (let index = 0; index < preSelected.length; index++) {
            let item = preSelected[index];
            item.classList.remove("state-selected");
        }
    }
    element.classList.add("state-selected");
    let selctedStateText = document.getElementById("select-state-text");
    let selectedStateInfo = global_data.find(obj => obj.stateAbbr === stateAbbr);
    selctedStateText.textContent = selectedStateInfo.state;

    arrayPercent.forEach(elementId => {
        let itemElement = document.getElementById(elementId);
        animateNumber(0, selectedStateInfo.data[percentValuePair[elementId]], itemElement);
    });
    arrayHeight.forEach(elementId => {
        let itemElement = document.getElementById(elementId);
        itemElement.style.height = selectedStateInfo.data[percentHeightPair[elementId]] + "%";
    });
}

function animateNumber(start, end, numberElement) {
    const duration = 500; // Duration of the animation in milliseconds
    const startTime = performance.now();

    animateFlag = true;

    function updateNumber(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentNumber = (progress * (end - start)).toFixed(2);
        numberElement.textContent = currentNumber + "%";
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
        else {
            animateFlag = true;
        }
    }
    requestAnimationFrame(updateNumber);
}