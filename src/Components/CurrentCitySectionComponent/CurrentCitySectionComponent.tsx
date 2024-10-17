import { ChangeEvent, useState } from 'react';
import { useCitiesContext } from '../../Hooks/useCitesContext';
import styles from './CurrentCitySectionComponent.module.scss';
import { City } from '../../Services/cityWeatherApis';
import SelectedCityTempDetails from '../SelectedCityTempDetails/SelectedCityTempDetails';
import SelectedCityTime from '../SelectedCityTime/SelectedCityTime';
import SelectedCityForecast from '../SelectedCityForecast/SelectedCityForecast';

const CurrentCityComponent = () => {
    const { cities, selectedCity, setSelectedCity } = useCitiesContext();
    const [validCitySelected, setIfValidCitySelected] = useState<boolean>(false);
    const [selectedCityDetails, setSelectedCityObject] = useState<City | undefined>(undefined);

    const handleDatalistChange = (e: ChangeEvent<HTMLInputElement>) => {
        const updatedCity = e.target.value;
        const isSelectedCityValid = cities?.some(city => city.cityName === updatedCity) ?? false;

        if(isSelectedCityValid) {
            const updatedCityDetails = getSelectedCityDetails(updatedCity);
            setSelectedCity(updatedCity);
            setSelectedCityObject(() => updatedCityDetails);
        } else {
            setSelectedCityObject(undefined);
            setSelectedCity('');
        }
        setIfValidCitySelected(isSelectedCityValid);
    };

    const cityNames = cities?.map(city => city.cityName) ?? [];

    const getSelectedCityDetails = (updatedCity?: string): City | undefined => {
        return cities?.find(city => city.cityName === updatedCity);
    }

    return <>
        <div className={styles.selectedCityWithTempContainer}>
            <div className={styles.selectedCityContainer}>
                <div className={styles.selectedCityInnerContainer}>
                    { validCitySelected
                    ? 
                        <img src={`public/city-icons/${selectedCity}.svg`} alt='City Icon' className={styles.selectedCityIcon}/>
                    : <span className={styles.selectedCityIcon}>Select a city</span> }
                        <input list="cities" onChange={(e) => handleDatalistChange(e)} name="cities" id="citySelectorDropDown" className={styles.citiesDropDown}/>
                        <datalist id="cities">
                            {cityNames.map(cityName => <option key={cityName} value={cityName} className={styles.options} />)}
                        </datalist>
                </div>
                { selectedCityDetails
                &&<SelectedCityTime cityDetails={selectedCityDetails}/>
                }
            </div>
            { selectedCityDetails
            && <>
                <SelectedCityTempDetails cityDetails={selectedCityDetails} />
                <SelectedCityForecast />
            </>
            }
        </div>
    </>;
}

export default CurrentCityComponent;