import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';

const inputEl = document.getElementById('search-box');
const countriesList = document.querySelector('.country-list');
const countryCard = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

let nameCountry = '';

function onSearch(e) {
  e.preventDefault();
  nameCountry = e.target.value.trim();

  fetchCountries(nameCountry)
    .then(markupCountriesHtml)
    .catch(error => {
      Notify.failure('Oops, there is no country with that name', {
        timeout: 1000,
        clickToClose: true,
        position: 'center-top',
        distance: '100px',
      });
    });
  resetData();
}

function markupCountriesHtml(countries) {
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name', {
      timeout: 1000,
      clickToClose: true,
      position: 'center-top',
      distance: '100px',
    });
    resetData();
  }
  if (countries.length >= 2 && countries.length <= 10) {
    let htmlList = countries
      .map(
        country =>
          `<li class="country-item"><img class="country-img" src="${country.flags.svg}" alt="flag of country" width="40" height="30"</img><h2 class="country-title">${country.name.official}</h2></li>`
      )
      .join('');
    countryCard.innerHTML = '';
    countriesList.innerHTML = htmlList;
  } else if (countries.length === 1) {
    htmlCard = countries
      .map(
        country =>
          `<article class="card-item"><h2 class="card-title">${
            country.name.official
          }</h2><p class="card-value"><span class="card-key">capital:</span> ${
            country.capital
          }</p><p class="card-value"><span class="card-key">population:</span> ${
            country.population
          }</p><img class="card-img" src="${
            country.flags.svg
          }" alt="flag of country" width="200" height="100"</img><p class="card-value"><span class="card-key">languages:</span> ${Object.values(
            country.languages
          )} </p></article>`
      )
      .join('');
    countryCard.innerHTML = htmlCard;
    countriesList.innerHTML = '';
  }
}

function resetData() {
  countriesList.innerHTML = '';
  countryCard.innerHTML = '';
}
