const form = document.querySelector('[data-form]')
const formFields = form.querySelectorAll('.js-field')
const table = document.querySelector('[data-table]')
const people = JSON.parse(localStorage.getItem('people')) || []

function createPeopleTable() {
  if (people.length <= 0) {
    return
  }

  table.classList.remove('table-invisible')
  const tbody = table.querySelector('[data-tbody]')
  tbody.innerHTML = ''
  people.forEach(person => {
    const newTableRow = document.createElement('tr')
    newTableRow.classList.add('table-row')
    newTableRow.innerHTML = ` 
    <td class="table-boby-data" data-table-cell>${person.name}</td>
    <td class="table-boby-data" data-table-cell>${person['birth-date']}</td>
    `
    createEditButton(newTableRow)
    createRemoveButton(newTableRow)
    tbody.appendChild(newTableRow)
  })
}

createPeopleTable()

function createEditButton(element) {
  const tableData = document.createElement('td')
  tableData.classList.add('table-boby-data')
  tableData.setAttribute('data-table-cell', '')

  const newButton = document.createElement('button')
  newButton.classList.add('table-body-button')
  newButton.setAttribute('data-table-button', '')
  newButton.addEventListener('click', e => {
    updatePerson(e.target)
  })
  newButton.textContent = 'Editar'

  tableData.appendChild(newButton)
  element.appendChild(tableData)
}

function createRemoveButton(element) {
  const tableData = document.createElement('td')
  tableData.classList.add('table-boby-data')
  tableData.setAttribute('data-table-cell', '')

  const newButton = document.createElement('button')
  newButton.classList.add('table-body-button')
  newButton.setAttribute('data-table-button', '')
  newButton.addEventListener('click', e => {
    removePerson(e.target)
  })
  newButton.textContent = 'X'

  tableData.appendChild(newButton)
  element.appendChild(tableData)
}

form.addEventListener('submit', event => {
  event.preventDefault()

  const person = {}

  formFields.forEach(field => {
    if (field.name === 'birth-date') {
      person[field.name] = formatDateLocal(field.value)
    } else {
      person[field.name] = field.value
    }
    field.value = ''
  })

  people.push(person)
  localStorage.setItem('people', JSON.stringify(people))
  createPeopleTable()
})

function formatDateLocal(date) {
  const birthDateObject = new Date(date)
  const stringLocalDateFormated = `${birthDateObject.getDate() + 1}/${
    (birthDateObject.getMonth() + 1).toString().length <= 1
      ? '0' + (birthDateObject.getMonth() + 1).toString()
      : (birthDateObject.getMonth() + 1).toString()
  }/${birthDateObject.getFullYear()}`
  return stringLocalDateFormated
}

function formatDateDefault(dateString) {
  const dateWithHyphen = dateString.replace(/\/+/g, '-')
  const dateFormatedToDefault = dateWithHyphen.replace(
    /(\d\d)-(\d\d)-(\d\d\d\d)/g,
    '$3-$2-$1'
  )
  return dateFormatedToDefault
}

function updatePerson(element) {
  const tr = element.parentNode.parentNode
  const tds = tr.children
  const name = tds[0].textContent
  const birthDate = tds[1].textContent
  formFields[0].value = name
  formFields[1].value = formatDateDefault(birthDate)
  people.splice(
    people.findIndex(
      person => person.name === name && person['birth-date'] === birthDate
    ),
    1
  )
  localStorage.setItem('people', JSON.stringify(people))
  createPeopleTable()
  tr.remove()
}

function removePerson(element) {
  const tr = element.parentNode.parentNode
  const tds = tr.children
  const name = tds[0].textContent
  const birthDate = tds[1].textContent
  people.splice(
    people.findIndex(
      person => person.name === name && person['birth-date'] === birthDate
    ),
    1
  )
  localStorage.setItem('people', JSON.stringify(people))
  tr.remove()
}

