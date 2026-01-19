import { NavLink } from "react-router-dom";
import { roleBasedMenu } from "../utils/roleBasedMenu";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
    const { role } = useAuth();
    const menu = roleBasedMenu[role] || [];

    return (
        <aside className="sidebar">
            {menu.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    {item.label}
                </NavLink>
            ))}
        </aside>
    );
};

export default Sidebar;
