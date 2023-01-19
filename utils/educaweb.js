const puppeteer = require('puppeteer');

//Creamos una función para extraer la información de cada curso y envolvemos en una promesa
const extractCourseData = (link, browser) => new Promise (async (resolve, reject) => {

    try{
        
        const courseData = {}

        const page = await browser.newPage()

        await page.goto(link)
    
        await page.waitForTimeout(100);

            
            courseData['courseTitle'] = await page.$eval('h1', title => title.innerText);
            courseData['courseDescription'] = await page.$eval('div.course.container.m-t-30 > div:nth-child(2) > div > div > div:nth-child(2) > div > div', description => description.innerText)
            courseData['coursePrice'] = await page.$eval('body > main > div.course.container.m-t-30 > div:nth-child(1) > div.course__price.colf-md-4.colf-sm-12 > div > div.course__cta.ta--c.p-a-15.p-b-0 > div.o-tooltip.m-t-10 > div', price => price.innerText);
            courseData['courseImage'] = await page.$eval('body > main > div.course.container.m-t-30 > div:nth-child(1) > div.course__info.colf-md-8.colf-sm-12 > img', image => image.src);
            courseData['courseLocation'] = await page.$eval('body > main > div.course.container.m-t-30 > div:nth-child(1) > div.course__info.colf-md-8.colf-sm-12 > ul > li:nth-child(3) > span', location => location.innerText)
            courseData['courseAcademy'] = await page.$eval('body > main > div.course.container.m-t-30 > div:nth-child(1) > div.course__info.colf-md-8.colf-sm-12 > p > a', academy => academy.innerText)
            courseData['courseUrl'] = await page.url();
            
           console.log(courseData.courseUrl); 
            
            

            resolve(courseData)
           
    }
    catch(err){
        console.log(err);
    }
})

const scraperEducaweb = async (url) => {
    try {

        const scraperData = []
        

        console.log("Opening the browser......");

        const browser = await puppeteer.launch({ headless: false})

        const page = await browser.newPage()

        await page.goto(url)
        console.log(`Navigating to ${url}...`);

        const urls = await page.$$eval('div > header > h3 > a', (links) => links.map(link=> link.href).slice(0, 3))

        //console.log('urls capturada', urls.length, urls);

        
        for(courseLink in urls){
            const course = await extractCourseData(urls[courseLink], browser)
            scraperData.push(course)
        }
        //console.log(scraperData, "Lo que devuelve mi función scraper", scraperData.length)
        
        return scraperData

    } catch (err) {
        console.log("Error:", err);
    }
}

//scraperEducaweb('https://www.educaweb.com/')

module.exports = {
    scraperEducaweb
}


