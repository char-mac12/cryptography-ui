import { NavLink } from "react-router-dom";
import "./NavItem.css"

interface NavItemProps {
    title: string
    description: string
    path: string
}

function NavItem(props: NavItemProps) {
    return (
        <NavLink
            className={({ isActive }) =>
                isActive ? "nav-item selected" : "nav-item"
            }
            to={props.path}
        >
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </NavLink>
    )
}

export default NavItem