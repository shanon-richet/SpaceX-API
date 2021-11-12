const header = document.querySelector('header')
const main = document.querySelector('main')

const fetchHeader = fetch(`https://api.spacexdata.com/v3/info`)
.then(response => response.json())
 .then (json => {
   console.log(json)
   const h1 = document.createElement('h1')
   h1.textContent = json.name
   const article = document.createElement('article')
   article.textContent = `Founder: ${json.founder}`
   const p= document.createElement('p')
   p.textContent = "Founded: " + json.founded
  
   header.appendChild(h1)
   header.appendChild(article)
   header.appendChild(p)
}) 

const fetchHistory = fetch('https://api.spacexdata.com/v3/history/1')
.then(response => response.json())
.then(json => {
  var h3= document.createElement('h3')
  h3.textContent = json.title + ' - ' + json.event_date_utc
  var p = document.createElement('p')
  p.textContent = json.details
  document.body.appendChild(h3)
  document.body.appendChild(p)
});

const missions= []
for (let i= 1; i < 10 ; i++) {
fetch(`https://api.spacexdata.com/v3/launches/`+ i)
.then(response => response.json())
.then(json => {
    console.log(missions)
   var missions= document.createElement('section')
    main.appendChild(missions)

    var num= document.createElement('h4')
    num.textContent= "Lauches #00" + json.flight_number;
    var name= document.createElement('p')
    name.textContent= json.mission_name

    var year= document.createElement('p')
    year.innerHTML= "Year: " + json.launch_year

    var missionPatch = new Image()
    missionPatch.src= json.links.mission_patch_small

    missions.appendChild(num)
    missions.appendChild(name)
    missions.appendChild(year)
    missions.appendChild(missionPatch)
})
}


// do fetch requests in parallel
// using the Promise.all() method
const allData = Promise.all([fetchHeader, fetchHistory, fetchMission]);

// attach then() handler to the allData Promise
allData.then((res) => console.log(res));

