import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";

import home from "assets/svg/home.svg";
import styles from "pages/Home/Home.module.css";

import ViewSelector from "components/ViewSelector/ViewSelector";

import {
  barCharts,
  lineCharts,
  pieCharts,
  scatterChart,
} from "constants/charts";
import TableView from "pages/Home/TableView";

function Home() {
  const { tableSelected, viewSelected } = useSelector(
    (state) => state.database
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (viewSelected) {
      setIsLoading(true);

      const timeout = setTimeout(() => setIsLoading(false), 500);

      return () => clearTimeout(timeout);
    }
  }, [viewSelected]);

  const getCharts = () => {
    const chartsMap = {
      barChart: barCharts,
      lineChart: lineCharts,
      pieChart: pieCharts,
      scatterPlot: scatterChart,
    };

    return chartsMap[viewSelected] || [];
  };

  return (
    <div className={styles.container}>
      {tableSelected.id && <ViewSelector />}

      <div className={styles.charts}>
        {isLoading && (
          <div className={styles.loader}>
            <PulseLoader color={"#17ddd6"} />
          </div>
        )}

        {!isLoading && viewSelected === "table" && <TableView />}

        {!isLoading &&
          getCharts().map((container) => (
            <div className="chartWrapper" key={container.title}>
              <span>{container.title}</span>
              {container.component}
            </div>
          ))}

        {!tableSelected.id && !isLoading && (
          <div className={styles.subContainer}>
            <img src={home} alt="image" className={styles.image} />
            <span>
              Please select a database and table to check predefined queries.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
