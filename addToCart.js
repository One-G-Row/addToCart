import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://restshoppinglist-default-rtdb.europe-west1.firebasedatabase.app/"  
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const input = document.getElementById("input-field")
const addBtn = document.getElementById("add-button")
const shopList = document.getElementById("shopping-list")

addBtn.addEventListener("click", function(){
    let inputValue = input.value
    push(shoppingListInDB, inputValue)
    clearInput()
    })

// onValue reads data from database
// snapshot contains data from database location
// You can extract the contents of the snapshot as a JavaScript object by calling the val() method.
onValue(shoppingListInDB, function(snapshot){

        if(snapshot.exists()){
            //change the object to an array and store it in a variable
        let itemsArray = Object.entries(snapshot.val())
        //let itemsExists = Object.entries(snapshot.exists())

        clearShopList()

        for(let i = 0; i < itemsArray.length; i++){
            //append item to the shopping list element for each iteration.
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendToShoppingList(currentItem)

        }
   }  else{
            shopList.innerHTML = "NO ITEMS HERE..."
   }
   
})

function clearShopList(){
    shopList.innerHTML = ""
}

function clearInput(){
        input.value = ""
    }

function appendToShoppingList(item){    
    
        let itemID = item[0]
        let itemValue = item[1]

        let newElement = document.createElement("li")
        
        newElement.textContent= itemValue
        console.log(itemValue)

        newElement.addEventListener("dblclick", function(){
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
        })
        shopList.append(newElement)
    }
    


