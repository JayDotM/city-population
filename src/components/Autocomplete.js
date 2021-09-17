import React from 'react'
import { useState } from 'react'
import City from './City';


const Autocomplete = ({ onCityClick }) => {
    const [cities, setCities] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [{population, cityName}, setCity] = useState({population: '', cityName: ''});

    async function onChange(e) {
        setSearchText(e.target.value)
        const searchEndpoint = 'https://api.teleport.org/api/cities/?search=';
        const searchResult = await fetch(searchEndpoint + e.target.value).then(result => result.json());
        const apiCities = searchResult._embedded['city:search-results'];
        setCities(apiCities.map((city) => {
            return {
                'name': city.matching_full_name,
                'link': city._links['city:item'].href
            }
        }))
    };

    async function onClickCity(data) {
        const cityData = await fetch(data.link).then(result => result.json());
        setCity({
            population: cityData.population, 
            cityName: cityData.full_name
        });

        setCities([])
        setSearchText('')

        onCityClick(cityData.population)
    };

    return (
        <div>
            <div style={{ display: "flex" }}>
                <input type="text" placeholder="Search for a city"
                    onChange={onChange} value={searchText} />
                <label>Population: </label>
                <div>{population}</div>
                {cityName && <div>({cityName})</div>}
            </div>
            {cities.map((city) => <City key={city.link} data={city} onClick={onClickCity} />)}
        </div>
    )
}

export default Autocomplete
