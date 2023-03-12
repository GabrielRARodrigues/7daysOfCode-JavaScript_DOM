const form = document.querySelector('[data-form]')
const formFields = form.querySelectorAll('.js-field')

form.addEventListener('submit', event => {
  event.preventDefault()
  const formDatas = {}
  formFields.forEach(field => {
    formDatas[field.name] = field.value
  })
  console.log(formDatas)
})
