import BottomSectionComponent from '../Components/BottomSectionComponent/BottomSectionComponent';
import CurrentCityComponent from '../Components/CurrentCitySectionComponent/CurrentCitySectionComponent';
import MiddleSectionComponent from '../Components/MiddleSectionComponent/MiddleSectionComponent';
import { useCitiesContext } from '../Hooks/useCitesContext';
import styles from './DashBoard.module.scss';

const DashBoard = () => {
    const { isCitiesLoading } = useCitiesContext();
    if (isCitiesLoading) {
        return <div className={styles.loadingCities}>Loading...</div>;
    }

    return <div className={styles.dashboardContainer}>
        <CurrentCityComponent />
        <MiddleSectionComponent />
        <BottomSectionComponent />
    </div>;
}
 
export default DashBoard;