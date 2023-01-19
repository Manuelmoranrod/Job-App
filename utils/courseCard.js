const cards = document.querySelector('.cards');
const input = document.querySelector('#input_search');
const button = document.querySelector('#btn_search');





    
button.addEventListener('click', () => {
        
    let newData = async () => { 
        const apiData = await fetch(`/api/search?keyword=${input.value}`)//fetch a nuestra api
        const data = await apiData.json();
        console.log(data)
        return data;
    }
    (async () => {
        const info = await newData()//el click deberia llamar a la funcion
        info.forEach(course => {
            // Se crea la courseCard, con titulo
            const courseCard = document.createElement('div')
            courseCard.setAttribute('class', 'card')
            const title = document.createElement('h3')
            title.setAttribute('class', 'titular')
            title.innerHTML = course.courseTitle
            const price = document.createElement('p');
            price.setAttribute('class', 'price')
            price.innerHTML = course.coursePrice
            const image = document.createElement('img')
            image.setAttribute('class', 'acd')
            //image.setAttribute('target', '_blank')
            image.src = course.courseImage
            
            const description = document.createElement('p')
            description.setAttribute('class', 'des')
            description.innerHTML = course.courseDescription

            const link = document.createElement('a')
            link.setAttribute('target', '_blank')
            const linktext = document.createTextNode("Más información");
            link.href = course.courseUrl
            
            //To father, appendChild son
            courseCard.appendChild(image)
            courseCard.appendChild(title)
            courseCard.appendChild(description)
            courseCard.appendChild(price)

            link.appendChild(linktext)
            courseCard.appendChild(link)
           
            //This "cards" is on home.pug
            cards.appendChild(courseCard);
        });
    })();
});