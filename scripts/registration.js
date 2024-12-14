const url = 'https://deciding-logically-piglet.ngrok-free.app/users/reg';

document.getElementById('reg-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    let login = document.getElementById('login').value;
    let pass = document.getElementById('password').value;
    let passConfirm = document.getElementById('pass-confirm').value;
    let successMessage = document.getElementById('success-message');
    let existsMessage = document.getElementById('user-exists-message');
    let errorMessage = document.getElementById('error-message');
    let data;
    let json;

    if (pass !== passConfirm) {
        errorMessage.style.opacity = '1';
        setTimeout(() => {
                errorMessage.style.opacity = '0';
            },
            2000
        );
    } else {
        data = {
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
        if (json.value.message === 'User already exists') {
            existsMessage.classList.add('visible');
            existsMessage.style.opacity = '1';
            setTimeout(() => {
                    existsMessage.style.opacity = '0';
                },
                2000
            );
        }
    }
});