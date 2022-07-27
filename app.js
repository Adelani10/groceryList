

import { alert, form, input, enterBtn, clearBtn, contList, cont, displayAlert} from "./variables.js"

let editFlag = false
let editElement;
let editId = ""
form.addEventListener("submit", mainFunction)
clearBtn.addEventListener("click", clearItems)
window.addEventListener("DOMContentLoaded", setItems)



// FUNCTIONS
function mainFunction(e){
    e.preventDefault()
    const id = new Date().getTime().toString()
    const value = input.value

    if (value && !editFlag){
        const element = document.createElement("div")
        element.classList.add("item", "flex", "justify-between", "px-2", "pb-3")
        const attr = document.createAttribute("data-id")
        attr.value = id
        element.setAttributeNode(attr)
        element.innerHTML = `<p class="text-lg">${value}</p>
                    <div class="btn-container space-x-2">
                        <button type="button" class="edit-btn text-lg text-blue-700">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button type="button" class="delete-btn text-lg text-red-500">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                    `
        const editBtn = element.querySelector(".edit-btn")
        const deleteBtn = element.querySelector(".delete-btn")
        deleteBtn.addEventListener("click", deleteItem)
        editBtn.addEventListener("click", editItem)


        contList.appendChild(element)
        cont.classList.add("show-cont")
        displayAlert("Item added successfully", "success")
        addToLocalStorage(id, value)
        setBackToDefault()
    }
    else if(value && editFlag){
        editElement.innerHTML = value 
        displayAlert("item Edited", "success")
        editLocalStorage(editId, value)
        setBackToDefault()
    }
    else{
        displayAlert("Please add an item", "danger")
    }
}


function deleteItem (e){
    const del = e.currentTarget.parentElement.parentElement
    const dataId = del.dataset.id
    contList.removeChild(del)
    if (contList.children.length === 0){
        cont.classList.remove("show-cont")
    }
    displayAlert("Item removed", "danger")
    setBackToDefault()
    removeFromLocalStorage(dataId)
}

function setBackToDefault(){
    input.value = ""
    editFlag = false
    enterBtn.textContent = "Enter"
    editId = ''
}

function clearItems(){
    const elem = document.querySelectorAll(".item")

    if(elem.length > 0)
        elem.forEach(function(item){
            contList.removeChild(item)
    })
    cont.classList.remove("show-cont")
    displayAlert("Item list erased", "danger")
    setBackToDefault()
    localStorage.removeItem('article')
}

function editItem (e){
    const del = e.currentTarget.parentElement.parentElement;
    editId = del.dataset.id

    editElement = e.currentTarget.parentElement.previousElementSibling
    editFlag = true
    input.value = editElement.innerHTML
    enterBtn.textContent = "Edit"
}

// LOCAL STORAGE

function addToLocalStorage (a, b) {
    const stuff = { firstStuff:a, secondStuff:b }
    let whereItsSaved = getStorage()
    whereItsSaved.push(stuff)
    localStorage.setItem("article", JSON.stringify(whereItsSaved))
}

function editLocalStorage(a, b) {
    let whereItsSaved = getStorage()
    whereItsSaved = whereItsSaved.map(function(eachStuff){
        if (eachStuff.firstStuff === a) {
            eachStuff.secondStuff = b
        }
        return eachStuff
    })
    localStorage.setItem("article", JSON.stringify(whereItsSaved))
}

function removeFromLocalStorage (a){
    let whereItsSaved = getStorage()
    whereItsSaved = whereItsSaved.filter(function(eachStuff){
        if (eachStuff.firstStuff !== a){
            return eachStuff
        }
    })
    localStorage.setItem("article", JSON.stringify(whereItsSaved))
}

function getStorage() {
    return localStorage.getItem('article') ? JSON.parse(localStorage.getItem('article')) : []
}


function setItems(){
    let items = getStorage()
    
        if (items.length > 0){
            items.forEach(function(item){
                createList(item.firstStuff, item.secondStuff)
            })
        }

}

function createList(id, value){
    const element = document.createElement("div")
        element.classList.add("item", "flex", "justify-between", "px-2", "pb-3")
        const attr = document.createAttribute("data-id")
        attr.value = id
        element.setAttributeNode(attr)
        element.innerHTML = `<p class="text-lg">${value}</p>
                    <div class="btn-container space-x-2">
                        <button type="button" class="edit-btn text-lg text-blue-700">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button type="button" class="delete-btn text-lg text-red-500">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                    `
        const editBtn = element.querySelector(".edit-btn")
        const deleteBtn = element.querySelector(".delete-btn")
        deleteBtn.addEventListener("click", deleteItem)
        editBtn.addEventListener("click", editItem)


        contList.appendChild(element)
        cont.classList.add("show-cont")
}

















