import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo} onClick={() => navigate('/')}>
        Nutri<span>Receitas</span>
      </div>

      <div className={styles.links}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          Início
        </NavLink>
        <NavLink
          to="/receitas"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          Receitas
        </NavLink>
      </div>

      <button className={styles.btnAdmin} onClick={() => navigate('/admin')}>
        Área Admin
      </button>
    </nav>
  );
}
