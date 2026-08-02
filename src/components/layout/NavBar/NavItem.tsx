import "./NavItem.css"

interface NavItemProps {
    title: string
    description: string
    isSelected: boolean
    onClick: () => void
}

function NavItem(props: NavItemProps) {
    return (
        <button
            className={props.isSelected ? "nav-item selected" : "nav-item"}
            onClick={props.onClick}
        >
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </button>
    )
}

export default NavItem