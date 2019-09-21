const charactersAPI = new APIHandler('http://localhost:8000');


const updateCharacter = (character) => {
  let id = document.querySelector(".id");
  let name = document.querySelector(".name");
  let occupation = document.querySelector(".occupation");
  let cartoon = document.querySelector(".cartoon");
  let weapon = document.querySelector(".weapon");

  id.textContent = character.id;
  name.textContent = character.name;
  occupation.textContent = character.occupation;
  cartoon.textContent = character.cartoon;
  weapon.textContent = character.weapon;
}

const showEmpty = () => {
  let empty = {
    "id": "",
    "name": "",
    "occupation": "",
    "weapon": "",
    "cartoon": ""
  }
  updateCharacter(empty);
}


const removeError = () => {
  let divError = document.querySelector(".error");
  if (divError !== null) {
    divError.remove();
  }
}

const showNotFound = () => {
  const father = document.querySelector(".list");
  const operationsDiv = document.querySelector(".operations");
  let error = document.createElement("div");
  error.setAttribute("class", "error alert alert-danger w-25 mx-auto");
  error.textContent = "Not found";
  father.insertBefore(error, operationsDiv);
  showEmpty();

}

const createCharacterDiv = (character) => {


  let characterInfoDiv = document.createElement("div");
  characterInfoDiv.classList.add("character-info");
  let idDiv = document.createElement("div");
  idDiv.textContent = "ID:";
  let idSpan = document.createElement("span");
  idSpan.textContent = `${character.id}`;
  idSpan.classList.add("id");
  idDiv.appendChild(idSpan);

  let nameDiv = document.createElement("div");
  nameDiv.textContent = "Name";
  let nameSpan = document.createElement("span");
  nameSpan.textContent = `${character.name}`;
  nameSpan.classList.add("name");
  nameDiv.appendChild(nameSpan);

  let occupationDiv = document.createElement("div");
  occupationDiv.textContent = "Ocupation";
  let occupationSpan = document.createElement("span");
  occupationSpan.textContent = `${character.occupation}`;
  occupationSpan.classList.add("occupation");
  occupationDiv.appendChild(occupationSpan);

  let isCartoonDiv = document.createElement("div");
  isCartoonDiv.textContent = "Is a Cartoon?";
  let isCartoonSpan = document.createElement("span");
  isCartoonSpan.textContent = `${character.cartoon}`;
  isCartoonSpan.classList.add("cartoon");
  isCartoonDiv.appendChild(isCartoonSpan);

  let weaponDiv = document.createElement("div");
  weaponDiv.textContent = "Weapon:";
  let weaponSpan = document.createElement("span");
  weaponSpan.textContent = `${character.weapon}`;
  weaponSpan.classList.add("weapon");
  weaponDiv.appendChild(weaponSpan);

  characterInfoDiv.appendChild(idDiv);
  characterInfoDiv.appendChild(nameDiv);
  characterInfoDiv.appendChild(occupationDiv);
  characterInfoDiv.appendChild(isCartoonDiv);
  characterInfoDiv.appendChild(weaponDiv);
  characterContainer.appendChild(characterInfoDiv);
}

const showCreateSuccess = () => {
  let createCharacter = document.getElementById('new-character-form');
  const father = document.querySelector(".create");
  let success = document.createElement("div");
  success.setAttribute("class", "success alert alert-success my-3 w-25 mx-auto");
  success.textContent = "Created.";
  father.appendChild(success);
  setTimeout(function () {
    let toast = document.querySelector(".success");
    toast.remove();
    createCharacter.name.value = "";
    createCharacter.occupation.value = "";
    createCharacter.weapon.value = "";
    createCharacter.cartoon.checked = false;

  }, 1000);
}
window.addEventListener('load', () => {

  const createCharacter = document.getElementById('new-character-form');
  const editCharacter = document.getElementById('edit-character-form');
  const getAllCharacter = document.getElementById('fetch-all');
  const getCharacter = document.getElementById('fetch-one');
  const deleteCharacter = document.getElementById('delete-one');
  const input = document.querySelector(".character-id");



  //TODO - make the button available only if it has something written

  getCharacter.addEventListener('click', (e) => {
    e.preventDefault();
    removeError();
    let responsePromise = charactersAPI.getOneRegister(input.value);
    responsePromise.then(response => {
        updateCharacter(response.data);
      })
      .catch(error => {
        showNotFound();
        console.log('Oh No! Error is: ', error);

      })
  });
  getAllCharacter.addEventListener('click', (e) => {
    e.preventDefault();
    charactersAPI.getFullList();

  });

  // limpar todos os campos e mostrar mensagem de sucesso
  createCharacter.addEventListener('submit', e => {
    e.preventDefault();
    const characterInfo = {
      name: createCharacter.name.value,
      occupation: createCharacter.occupation.value,
      weapon: createCharacter.weapon.value,
      cartoon: createCharacter.cartoon.checked
    }
    let responsePromise = charactersAPI.createOneRegister(characterInfo);

    responsePromise.then(response => {
        showCreateSuccess();

        console.log('post successful and the response is: ', response);
      })
      .catch(error => {
        console.log('Oh No! Error is: ', error);
      })

  });

  editCharacter.addEventListener('submit', (e) => {
    e.preventDefault();
    let form = e.target;
    console.log(editCharacter.name.value);
    console.log(editCharacter.occupation.value);
    console.log(editCharacter.weapon.value);
    console.log(editCharacter.cartoon.checked);

  });



  deleteCharacter.addEventListener('click', (e) => {
    e.preventDefault();
    let form = e.target;
    console.log(form);

  });



});