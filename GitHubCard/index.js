/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

const entryPoint = document.querySelector(".cards");

axios
  .get("https://api.github.com/users/bseverino")
  .then(response => {
    const newCard = cardCreator(response.data);
    entryPoint.appendChild(newCard);
  });

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

// const followersArray = [];
// console.log(followersArray);
const followersArray = ['Gremlin4544', 'zimashima', 'dlhauer', 'taylorbcool', 'michelangelo17'];

// axios
//   .get("https://api.github.com/users/bseverino/followers")
//   .then(response => {
//     response.data.forEach(item =>{
//       followersArray.push(item.login);
//     });
//   });

followersArray.forEach(item => {
  axios
    .get(`https://api.github.com/users/${item}`)
    .then(response => {
      const newCard = cardCreator(response.data);
      entryPoint.appendChild(newCard);    
    });
});



/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function cardCreator(obj){
  const card = document.createElement("div"),
        cardImage = document.createElement("img"),
        cardInfo = document.createElement("div"),
        cardName = document.createElement("h3"),
        cardUsername = document.createElement("p"),
        cardLocation = document.createElement("p"),
        cardProfile = document.createElement("p"),
        cardLink = document.createElement("a"),
        cardFollowers = document.createElement("p"),
        cardFollowing = document.createElement("p"),
        cardBio = document.createElement("p"),
        cardWebsite = document.createElement("p"),
        cardWebsiteLink = document.createElement("a"),
        cardCreated = document.createElement("p"),
        cardUpdated = document.createElement("p"),
        cardButton = document.createElement("button"),  
        linkHtml = obj.html_url,
        webHtml = obj.blog;

        card.appendChild(cardImage);
        card.appendChild(cardInfo);
        cardInfo.appendChild(cardName);
        cardInfo.appendChild(cardUsername);
        cardInfo.appendChild(cardLocation);
        cardInfo.appendChild(cardProfile);
        cardProfile.appendChild(cardLink);
        cardInfo.appendChild(cardFollowers);
        cardInfo.appendChild(cardFollowing);
        cardInfo.appendChild(cardBio);
        cardInfo.appendChild(cardWebsite);
        cardWebsite.appendChild(cardWebsiteLink);
        cardInfo.appendChild(cardCreated);
        cardInfo.appendChild(cardUpdated);
        card.appendChild(cardButton);
        

        card.classList.add("card");
        cardInfo.classList.add("card-info");
        cardName.classList.add("name");
        cardUsername.classList.add("username");
        cardButton.classList.add("button");

        cardImage.src = obj.avatar_url;
        cardName.textContent = obj.name;
        cardUsername.textContent = obj.login;
        if (obj.location !== null) {
          cardLocation.textContent = obj.location;
        } else {cardLocation.textContent = "No location given"};
        cardLink.innerHTML = "Profile: " + linkHtml.link(obj.html_url);
        cardFollowers.textContent = `Followers: ${obj.followers}`;
        cardFollowing.textContent = `Following: ${obj.following}`;
        if (obj.bio !== null) {
          cardBio.textContent = `Bio: ${obj.bio}`;
        } else {cardBio.textContent = "Bio: No bio given"};
        if (obj.blog !== "") {
          cardWebsiteLink.innerHTML = "Website: " + webHtml.link(obj.blog);
        } else {cardWebsite.textContent = `Website: No website given`};
        cardCreated.textContent = `Created at: ${obj.created_at}`;
        cardUpdated.textContent = `Last updated: ${obj.updated_at}`;
        cardButton.textContent = "More Info";

        cardButton.addEventListener('click', () => {
          cardInfo.classList.toggle('info-open');
          if (cardInfo.classList.contains('info-open')){
            TweenMax.fromTo(cardInfo, 1, {css:{height:150}}, {css:{height:200}, ease:Cubic.easeOut});
            cardButton.textContent = "Less Info";
          } else {
            TweenMax.fromTo(cardInfo, 1, {css:{height:200}}, {css:{height:150}, ease:Cubic.easeOut});
            cardButton.textContent = "More Info";
          }
        });

        return card;
};

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
