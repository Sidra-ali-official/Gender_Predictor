let nameInput = document.querySelector(".container .user-input-box input");
let searchBtn = document.querySelector(".container .user-input-box .predict-btn");
let nameTxt = document.querySelector(".container .result-box .name");
let genderLogo = document.querySelector(".container .result-box .gender-logo");
let gender = document.querySelector(".container .result-box .gender");
let probability = document.querySelector(".container .result-box .probability");
let resultBox = document.querySelector(".container .result-box");

let predictGender = (name) => {
    let url = "https://api.genderize.io?name=";
    fetch(url + name)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            nameTxt.innerHTML = data.name ? data.name : "N/A";
            gender.innerHTML = data.gender ? data.gender : "N/A";
            probability.innerHTML = data.probability ? `Probability: ${(data.probability * 100).toFixed(2)}%` : "Probability: N/A";
            
            if (data.gender === "female") {
                resultBox.style.background = "#f576ab";
                genderLogo.innerHTML = `<ion-icon name="woman-outline"></ion-icon>`;
                genderLogo.style.color = "#f576ab";
            } else if (data.gender === "male") {
                resultBox.style.background = "#5bc4f3";
                genderLogo.innerHTML = `<ion-icon name="man-outline"></ion-icon>`;
                genderLogo.style.color = "#5bc4f3";
            } else {
                resultBox.style.background = "#ccc";
                genderLogo.innerHTML = `<ion-icon name="help-outline"></ion-icon>`;
                genderLogo.style.color = "#ccc";
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });

        resultBox.style.display = "block";
};

predictGender("Sidra");

searchBtn.addEventListener("click", () => {
    if (nameInput.value.length > 0 && /^[A-Za-z]+$/.test(nameInput.value)) {
        predictGender(nameInput.value);
    }
});
