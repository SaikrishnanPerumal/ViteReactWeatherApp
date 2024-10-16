import BottomSectionComponent from '../Components/BottomSectionComponent/BottomSectionComponent';
import CurrentCityComponent from '../Components/CurrentCitySectionComponent/CurrentCitySectionComponent';
import MiddleSectionComponent from '../Components/MiddleSectionComponent/MiddleSectionComponent';
import styles from './DashBoard.module.scss';

const DashBoard = () => {
    return <div className={styles.dashboardContainer}>
        <CurrentCityComponent />
        <MiddleSectionComponent />
        <BottomSectionComponent />
    </div>;
}
 
export default DashBoard;