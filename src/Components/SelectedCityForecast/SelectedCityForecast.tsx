import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCitiesContext } from '../../Hooks/useCitesContext';
import { CityWeatherForecast, getCityDateTimeApi, getCityWeatherForecastApi } from '../../Services/cityWeatherApis';
import styles from './SelectedCityForecast.module.scss';

const getTimeListForForecast = (city_Date_Time_Name: string, dummyForecastData: CityWeatherForecast) => {
    const timeList: string[] = ['NOW'];
    const time = city_Date_Time_Name.split(', ')[1];
    const timeAndAmPm = time.split(' ');
    let hour = +timeAndAmPm[0].split(':')[0];
    let period = timeAndAmPm[1];

    for (let i = 1; i < dummyForecastData.hours.length; i++) {
        hour++;
        if (hour === 12) {
            period = period === 'AM' ? 'PM' : 'AM';
        }
        timeList.push(`${hour === 12 ? 12 : hour % 12} ${period}`);
    }

    return timeList;
}

const getWeatherIconBasedOnTemperature = (temp: number): string => {
    if (temp < 10) {
        return 'weather-icons/humidityIcon.svg';
    } else if (temp >= 10 && temp < 20) {
        return 'weather-icons/cloudyIcon.svg';
    } else {
        return 'weather-icons/sunnyIcon.svg';
    }
}

const SelectedCityForecast = () => {
    const { selectedCity } = useCitiesContext();
    const queryClient = useQueryClient();

    const {data: selectedCityDateTime} = useQuery(['selectCityDateTime', selectedCity], {
        queryFn: () => getCityDateTimeApi(selectedCity),
        onSuccess: () => {
            queryClient.invalidateQueries(['selectCityForecast']);
        },
        refetchOnMount: true
    });

    const {data: selectedCityForecast} = useQuery(['selectCityForecast', selectedCityDateTime], {
        queryFn: () => {
            if (selectedCityDateTime) {
                return getCityWeatherForecastApi(selectedCityDateTime, 5);
            }
            return Promise.reject(undefined);
        }
    });

    if(!selectedCityDateTime || !selectedCityForecast) {
        return null;
    }

    const timeList = getTimeListForForecast(selectedCityDateTime.city_Date_Time_Name, selectedCityForecast);

    return <>
    <div className={styles.forecastContainer}>
    { selectedCityForecast ? selectedCityForecast.temperature.map((temp, index) => {
        return <div key={index} className={styles.forecastFragContainer}>
            <span className={styles.forecastTime}>{timeList[index]}</span>
            <div className={styles.lineBreak}></div>
            <img className={styles.WeatherIcon} src={getWeatherIconBasedOnTemperature(parseInt(temp))}></img>
            <div>{temp}</div>
        </div>
    })
        : <div className={styles.forecastContainer + ' ' + styles.loadingForecast}>Loading forecast...</div>
    }
    </div>
    </>;
}
 
export default SelectedCityForecast;