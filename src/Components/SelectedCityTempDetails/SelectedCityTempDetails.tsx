import { City } from "../../Services/cityWeatherApis";
import styles from "./SelectedCityTempDetails.module.scss";

interface SelectedCityTempDetailsProps {
  cityDetails: City;
}

const SelectedCityTempDetails = ({ cityDetails }: SelectedCityTempDetailsProps ) => {
    const convertToFahrenheit = (celsius: string): string => {
        return `${(parseInt(celsius) * 9/5) + 32} °F`;
    };

  return (
    <div className={styles.selectedCityTempDetails}>
      <div className={styles.cityTempDetailsFragment}>
        <label htmlFor="cityTempC" className={styles.selectedCityTempLabel}>
          Temperature °C
        </label>
        <span id="cityTempC" className={styles.selectedCityTempC}>
          {cityDetails.temperature}
        </span>
      </div>
      <span className={styles.lineBreak}></span>
      <div className={styles.cityTempDetailsFragment}>
        <label htmlFor="cityHumid" className={styles.selectedCityTempLabel}>
          Humidity
        </label>
        <span id="cityHumid" className={styles.selectedCityHumidity}>
          {cityDetails.humidity}
        </span>
      </div>
      <div className={styles.cityTempDetailsFragment}>
        <label htmlFor="cityTempF" className={styles.selectedCityTempLabel}>
          Temperature °F
        </label>
        <span id="cityTempF" className={styles.selectedCityTempF}>
          {convertToFahrenheit(cityDetails.temperature)}
        </span>
      </div>
      <span className={styles.lineBreak}></span>
      <div className={styles.cityTempDetailsFragment}>
        <label htmlFor="cityPrecip" className={styles.selectedCityTempLabel}>
          Precipitation
        </label>
        <span id="cityPrecip" className={styles.selectedCityPrecip}>
          {cityDetails.precipitation}
        </span>
      </div>
    </div>
  );
};

export default SelectedCityTempDetails;
