document.addEventListener("DOMContentLoaded", function () {
    // Responsive Footer
    function updateFooterLayout() {
        const footer = document.querySelector("footer");
        if (!footer) return;

        if (window.innerWidth <= 600) {
            footer.style.display = "flex";
            footer.style.flexDirection = "column";
            footer.style.alignItems = "center";
            footer.style.gap = "10px";
        } else {
            footer.style.display = "flex";
            footer.style.flexDirection = "row";
            footer.style.justifyContent = "center";
            footer.style.gap = "20px";
        }
    }

    updateFooterLayout();
    window.addEventListener("resize", updateFooterLayout);

    // Responsive Navbar Toggle
    const nav = document.querySelector("nav");
    if (nav) {
        const toggleButton = document.createElement("button");
        toggleButton.textContent = "Menu";
        toggleButton.style.display = "none";
        toggleButton.style.margin = "10px";
        toggleButton.style.padding = "10px";
        toggleButton.style.backgroundColor = "#721a71";
        toggleButton.style.color = "#fff";
        toggleButton.style.border = "none";
        toggleButton.style.cursor = "pointer";

        nav.parentNode.insertBefore(toggleButton, nav);

        function handleNavDisplay() {
            if (window.innerWidth <= 768) {
                toggleButton.style.display = "block";
                nav.style.display = "none";
            } else {
                toggleButton.style.display = "none";
                nav.style.display = "flex";
            }
        }

        toggleButton.addEventListener("click", () => {
            nav.style.display = (nav.style.display === "none" || nav.style.display === "") ? "flex" : "none";
        });

        handleNavDisplay();
        window.addEventListener("resize", handleNavDisplay);
    }

    // Breast Cancer Detection Logic
    const form = document.querySelector("form");
    const fileInput = document.querySelector('input[type="file"]');
    const symptomsInput = document.querySelector('textarea');

    // Create output area
    const outputDiv = document.createElement("div");
    outputDiv.id = "outputArea";
    outputDiv.style.marginTop = "20px";
    form.appendChild(outputDiv);

    // Image preview
    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = document.createElement("img");
                img.src = e.target.result;
                img.style.maxWidth = "100%";
                img.style.marginTop = "10px";
                img.style.borderRadius = "10px";
                outputDiv.innerHTML = ""; // Clear previous
                outputDiv.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    });

    // Form submission analysis
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent actual submission for now

        if (!fileInput.files.length) {
            alert("Please select a mammogram image.");
            return;
        }

        if (!symptomsInput.value.trim()) {
            alert("Please enter your symptoms.");
            return;
        }

        const message = symptomsInput.value.toLowerCase();
        const resultText = document.createElement("p");
        resultText.style.color = "#fff";
        resultText.style.marginTop = "15px";

        if (message.includes("lump") || message.includes("mass")) {
            resultText.textContent = "Warning: A lump or mass may be a sign of breast cancer. Consult a doctor.";
        } else if (message.includes("discharge")) {
            resultText.textContent = "Note: Nipple discharge could indicate a condition requiring medical evaluation.";
        } else if (message.includes("pain") || message.includes("discomfort")) {
            resultText.textContent = "Pain or discomfort may be benign but should still be evaluated by a specialist.";
        } else if (message.includes("swelling")) {
            resultText.textContent = "Swelling might indicate infection or another issue. Consider seeking a consultation.";
        } else {
            resultText.textContent = "Symptoms unclear. It's best to consult a medical professional for diagnosis.";
        }

        outputDiv.appendChild(resultText);
    });
});