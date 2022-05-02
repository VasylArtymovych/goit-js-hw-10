import './css/styles.css';
import {fetchCountries} from './js/fetchCountries'
import {countryMarkup} from './js/countryMurkup.js'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import templateFunction from './templates/countries.hbs'
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
    clearMurkup();

    if (country){
        fetchCountries(country).then(countries => {
            
            if (countries.length === 1){              
                appendCountries(countries);
                appendCountryInfo(countries);

            }else if (countries.length >=2 &&  countries.length <= 10){
                appendCountries(countries);
                

            }else if (countries.length > 10){
                Notify.warning("Too many matches found. Please enter a more specific name.");
            }
        })
        .catch(err => {
            console.dir(err);
            Notify.failure("Oops, there is no country with that name");
        })
    }
    
}


function appendCountries(countries){
    refs.list.insertAdjacentHTML('beforeend', templateFunction(countries));
}

function appendCountryInfo(countries){
    refs.text.insertAdjacentHTML('beforeend', countryMarkup(countries[0]));
}

function clearMurkup(){
    refs.list.innerHTML = '';
    refs.text.innerHTML = '';
}


Notify.init({
    warning: {
        background: '#6291EF',
    },
})