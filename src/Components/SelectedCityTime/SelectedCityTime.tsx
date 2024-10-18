import { City } from "../../Services/cityWeatherApis";
import styles from "./SelectedCityTime.module.scss";

interface CityDateAndTime {
  date: string;
  month: string;
  year: string;
  hour: string;
  min: string;
  sec: string;
  amPm: string;
}

interface SelectedCityTimeProps {
  cityDetails: City;
}

const SelectedCityTime = ({ cityDetails }: SelectedCityTimeProps) => {

  const getSelectedCityDateTime = (
    selectedCityDetails: City
  ): CityDateAndTime => {
      // "10/16/2024, 5:26:56 AM"
      return selectedCityDetails.dateAndTime.split(", ").reduce(
        (acc, dateAndTime, index) => {
          if (index === 0) {
            const [month, date, year] = dateAndTime.split("/");
            return { ...acc, month, date, year };
          } else {
            const [time, amPm] = dateAndTime.split(" ");
            const [hour, min, sec] = time.split(":");
            return {
              ...acc,
              hour,
              min,
              sec,
              amPm,
            };
          }
        },
        { date: "", month: "", year: "", hour: '', min: '', sec: '', amPm: "" }
      );
  };

  const selectedCityDateTime = getSelectedCityDateTime(cityDetails);

  return (
    <div className={styles.selectedCityDateAndTime}>
      <div className={styles.emptyContainer}></div>
      <div className={styles.selectedCityTime}>
        <span className={styles.cityTime}>{selectedCityDateTime.hour.padStart(2, '0')}</span>:
        <span className={styles.cityTime}>{selectedCityDateTime.min.padStart(2, '0')}</span>:
        <span className={styles.citySec}>{selectedCityDateTime.sec.padStart(2, '0')}</span>
        <img
          src={`general-icons/${selectedCityDateTime.amPm.toLowerCase()}.svg`}
          alt="AM/PM"
          className={styles.amPmIcon}
        />
      </div>
    </div>
  );
};

export default SelectedCityTime;
