import { useState } from 'react';
import styles from './MiddleSectionComponent.module.scss';
import { useCitiesContext } from '../../Hooks/useCitesContext';

const enum QuickWeatherType {
    'sunny' = 'sunny',
    'snowy' = 'snowy',
    'rainy' = 'rainy',
}

const getWeatherIcon = (temperature: number) => {
    if(temperature > 30) {
        return 'weather-icons/sunnyIcon.svg';
    } else if(temperature < 10) {
        return 'weather-icons/snowflakeIcon.svg';
    } else {
        return 'weather-icons/rainyIcon.svg';
    }
}

const MiddleSectionComponent = () => {
    const {cities} = useCitiesContext();

    const [selectedWeather, setSelectedWeather] = useState<QuickWeatherType>(QuickWeatherType.sunny);
    const [displayTop, setDisplayTop] = useState<number>(7);
    const handleDisplayTopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDisplayTop(parseInt(e.target.value));
    }

    const citiesToDisplay = cities && cities.filter(city => {
        if(selectedWeather === QuickWeatherType.sunny) {
            return parseInt(city.temperature) > 30;
        } else if(selectedWeather === QuickWeatherType.snowy) {
            return parseInt(city.temperature) < 10;
        } else {
            return parseInt(city.temperature) >= 10 && parseInt(city.temperature) <= 30;
        }
    });

    return <div className={styles.middleSectionContainer}>
        <div className={styles.middleSectionTopContainer}>
            <div className={styles.emptyDiv}></div>
            <div className={styles.topCities}>Top cities around world</div>
            <div className={styles.weatherPreferenceContainer}>
                <img className={`${styles.weatherIcon} ${selectedWeather==QuickWeatherType.sunny ? styles.active : ''}`} onClick={() => setSelectedWeather(QuickWeatherType.sunny)} alt='sunny' src="weather-icons/sunnyIcon.svg"/>
                <img className={`${styles.weatherIcon} ${selectedWeather==QuickWeatherType.snowy ? styles.active : ''}`} onClick={() => setSelectedWeather(QuickWeatherType.snowy)} alt='snowy' src="weather-icons/snowflakeIcon.svg"/>
                <img className={`${styles.weatherIcon} ${selectedWeather==QuickWeatherType.rainy ? styles.active : ''}`} onClick={() => setSelectedWeather(QuickWeatherType.rainy)} alt='rainy' src="weather-icons/rainyIcon.svg"/>
                <span className={styles.displayTopText}>Display Top</span>
                <input type="number" className={styles.displayTopSpinner} value={displayTop} min='3' max='20' onChange={handleDisplayTopChange}/>
             </div>
        </div>
        <div className={styles.middleSectionCitiesContainer}>
            {citiesToDisplay && citiesToDisplay.slice(0, displayTop).map(city => {
                return(
                <div className={styles.middleSectionCityTile} key={city.cityName} style={{backgroundImage: `url(city-icons/${city.cityName}.svg)`}}>
                    <div className={styles.nameAndTemperature}>
                        <span className={styles.cityName}>{city.cityName}</span>
                        <span className={styles.cityTemp}>
                            <img className={styles.cityTempIcon} src={getWeatherIcon(parseInt(city.temperature))} alt='weather'/>
                            <p>{city.temperature}</p>
                        </span>
                    </div>
                    <div className={styles.weatherDetails}>
                        <span className={styles.weatherDetail}>
                            <img className={styles.weatherDetailIcon} src="weather-icons/humidityIcon.svg" alt='wind'/>
                            <p>{city.humidity}</p>
                            </span>
                        <span className={styles.weatherDetail}>
                            <img className={styles.weatherDetailIcon} src="weather-icons/precipitationIcon.svg" alt='wind'/>
                            <p>{city.precipitation}</p>
                            </span>
                    </div>
                </div>)
            })}
        </div>
    </div>;
}
 
export default MiddleSectionComponent;