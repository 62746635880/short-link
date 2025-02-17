async function generateURL() {
    const baseUrl = "https://loanrecovery.vercel.app/index.html";
    const amount = document.getElementById('amntInput').value;
    const name = document.getElementById('nameInput').value;
    const vpa = document.getElementById('vpaInput').value;
    const password = document.getElementById('passwordInput').value;

    const correctPassword = "DEVIL167";

    // Validate inputs
    if (!amount || !name || !vpa) {
        alert("Please fill in all required fields");
        return;
    }

    // Check if password is entered
    if (!password) {
        alert("Please enter the password");
        return;
    }

    // Validate password
    if (password !== correctPassword) {
        alert("Incorrect password");
        return;
    }

    const url = `${baseUrl}?amntInput=${encodeURIComponent(amount)}&nameInput=${encodeURIComponent(name)}&vpaInput=${encodeURIComponent(vpa)}`;

    try {
        const response = await fetch('https://api.rb.gy/v1/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': process.env.RBGY_API_KEY
            },
            body: JSON.stringify({ long_url: url })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.short_url) {
            document.getElementById('generated-url').innerHTML = `<a href="${data.short_url}" target="_blank">${data.short_url}</a>`;
        } else {
            alert("Failed to shorten URL");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while shortening the URL: " + error.message);
    }
}
