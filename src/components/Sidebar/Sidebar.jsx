import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

import { tables } from "constants/tables";
import { databases } from "constants/databases";
import avatar from "assets/images/avatar.jpg";
import {
  ArrowRightEndOnRectangleIcon,
  CircleStackIcon,
  TableCellsIcon,
} from "@heroicons/react/24/solid";

import styles from "components/Sidebar/Sidebar.module.css";
import { setDatabaseSelected, setTableSelected } from "store/databaseSlice";

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { tableSelected, databaseSelected } = useSelector(
    (state) => state.database
  );

  const logout = () => {
    localStorage.clear();

    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.sidebar} ${styles.sidebarGradient}`}>
        <div className={styles.userInfo}>
          <img src={avatar} alt="avatar" className={styles.avatar} />
          <div>
            <p className={styles.userName}>Welcome Back,</p>
            <p className={styles.userName}>Chinmay</p>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.subContainer}>
          <div className={styles.flexAlign}>
            <CircleStackIcon className={styles.icon} />
            <p className={styles.heading}>Databases</p>
          </div>

          <div className={`${styles.databaseList} ${styles.hiddenScroll}`}>
            {databases.map((database) => (
              <div
                key={database.id}
                className={`${styles.databaseLink} ${
                  databaseSelected.id === database.id ? styles.active : ""
                }`}
                onClick={() => dispatch(setDatabaseSelected(database))}
              >
                <p>{database.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.subContainer}>
          <div className={styles.flexAlign}>
            <TableCellsIcon className={styles.icon} />
            <p className={styles.heading}>Tables</p>
          </div>
          <div className={`${styles.databaseList} ${styles.hiddenScroll}`}>
            {tables[databaseSelected.id]?.map((table) => (
              <div
                key={table.id}
                className={`${styles.databaseLink} ${
                  tableSelected.id === table.id ? styles.active : ""
                }`}
                onClick={() => dispatch(setTableSelected(table))}
              >
                <p>{table.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.logout} onClick={logout}>
          <ArrowRightEndOnRectangleIcon className={styles.icon} />
          <span>Logout</span>
        </div>
      </div>
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
}

export default Sidebar;
