import CurrentCityComponent from '../Components/CurrentCitySectionComponent/CurrentCitySectionComponent';
import styles from './DashBoard.module.scss';

const DashBoard = () => {
    return <div className={styles.dashboardContainer}>
        <CurrentCityComponent />
    </div>;
}
 
export default DashBoard;