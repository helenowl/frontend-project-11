import onChange from 'on-change';
import * as yup from 'yup';
import view from './view.js';

const uiState = { modal: '', selectedPost: null };
const St = {
  formData: {
    listURL: [],
    validation: null,
  },
}

const validURL = (url, listURL) => {
const rules = yup.string()
.url()
.notOneOf(listURL)

return rules.validate(url);

}

export default () => {
   const initialState = { ...St, uiState }
   const form = document.querySelector('form.rss-form');

  const watchedObj = onChange(initialState, (path, value, previousValue) => {
    //console.log(`Путь "${path}" изменился с ${previousValue} на ${value}`);
    view(watchedObj, path, value);
  });

  //watchedObj.modal = 'new value';

  form.addEventListener('submit', (event) => {
    console.log(`event произошел`);
    event.preventDefault()
    const formData = new FormData(event.target)
    const url = formData.get('url')
    console.log(`Url "${url}" watchedObj.formData.listURL ${watchedObj.formData.listURL}`);
    validURL(url, watchedObj.formData.listURL)
      .then((link) => {
       watchedObj.formData.listURL.push(link)
       watchedObj.formData.validation = 'true' 
       console.log(`валидный`);
      })
      .catch((err) => {
        const erKey = err.message
        watchedObj.formData.validation = 'false'
        console.log(`НЕ валидный`);
        return erKey
      })

})
};
