const form = document.querySelector("form");
const radios = document.querySelectorAll('input[name="unit"]');
const metricContainer = document.querySelector(".metric");
const imperialContainer = document.querySelector(".imperial");
const outcome = document.querySelector(".outcome");
const classification = document.querySelector(".classification");
const ideal = document.querySelector(".ideal");
const placeholder = document.querySelector(".placeholder");
const heightCM = document.getElementById("heightCM");
const weightKG = document.getElementById("weightKG");
const heightFT = document.getElementById("heightFT");
const heightIN = document.getElementById("heightIN");
const weightST = document.getElementById("weightST");
const weightLBS = document.getElementById("weightLBS");
const results = document.querySelector(".results");
const inputWrappers = document.querySelectorAll(".input-wrapper");
const inputs = document.querySelectorAll('input[type="number"]');
const header = document.querySelector(".header-content");

let heightCMValue;
let weightKGValue;
let heightFTValue;
let heightINValue;
let weightSTValue;
let weightLBSValue;

const calcBMI = (weight, height) => {
  return ((weight / height ** 2) * 10000).toFixed(1);
};

const calcRange = (height) => {
  const low = (18.5 * height ** 2) / 10000;
  const high = (24.9 * height ** 2) / 10000;
  return `${low.toFixed(1)}kgs - ${high.toFixed(1)}kgs.`;
};

const updateResult = (bmi, idealWT, classificationText) => {
  results.innerHTML = Math.round(bmi);
  outcome.classList.remove("hidden");
  placeholder.classList.add("hidden");
  classification.innerHTML = classificationText;
  ideal.innerHTML = idealWT;
};

const clearInputValues = () => {
  inputs.forEach((input) => {
    input.value = "";
  });
  outcome.classList.add("hidden");
  placeholder.classList.remove("hidden");
};

const handleFormInput = (e) => {
  e.preventDefault();
  let bmi;
  let idealWT;

  if (form.classList.contains("extended-form")) {
    const convertedHeight = heightFTValue * 30.48 + heightINValue * 2.54;
    const convertedWeight = weightSTValue * 6.35029 + weightLBSValue * 0.453592;
    idealWT = calcRange(convertedHeight);
    bmi = calcBMI(convertedWeight, convertedHeight);
  } else {
    idealWT = calcRange(heightCMValue);
    bmi = calcBMI(weightKGValue, heightCMValue);
  }

  if (bmi > 0 && bmi < 18.5) {
    updateResult(bmi, idealWT, " Underweight. ");
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    updateResult(bmi, idealWT, " Healthy. ");
  } else if (bmi >= 25 && bmi <= 29.9) {
    updateResult(bmi, idealWT, " Overweight. ");
  } else if (bmi >= 30 && bmi <= 100) {
    updateResult(bmi, idealWT, " Obese. ");
  } else {
    outcome.classList.add("hidden");
    placeholder.classList.remove("hidden");
    ideal.innerHTML = idealWT;
  }
  console.log(bmi);
};

radios.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    const isMetric = e.target.id === "metric";
    form.classList.toggle("extended-form", !isMetric);
    header.classList.toggle("bordered", !isMetric);

    metricContainer.classList.toggle("hidden", !isMetric);
    imperialContainer.classList.toggle("hidden", isMetric);
    clearInputValues();
  });
});

// Need to style the input wrapper with JS since it's selected based on the state of the input it contains.
inputWrappers.forEach((inputWrapper) => {
  const input = inputWrapper.querySelector("input");

  input.addEventListener("focus", () => {
    inputWrapper.classList.add("focus");
  });

  input.addEventListener("blur", () => {
    inputWrapper.classList.remove("focus");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  radios[0].checked = true; // Check the metric radio by default
});

heightCM.addEventListener("input", (e) => {
  heightCMValue = e.target.value * 1;
});

weightKG.addEventListener("input", (e) => {
  weightKGValue = e.target.value * 1;
});

heightFT.addEventListener("input", (e) => {
  heightFTValue = e.target.value * 1;
});

heightIN.addEventListener("input", (e) => {
  heightINValue = e.target.value * 1;
});

weightST.addEventListener("input", (e) => {
  weightSTValue = e.target.value * 1;
});

weightLBS.addEventListener("input", (e) => {
  weightLBSValue = e.target.value * 1;
});

form.addEventListener("input", handleFormInput);
