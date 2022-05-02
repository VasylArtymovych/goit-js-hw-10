export function countryMarkup({capital, population, languages}){
    const langList = Object.values(languages).join(', ');

    return `<p class="text-info"><b>Capital:</b>${capital}</p>
            <p class="text-info"><b>Population:</b>${population}</p>
            <p class="text-info"><b>Languages:</b>${langList}</p>`
}