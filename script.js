// Select elements
const scanBtn = document.getElementById("scan-btn");
const foodInput = document.getElementById("food-input");
const submitBtn = document.getElementById("submit-btn");
const resultDiv = document.getElementById("result");

// Simulate QR Scanning
scanBtn.addEventListener("click", () => {
  const simulatedQRData = "apple"; // Replace with real QR scanning logic
  fetchCalorieInfo(simulatedQRData);
});

// Handle Manual Input
submitBtn.addEventListener("click", () => {
  const foodItem = foodInput.value.trim().toLowerCase();
  if (!foodItem) {
    resultDiv.innerHTML = `<p style="color: red;">Please enter a food item!</p>`;
    return;
  }
  fetchCalorieInfo(foodItem);
});

// Fetch calorie info from backend
function fetchCalorieInfo(foodItem) {
  fetch(`http://localhost:3000/calories?food=${foodItem}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Food not found");
      }
      return response.json();
    })
    .then((data) => {
      resultDiv.innerHTML = `<p>Calories in ${foodItem}: ${data.calories} kcal per 100g</p>`;
    })
    .catch((error) => {
      resultDiv.innerHTML = `<p style="color: red;">Calorie information for "${foodItem}" not found.</p>`;
    });
}

