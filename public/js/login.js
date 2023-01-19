const button = document.querySelector('#login_button');


button.addEventListener('click', async() => {
    const apiData = await fetch("http://localhost:3000/api/login", {
        Accept: 'application/json',
        modeth: 'POST',
        body: JSON.stringify({
                'email': document.getElementById('email').value,
                'password': document.getElementById('password').value,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = await apiData.json();
    console.log('DATA DE REGISTER', data)
    return data;
})
