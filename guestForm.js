//65130500014 ชนะชัย ใหม่น้อย
import { createGuestList } from './data/guestdata.js'
// const createGuestList = require('./data/guestdata.js')
const guestList = createGuestList()
function guestForm() {
  //provide initial guests data list created from GuestManagement class
  let guests = guestList

  // 1. register event for searching and adding
  function registerEventHandling() {
    document.getElementById('search-input').addEventListener('keyup', searchGuest)
    document.getElementById('add-guest-btn').addEventListener('click', addGuest)
  }

  // 2. Function to display one guest in the display area
  function displayGuest(guestItem) {
    const displayarea = document.querySelector('#display-area')
    const div = document.createElement('div')
    const name = document.createElement('span')
    name.innerHTML = `${guestItem.firstname} ${guestItem.lastname}`
    const removeBtn = document.createElement('span')
    removeBtn.setAttribute('class', 'remove-icon')
    removeBtn.setAttribute('id', `${guestItem.firstname}-${guestItem.lastname}`)
    removeBtn.setAttribute('style', 'cursor:pointer;color:red')
    removeBtn.innerHTML = `[X]`

    displayarea.append(div)
    div.append(name , removeBtn)

    //add eventlistener for remove Btn
    removeBtn.addEventListener('click', removeGuest)
  }

  // 3. Function to display all existing guests in the display area
  function displayGuests(guestResult) {
    const oldItem = document.getElementById('display-area')
    while (oldItem.firstElementChild) {
      oldItem.removeChild(oldItem.firstElementChild)
    }
    guestResult.forEach(guestItem => {
      displayGuest(guestItem)
    });
  }

  // 4. Function to search and display matching guests
  function searchGuest(event) {
    const search = event.target
    if(!search.value){
      return displayGuests(guestList.getAllGuests())
    }
    const result = guestList.searchGuests(search.value)
    displayGuests(result)
  }

  // 5. Function to add a new guest
  function addGuest() {
    const firstname = document.getElementById('firstname-input').value
    const lastname = document.getElementById('lastname-input').value
    guestList.addNewGuest(firstname, lastname)
    displayGuest({firstname, lastname})
    document.getElementById('firstname-input').value = ''
    document.getElementById('lastname-input').value = ''
    console.log(`add ${firstname + lastname} done`)
  }

  // 6. Function to remove a guest
  function removeGuest(event) {
    const removeBtn = event.target
    const name = removeBtn.getAttribute('id').split('-')
    const guestItem = {
      firstname: name[0],
      lastname: name[1]
    }
    guestList.removeGuest(guestItem)
    displayGuests(guestList.getAllGuests())
  }

  return {
    registerEventHandling,
    displayGuests,
    searchGuest,
    addGuest,
    removeGuest
  }
}
// module.exports = guestForm
export { guestForm }
const { registerEventHandling, displayGuests } = guestForm()
registerEventHandling()
displayGuests(guestList.getAllGuests())


