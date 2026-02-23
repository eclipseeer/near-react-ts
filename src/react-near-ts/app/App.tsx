import styles from './App.module.css';
import { Main } from './MainMini/Main.tsx';
import { Topbar } from './Topbar/Topbar.tsx';

export const App = () => {
  return (
    <div className={styles.app}>
      <Topbar />
      <Main />
    </div>
  );
};
