const scanBtn = document.getElementById("scan-btn");
const foodInput = document.getElementById("food-input");
const submitBtn = document.getElementById("submit-btn");
const resultDiv = document.getElementById("result");
const qrCodeContainer = document.getElementById("qr-code");
const scanner = new Html5Qrcode("scanner");

// Function to generate QR Code
function generateQRCode(data) {
  qrCodeContainer.innerHTML = ""; // Clear previous QR code
  new QRCode(qrCodeContainer, {
    text: data,
    width: 200,
    height: 200,
  });
}

// Example: Generate a QR code for "apple"
generateQRCode("apple");

// Start QR Code Scanner
document.getElementById("start-scan-btn").addEventListener("click", () => {
  scanner.start(
    { facingMode: "environment" }, // Rear-facing camera
    { fps: 10, qrbox: 250 },
    (decodedText) => {
      alert(`Scanned: ${decodedText}`);
      fetchCalorieInfo(decodedText);
      scanner.stop();
    },
    (errorMessage) => {
      console.error(errorMessage);
    }
  );
});

// Fetch calorie info from backend
function fetchCalorieInfo(foodItem) {
  fetch(`http://localhost:3000/calories?food=${foodItem}`)
    .then((response) => {
      if (!response.ok) throw new Error("Food not found");
      return response.json();
    })
    .then((data) => {
      resultDiv.innerHTML = `<p>Calories in ${foodItem}: ${data.calories} kcal per 100g</p>`;
    })
    .catch(() => {
      resultDiv.innerHTML = `<p style="color: red;">Calorie information for "${foodItem}" not found.</p>`;
    });
}



