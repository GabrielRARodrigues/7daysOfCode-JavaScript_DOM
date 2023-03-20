const form = document.querySelector('[data-form]')
const formFields = form.querySelectorAll('.js-field')

form.addEventListener('submit', event => {
  event.preventDefault()
  const formDatas = {}
  formFields.forEach(field => {
    if (field.name === 'birth-date') {
      formDatas[field.name] = formatDate(field.value)
    } else {
      formDatas[field.name] = field.value
    }
  })
  console.log(formDatas)
})

function formatDate(date) {
  const birthDateObject = new Date(date)
  const stringLocalDateFormated = `${birthDateObject.getDate() + 1}/${
    birthDateObject.getMonth() + 1
  }/${birthDateObject.getFullYear()}`
  return stringLocalDateFormated
}
