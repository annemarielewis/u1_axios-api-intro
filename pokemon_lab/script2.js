//NOTE#1: I worked with Darcy in the eve/reverse engineered her (really cool) method in this js file for more conceptual practice.
//if you'd like to see prettier css, link to other script.
//NOTE#2: I can't figure out how to include the elements that were
//appended via JS in the box / encapsulating div. It's driving me nutts! I'd love some help with this.

//NOTE#3: I cannot figure out why color for my

//bring button into js
const button = document.querySelector("#searchButton");

//textInput is assigned as the value of what is put in the input bar:
const textInput = document.querySelector("#inputBar");

//empty html element of name
const pokemonName = document.querySelector("#pokemonName");

//empty html element of image
const pokemonImage = document.querySelector("#pokemonImage");

const placerText = document.querySelector(".grey");

//assign functionality to clicking the input button
button.addEventListener("click", async () => {
  //searched elements given specific id (blue) after searched. Needs to be cleared for a new search.
  //Remove elements with the blue id:
  let toRemove = document.querySelectorAll(".blue");
  if (toRemove.length > 0) {
    //^could also write as "if (toRemove=true){" or "if (toRemove){"
    toRemove.forEach((el) => el.remove());
  }
  placerText.style.color = "black";
  // placerText.classlist.add("black-text")
  //Text value from input bar
  let pokeInput = textInput.value;
  pokeInput = pokeInput.toLowerCase();
  console.log(pokeInput);
  let response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${pokeInput}`
  );
  console.log(response);
  //name of pokemon that was input:
  let pokeName = response.data.name;
  pokeName = pokeName.toUpperCase();
  //add this name to the html so it's shown on the page:
  //pokeName = pokeName.toUppercase();

  pokemonName.innerHTML = pokeName;

  //image code: use src instead of inner html
  let pokeImage = response.data.sprites.front_default;
  pokemonImage.src = pokeImage;

  //abilities div creation! can create a div here instead of within the html to append the abilities onto!
  //Need to figure out the abilities for the pokemon that was input into the search bar (pokeName) and print it on screen!
  //1) navigate into the abilities of the API (and abilities is an array) and assign it a value
  let pokeAbilities = response.data.abilities;
  //2) Create a conditional so that if the array is empty, it doesn't put the "abilities" section on screen, and if it's not empty
  //it puts an abilities section on screen
  if (pokeAbilities.length > 0) {
    let newHeader = document.createElement("h3"); //creating an h3 in the html and assigning it the js variable of newHeader
    newHeader.setAttribute("class", "blue"); //this is creating class=blue on the newHeader html element
    newHeader.append(`${pokeName}'s abilities`); //appending text between <h3></h3> onto the screen
    document.body.append(newHeader); // putting this h3 in teh body of the document (essential for it showing on screen)
  } else {
  } //can leave this empty or not include it at all because if "if" isn't true, it goes on to next code block :-)
  console.log("hi");

  //3) checking abilities for the pokemon that was input into the search bar (pokeName) and printing on screen!

  pokeAbilities.forEach((index) => {
    let abilityName = index.ability.name; //getting ability
    let newDiv = document.createElement("div"); //creating div in html
    newDiv.setAttribute("class", "abilities blue"); //creating classes in the div
    newDiv.append(abilityName); //appending the ability into the div
    document.body.append(newDiv); //appending the div into the body
  });

  //held items

  //div created for held items
  let heldItems = response.data.held_items;
  if (heldItems.length > 0) {
    let newHeader = document.createElement("h3");
    newHeader.setAttribute("class", "blue");
    newHeader.append(`${pokeName}'s held items:`);
    document.body.append(newHeader);
  }

  heldItems.forEach((index) => {
    let heldName = index.item.name; //getting to the held itemname
    let newDiv = document.createElement("div"); //creating div so on new line
    newDiv.setAttribute("class", "held-item blue"); //creating div so on new line
    newDiv.append(heldName); //creating div so on new line
    document.body.append(newDiv);
  });
  let pokemonHeight = document.querySelector("#pokemonHeight");
  let pokemonWeight = document.querySelector("#pokemonWeight");
  let pokemonEXP = document.querySelector("#pokemonEXP");
  let pokemonType = document.querySelector("#pokemonType");
  let pokemonForm = document.querySelector("#pokemonForm");

  pokemonHeight.innerHTML = "Height: " + response.data.height + " feet";
  pokemonWeight.innerHTML = "Weight: " + response.data.weight + " pounds";
  pokemonEXP.innerHTML = "Base Experience: " + response.data.base_experience;

  //pokemonType.innerHTML = response.data.types
  for (let i = 0; i < response.data.types.length; i++) {
    let placeholderTypeArray = response.data.types[i].type.name;
    pokemonType.innerHTML += `Type is ${placeholderTypeArray} \n`;
  }
});
