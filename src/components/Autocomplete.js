import React from 'react'
import { useState } from 'react'
import City from './City';


const Autocomplete = ({onCityClick}) => {
    const [cities, setCities] = useState([]);
    const [population, setPopulation] = useState();
    const [searchText, setSearchText] = useState('');
    const [cityName, setCityName] = useState('');

    const onChange = (e) => {
        setSearchText(e.target.value)
        // get cities
        fetch('https://api.teleport.org/api/cities/?search=' + e.target.value)
            .then(result => result.json())
            .then((data) => {
                const apiCities = data._embedded['city:search-results'];
                setCities(apiCities.map((city) => {
                    return {
                        'name': city.matching_full_name,
                        'link': city._links['city:item'].href
                    }
                }))
            })
            .catch(console.log)
    };

    const onClickCity = (data) => {
        fetch(data.link)
            .then(result => result.json())
            .then((data) => {
                setPopulation(data.population)
                setCityName(data.full_name)
                setCities([])
                setSearchText('')
                onCityClick(data.population)
            })
            .catch(console.log)
    };

    return (
        <div>
            <div style={{ display: "flex" }}>
                <input type="text" placeholder="Search for a city"
                    onChange={onChange} value={searchText}/>
                <label>Population: </label>
                <div>{population}</div>
                {cityName && <div>({cityName})</div>}
            </div>
            {cities.map((city) => <City key={city.link} data={city} onClick={onClickCity} />)}
        </div>
    )
}

export default Autocomplete
