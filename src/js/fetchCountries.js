import { refs } from './refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import countryListTemplate from '../templates/countryList.hbs';
import countryTemplate from '../templates/country.hbs';


const url = 'https://restcountries.com/v2/name/';
const secondPartUrl = '?fields=name,population,languages,capital,flags';
const notify = Notify;


export default function fetchCountries(e) {
  const name = e.target.value.trim();
  if (name === '') {
    return;
  }
  fetch(url + name + secondPartUrl)
    .then(response => response.json())
    .then(resultService)
  .catch(onError);
};

function resultService(result) {
      if (result.length === 1) {
        countryMarkup(result);
      } else if (result.length > 10) {
        tooBigFetch();
        return;
      } else if (result.status === 404) {
        return error;
      } else {
        countryListMarkup(result);
  }
}

function onError() {
  notify.failure('Oops, there is no country with that name');
};

function tooBigFetch() {
  notify.info('Too many matches found. Please enter a more specific name.');
}

function countryMarkup(country) {
  clearContainers();
  const markup = countryTemplate(country);
  refs.countryInfo.innerHTML = markup;
};

function countryListMarkup(countryList) {
  clearContainers();
  const markup = countryListTemplate(countryList);
  refs.countryList.innerHTML = markup;
};

function clearContainers() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}