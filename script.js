import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://playground-e2108-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const itemsInDB = ref(database, "items");

onValue(itemsInDB, (snapshot) => {
  if(snapshot.exists()){
    let data = snapshot.val();
  data = Array.from(Object.entries(data));
  shoppingListEl.innerHTML = "";
  data.forEach(item => {
    const currentItemId = item[0];
    const currentItem = item[1];
    appendItemToList(item);
  })
}else{
  shoppingListEl.innerHTML = "No items in the list yet... Add some!";
}
});

const addButton = document.getElementById("add-button");
const inputText = document.getElementById("input-field");
const shoppingListEl = document.getElementById("shopping-list");

addButton.addEventListener("click", () => {
  push(itemsInDB, inputText.value);
  inputText.value = "";
});

function appendItemToList(item){
  let itemId = item[0];
  let itemValue = item[1];

  const li = document.createElement("li");
  li.textContent = itemValue;

  li.addEventListener("dblclick", () => {
    let exactLocationOfItemInDB = ref(database, `items/${itemId}`);
    remove(exactLocationOfItemInDB)
  })

  shoppingListEl.appendChild(li);
}