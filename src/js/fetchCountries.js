let controller = new AbortController();
let signal = controller.signal;

signal.addEventListener('abort', () => console.log('cancel'));

function fetchCountries(nameCountry) {
  const url = `https://restcountries.com/v3.1/name/${nameCountry}?fields=name,capital,population,flags,languages`;

  return fetch(url)
    .then(response => {
      if (!response.ok && !nameCountry) {
        controller.abort();
      } else if (response.status === 404) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(countries => {
      console.log(countries);
      return countries;
    });
}

export { fetchCountries };
