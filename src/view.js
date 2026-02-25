const inputURL = document.querySelector('#url-input')
const feedBack = document.querySelector('p.feedback')

export default (watchedObj, path, value) => {
      if (watchedObj.formData.validation === 'true') {
    inputURL.classList.remove('is-invalid')
    inputURL.value = ''
    inputURL.focus()
  }
  else if (watchedObj.formData.validation === 'false') {
    inputURL.classList.add('is-invalid')
    feedBack.textContent = watchedObj.errors.error
    console.log(watchedObj.errors.error);
  }
}
