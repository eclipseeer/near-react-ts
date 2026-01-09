import { Main } from './Main/Main.tsx';
import { Topbar } from './Topbar/Topbar.tsx';
import styles from './App.module.css';

export const App = () => {
  return (
    <div className={styles.app}>
      <Topbar />
      <Main />
    </div>
  );
};
