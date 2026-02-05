import { useNavigate } from 'react-router-dom';
import { T } from '../lib/theme';
import { Icons } from './Icons';

export function BottomNav({ active }) {
  const navigate = useNavigate();

  const items = [
    { id: "dashboard", icon: Icons.Home, label: "Home", path: "/dashboard" },
    { id: "coach", icon: Icons.Chat, label: "Coach", path: "/coach" },
    { id: "library", icon: Icons.Leaf, label: "Wellness", path: "/library" },
    { id: "settings", icon: Icons.Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      background: T.dark,
      padding: "8px 0 28px",
      display: "flex",
      justifyContent: "space-around",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      zIndex: 100,
    }}>
      {items.map((item) => {
        const isActive = active === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              padding: "8px 16px",
              color: isActive ? T.accentLight : "rgba(255,255,255,0.4)",
              transition: "color 0.2s",
              cursor: "pointer",
              border: "none",
              background: "none",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <Icon size={22} />
            <span style={{
              fontSize: 10,
              fontWeight: isActive ? 600 : 400,
              letterSpacing: "0.03em",
            }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
