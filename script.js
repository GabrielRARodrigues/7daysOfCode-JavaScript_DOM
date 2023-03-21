const form = document.querySelector('[data-form]')
const formFields = form.querySelectorAll('.js-field')
const table = document.createElement('table')
const formPeople = []

form.addEventListener('submit', event => {
  event.preventDefault()
  const formDataPerson = {}
  formFields.forEach(field => {
    if (field.name === 'birth-date') {
      formDataPerson[field.name] = formatDate(field.value)
    } else {
      formDataPerson[field.name] = field.value
    }
    field.value = ''
  })
  formPeople.push(formDataPerson)
  localStorage.setItem('formDataPeople', JSON.stringify(formPeople))
  createTableWithFormData()
})

function formatDate(date) {
  const birthDateObject = new Date(date)
  const stringLocalDateFormated = `${birthDateObject.getDate() + 1}/${
    birthDateObject.getMonth() + 1
  }/${birthDateObject.getFullYear()}`
  return stringLocalDateFormated
}

function createTableWithFormData() {
  const dataFormPeople =
    JSON.parse(localStorage.getItem('formDataPeople')) || []

  if (dataFormPeople.length == 0) {
    return
  }
  table.innerHTML = `
  <thead data-thead>
    <tr>
      <th>Nome</th>
      <th>Data de Nascimento</th>
    </tr>
  </thead>
  <tbody data-tbody>
  </tbody>
  `
  dataFormPeople.forEach(people => {
    table.querySelector('[data-tbody]').innerHTML += `
    <tr>
      <td>${people.name}</td>
      <td>${people['birth-date']}</td>
    </tr>
    `
    document.body.appendChild(table)
  })
}

createTableWithFormData()
