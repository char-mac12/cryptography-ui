import { NavLink, useMatch } from "react-router-dom";
import "./NavItem.css"

interface NavItemProps {
    title: string
    description: string
    path: string
    matchPath?: string;
}

function NavItem(props: NavItemProps) {
    const isExtraMatch = useMatch(props.matchPath ?? '');

    return (
        <NavLink
            className={({ isActive }) =>
                isActive || isExtraMatch 
                    ? "nav-item selected" 
                    : "nav-item"
            }
            to={props.path}
        >
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </NavLink>
    )
}

export default NavItem