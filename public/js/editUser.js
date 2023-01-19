const button = document.querySelector('#edit_button')

button.addEventListener('click', async() => {
        const apiData = await fetch('http://localhost:3000/api/user', {
                Accept: 'application/json',
                method: "PUT",
                body: JSON.stringify({
                        'name': document.getElementById('nameEdit').value,
                        'email': document.getElementById('emailEdit').value,
                }),
                headers: {
                        "Content-Type": "application/json",
                },
        })
        const data = await apiData.json();
        console.log('DATA DE REGISTER', data)
        return data;  
})