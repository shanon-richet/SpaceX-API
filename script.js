const header = document.querySelector('header')
const main = document.querySelector('main')
const roadsterSection = document.querySelector('.roadsterSection')
const rocketSection = document.querySelector('.rocketSection')
const capsuleSection = document.querySelector('.capsuleSection')

const button = document.querySelector('.rockets')
const button2 = document.querySelector('.capsules')
const button3 = document.querySelector('.roadster')

button.onclick= () => {
  if (rocketSection.style.display === "none") {
    rocketSection.style.display = "flex";
  } else {
    rocketSection.style.display = "none";
  }
} 
button2.onclick= () => {
  if (capsuleSection.style.display === "none") {
    capsuleSection.style.display = "flex";
  } else {
    capsuleSection.style.display = "none";
  }
} 
button3.onclick= () => {
  if (roadsterSection.style.display === "none") {
    roadsterSection.style.display = "flex";
  } else {
    roadsterSection.style.display = "none";
  }
} 

const fetchHeader = fetch(`https://api.spacexdata.com/v3/info`)
.then(response => response.json())
 .then (json => {
   const h1 = document.createElement('h1')
   h1.textContent = json.name
   const article = document.createElement('article')
   article.textContent = `Founder: ${json.founder}`
   const p= document.createElement('p')
   p.textContent = "Founded: " + json.founded
  
   const p2= document.createElement('p')
   p2.textContent= json.headquarters.address + ' ' + json.headquarters.city + ' ' + json.headquarters.state;
   header.appendChild(h1)
   header.appendChild(article)
   header.appendChild(p)
   header.appendChild(p2)
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

for (let i= 1; i < 15 ; i++) {
fetch(`https://api.spacexdata.com/v3/launches/`+ i)
.then(response => response.json())
.then(json => {
    var cases= document.createElement('article')
    rocketSection.appendChild(cases)
    var num= document.createElement('h4')
    num.textContent= "Launch #00" + json.flight_number;
    var name= document.createElement('p')
    name.textContent= json.mission_name

    var year= document.createElement('p')
    year.innerHTML= "Year: " + json.launch_year

    var missionPatch = new Image()
    missionPatch.src= json.links.mission_patch_small

    cases.appendChild(num)
    cases.appendChild(name)
    cases.appendChild(year)
    cases.appendChild(missionPatch)
})
}

for (let i = 1; i < 3; i++) {
  fetch('https://api.spacexdata.com/v3/dragons/dragon'+ i)
  .then(response => response.json())
  .then(json => {
    const capsule = document.createElement('div')
    capsuleSection.appendChild(capsule)

    var capsuleName= document.createElement('h3')
    capsuleName.textContent= json.name
    var capsuleType= document.createElement('li')
    capsuleType.innerHTML= "type: " + json.type
    var capsuleDescription= document.createElement('section')
    capsuleDescription.innerHTML= json.description
    var capsuleCapacity= document.createElement('li')
    capsuleCapacity.innerHTML= "Capacity: " + json.crew_capacity + " people"
    var capsuleSize= document.createElement('li')
    capsuleSize.innerHTML= "Size: " + json.heat_shield.size_meters + "meters"

    var capsuleFuel= document.createElement('li')
    capsuleFuel.innerHTML= "Fuel: " + json.thrusters[0].fuel_1

    var imageCapsule = new Image()
    imageCapsule.src= json.flickr_images[2]

    capsule.appendChild(imageCapsule)
    capsule.appendChild(capsuleName)
    capsule.appendChild(capsuleType)
    capsule.appendChild(capsuleCapacity)
    capsule.appendChild(capsuleSize)
    capsule.appendChild(capsuleFuel)
    capsule.appendChild(capsuleDescription)
  })
}

const fetchRoadster = fetch('https://api.spacexdata.com/v3/roadster')
.then(response => response.json())
.then(json => {
  const roadster= document.createElement('section')
  roadsterSection.appendChild(roadster)

  var roadsterName= document.createElement('h2')
  roadsterName.innerHTML= json.name;

  var roadsterDetails = document.createElement('p')
  roadsterDetails.innerHTML = json.details;

  var imagesRoadster= document.createElement('div')
  roadster.appendChild(imagesRoadster)

  var imageRoadster= new Image()
  imageRoadster.src= json.flickr_images[0]

  var imageRoadster2= new Image()
  imageRoadster2.src= json.flickr_images[1]

  var imageRoadster3= new Image()
  imageRoadster3.src= json.flickr_images[2]

  roadster.appendChild(roadsterName)
  imagesRoadster.appendChild(imageRoadster)
  imagesRoadster.appendChild(imageRoadster2)
  imagesRoadster.appendChild(imageRoadster3)
})

