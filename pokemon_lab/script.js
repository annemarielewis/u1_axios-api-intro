let button = document.querySelector("#searchButton");

button.addEventListener("click", async () => {
  let pokemonName = document.querySelector("#pokemonName");
  let pokemonImage = document.querySelector("#pokemonImage");
  let pokemonHeight = document.querySelector("#pokemonHeight");
  let pokemonWeight = document.querySelector("#pokemonWeight");
  let pokemonEXP = document.querySelector("#pokemonEXP");
  let pokemonType = document.querySelector("#pokemonType");
  let pokemonForm = document.querySelector("#pokemonForm");
  const placerText = document.querySelector(".grey");

  //textInput is assigned as teh value of what is put in the input bar:
  let textInput = document.querySelector("#inputBar").value;
  //Axios call goes here
  //textInput = textInput.toLowercase();
  textInput = textInput.toLowerCase();
  let response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${textInput}/`
  );

  console.log(response.data);
  placerText.style.color = "black";

  let pName = response.data.name;
  let pImage = response.data.sprites.front_default; //
  //console.log(pImage)
  pName = pName.toUpperCase();
  pokemonName.innerHTML = `${pName}`;
  pokemonImage.src = pImage;
  pokemonHeight.innerHTML = "Height: " + response.data.height + " feet";
  pokemonWeight.innerHTML = "Weight: " + response.data.weight + " pounds";
  pokemonEXP.innerHTML = "Base Experience: " + response.data.base_experience;
  //pokemonType.innerHTML = response.data.types
  for (let i = 0; i < response.data.types.length; i++) {
    let placeholderTypeArray = response.data.types[i].type.name;
    pokemonType.innerHTML += `Type is ${placeholderTypeArray} \n`;
  }

  //   for (let i = 0; i < response.data.forms.length; i++) {
  //     let placeholderTypeArray = response.data.forms[i].name;
  //     pokemonForm.innerHTML += "Form is " + `${placeholderTypeArray}`;
  //   }
});
