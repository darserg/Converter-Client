const url = 'https://deciding-logically-piglet.ngrok-free.app/users/prem';
const user = JSON.parse(sessionStorage.getItem("user"));

async function SetFreePlan() {
    console.log(user);
    let json;

    try {
        const response = await fetch(`${url}/${user.id}/${false}`, {
            method: 'PUT',
        });
        json = await response.json();
        console.log(json);

        if (json.value.success) {
            setTimeout(() => {
                    window.location.href = 'jpg-png.html';
                },
                1000
            );
        }
    } catch (error) {
        console.log(error);
    }
}

async function SetPremPlan() {
    console.log(user);
    let json;

    try {
        const response = await fetch(`${url}/${user.id}/${true}`, {
            method: 'PUT',
        });
        json = await response.json();
        console.log(json);

        if (json.value.success) {
            setTimeout(() => {
                    window.location.href = 'jpg-png.html';
                },
                1000
            );
        }
    } catch (error) {
        console.log(error);
    }
}