const url = 'https://deciding-logically-piglet.ngrok-free.app/sessions/auth';

document.getElementById('auth-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    let login = document.getElementById('login').value;
    let pass = document.getElementById('password').value;
    let successMessage = document.getElementById('success-message');
    let errorMessage = document.getElementById('error-message');
    let json;

    let data = {
        login: login,
        password: pass,
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        json = await response.json();
        console.log(json);
    }
    catch (error) {
        console.log(error);
    }

    if (json.value.success) {
        successMessage.style.color = 'green';
        successMessage.style.opacity = '1';
        setTimeout(() => {
                window.location.href = 'jpg-png.html';
            },
            1000
        );
    }
    else if (!json.value.success) {
        errorMessage.style.opacity = '1';
        setTimeout(() => {
                errorMessage.style.opacity = '0';
            },
            2000
        );
    }
});