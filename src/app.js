import onChange from 'on-change';
import * as yup from 'yup';
import view from './view.js';
import i18next from 'i18next';
import resources from './locales/index.js';

const uiState = { modal: '', selectedPost: null };
const St = {
  formData: {
    listURL: [],
    validation: null,
  },
  errors: {},
}


const validURL = (url, listURL) => {
const rules = yup.string()
.url()
.notOneOf(listURL)


yup.setLocale({
  mixed: {
    notOneOf: () => ({ key: 'errors.unique_Rss' }),
  },
  string: {
    url: () => ({ key: 'errors.valid_Url' }),
  },
}) 

return rules.validate(url);

}



export default () => {
   const initialState = { ...St, uiState }
   const form = document.querySelector('form.rss-form');

   const defaultLang = 'ru'
  const i18n = i18next.createInstance()
  i18n.init({
    lng: defaultLang,
    debug: false,
    resources,
  })

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
       watchedObj.errors = {}
       watchedObj.formData.listURL.push(link)
       watchedObj.formData.validation = 'true' 
       console.log(`валидный`);
      })
      .catch((err) => {
        //const erKey = err.message
        err.errors.map((error) => {
          watchedObj.errors.error = i18n.t(error.key)
          return error
        })
        //watchedObj.errors.error = i18n.t(err.key)
        watchedObj.formData.validation = 'false'
        console.log(`НЕ валидный`);
        //console.log(err.key);
        //return erKey
      })

})
};
