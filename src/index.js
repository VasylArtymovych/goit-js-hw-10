import './css/styles.css';
import {fetchCountries} from './fetchCountries'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var debounce = require('lodash.debounce');

const refs ={
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    text: document.querySelector('.country-info')
}
const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(searchHandler, DEBOUNCE_DELAY));

function searchHandler(evt){
    const country = (evt.target.value).trim();
    
    if (country){
        fetchCountries(country).then(countries => {
            if (countries.length === 1){
                console.log(countries);
                appendCountriesList(countries);
                countryMarkup(countries[0]);
            }else if (countries.length >=2 &&  countries.length <= 10){
                console.log(countries);
                appendCountriesList(countries)
            }else {
                Notify.failure("Too many matches found. Please enter a more specific name.");
            }
           
        })
    }
    
}


function appendCountriesList(countries){
    const markup = countries.map(countriesListMarkup).join('');
    refs.list.insertAdjacentHTML('beforeend', markup);
}

function countriesListMarkup({name, flags}){
    return `<li class="list-item">
    <img src="${flags.svg}" class="item_icon" width="30px" height="20px">
    ${name.official}
  </li>`
}

function countryMarkup({ capital, population, languages}){
    const markup = `<p class="text-info"><b>Capital:</b>${capital}</p>
    <p class="text-info"><b>Population:</b>${population}</p>
    <p class="text-info"><b>Languages:</b>${languages}</p>`
    refs.text.insertAdjacentHTML('beforeend', markup);
}

