const inputURL = document.querySelector('#url-input')

export default (watchedObj, path, value) => {
      if (watchedObj.formData.validation === 'true') {
    inputURL.classList.remove('is-invalid')
    inputURL.value = ''
    inputURL.focus()
  }
  else if (watchedObj.formData.validation === 'false') {
    inputURL.classList.add('is-invalid')
  }
}
