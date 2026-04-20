import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './AdminLayout.module.css';

const navItems = [
  { section: 'Visão geral' },
  { to: '/admin',           label: 'Dashboard',      icon: '📊', end: true },
  { section: 'Receitas' },
  { to: '/admin/receitas',       label: 'Listar Receitas', icon: '🥗' },
  { to: '/admin/receitas/nova',  label: 'Nova Receita',    icon: '✚' },
  { section: 'Pacientes' },
  { to: '/admin/pacientes',       label: 'Listar Pacientes', icon: '👩' },
  { to: '/admin/pacientes/nova',  label: 'Nova Paciente',    icon: '✚' },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        {navItems.map((item, i) =>
          item.section ? (
            <div key={i} className={styles.section}>{item.section}</div>
          ) : (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          )
        )}

        <div className={styles.divider} />
        <button className={styles.link} onClick={() => navigate('/')}>
          <span>↩</span> Ver site
        </button>
      </aside>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
