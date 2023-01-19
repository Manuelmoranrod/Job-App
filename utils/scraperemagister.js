const puppeteer = require('puppeteer');

//Creamos una función para extraer la información de cada libro y envolvemos en una promesa
const extractCourseData = (link, browser) => new Promise (async (resolve, reject) => {

    try{
        const courseData = {}

        const page = await browser.newPage()

        await page.goto(link)
    

        await page.waitForTimeout(100);

        
            courseData['courseTitle'] = await page.$eval('h1', title => title.innerText);
            courseData['courseDescription'] = await page.evaluate(() => Array.from(document.querySelectorAll('.course-box__text.app_course-box-content.app_description-box'), element => element.innerHTML));
            courseData['coursePrice'] = await page.$eval('span.price-box__price', price => price.innerText);
            courseData['courseImage'] = await page.$eval('div.boxes-untrack__logo > img', image => image.src);
            courseData['courseDates'] = await page.$eval('.course-venues__date-item:nth-child(n)', dates => dates.innerText)
            courseData['courseLocation'] = await page.$eval('.course-box-item.feature-box:nth-child(n)', location => location.innerText)
            courseData['courseAcadeny'] = await page.$eval('section > div.title-box > div > a', academy => academy.title)
            courseData['courseUrl'] = await page.url();
            
            console.log(courseData.courseUrl); 

            resolve(courseData)
    } //console.log(courseData);
    catch(err){
        console.log(err);

    }
})

const scraperEmagister = async (url) => {
    try {
        const scraperData = [] //Array vacio
        console.log("Opening the browser......");
        const browser = await puppeteer.launch({ headless: false})

        const page = await browser.newPage()

        await page.goto(url)
        console.log(`Navigating to ${url}...`);

        const urls = await page.$$eval('div.course-box-item.title-box > h3 > a', (links) => links.map(link=> link.href).slice(0, 3))
        console.log('urls capturada', urls.length, urls);

        for(courseLink in urls){
            const course = await extractCourseData(urls[courseLink], browser)
            scraperData.push(course)//mete dentro del array vacio
        }
        //console.log(scraperData, "Lo que devuelve mi función scraper", scraperData.length)
        return scraperData // SI NO DEVUELVES NADA, NO PUEDE HACER NADA

    } catch (err) {
        console.log("Error:", err);
    }
}

module.exports = { 
    scraperEmagister,
}