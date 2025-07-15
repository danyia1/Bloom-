
function confirmPayment() {

    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const country = document.getElementById("country").value.trim();
    const city = document.getElementById("city").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const payment = document.getElementById("payment").value;


    if (!name || !address || !country || !city || !phone) {
        alert("Please fill out all the fields.");
        return;
    }


    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(phone)) {
        alert("Please enter a valid phone number.");
        return;
    }


    alert(`Lovely choice, ${name}! Thank you for blooming with us`);


    window.location.href = "success.html";
}
