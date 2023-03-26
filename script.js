const form = document.querySelector('[data-form]')
const formFields = form.querySelectorAll('.js-field')
const table = document.querySelector('[data-table]')
const people = JSON.parse(localStorage.getItem('people')) || []
const tbody = table.querySelector('[data-tbody]')

people.forEach(person => createPersonElement(person))

function createPersonElement(person) {
  table.classList.remove('table-invisible')

  const newTableRow = document.createElement('tr')
  newTableRow.classList.add('table-row')

  for (const prop in person) {
    if (prop !== 'id') {
      const newTd = createTableCell()
      newTd.textContent = person[prop]
      newTd.dataset.tableProp = ''
      newTableRow.appendChild(newTd)
    }
  }

  createEditButton(newTableRow, person.id)
  createRemoveButton(newTableRow, person.id)
  tbody.appendChild(newTableRow)
}

function createTableCell() {
  const tableData = document.createElement('td')
  tableData.classList.add('table-boby-data')
  tableData.dataset.tableCell = ''
  return tableData
}

function createButton() {
  const button = document.createElement('button')
  button.classList.add('table-body-button')
  button.dataset.tableButton = ''
  return button
}

function createEditButton(element, id) {
  const newTableData = createTableCell()

  const newButton = createButton()
  newButton.dataset.tableEditButton = ''
  newButton.dataset.tableEditButtonId = id
  newButton.addEventListener('click', e => {
    updatePerson(e.target.parentNode, id)
  })

  newButton.textContent = 'Editar'

  newTableData.appendChild(newButton)
  element.appendChild(newTableData)
}

function createRemoveButton(element, id) {
  const newTableData = createTableCell()

  const newButton = createButton()
  newButton.dataset.tableRemoveButton = ''
  newButton.dataset.tableRemoveButtonId = id
  newButton.addEventListener('click', e => {
    removePerson(e.target.parentNode, id)
  })

  newButton.textContent = 'X'

  newTableData.appendChild(newButton)
  element.appendChild(newTableData)
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

  person.id = people[people.length - 1] ? people[people.length - 1].id + 1 : 0
  people.push(person)
  localStorage.setItem('people', JSON.stringify(people))
  createPersonElement(person)
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

function updatePerson(element, id) {
  const tr = element.parentNode
  const tds = tr.querySelectorAll('[data-table-prop]')
  formFields.forEach((field, index) => {
    if (field.name === 'birth-date') {
      field.value = formatDateDefault(tds[index].textContent)
    } else {
      field.value = tds[index].textContent
    }
  })

  tr.remove()

  people.splice(
    people.findIndex(element => element.id === id),
    1
  )
  localStorage.setItem('people', JSON.stringify(people))
  changeVisibilityTable()
}

function removePerson(element, id) {
  const tr = element.parentNode
  people.splice(
    people.findIndex(person => person.id === id),
    1
  )
  localStorage.setItem('people', JSON.stringify(people))
  tr.remove()
  changeVisibilityTable()
}

function changeVisibilityTable() {
  if (tbody.children.length <= 0) {
    table.classList.add('table-invisible')
  }
}
