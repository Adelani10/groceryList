const alert = document.querySelector(".alert")
const form = document.querySelector(".form")
const input = document.querySelector(".input")
const enterBtn = document.querySelector(".enter-btn")
const clearBtn = document.querySelector(".clear-btn")
const contList = document.querySelector(".cont-list")
const cont = document.querySelector(".cont")


function displayAlert (text, action) {
    alert.textContent = text
    alert.classList.add(action)
    

    setTimeout(function removeAlert () {
        alert.textContent = ""
        alert.classList.remove(action)
    }, 1000)
}






export {alert, form, input, enterBtn, clearBtn, contList, cont, displayAlert};