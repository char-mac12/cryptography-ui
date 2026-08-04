import "./NavBar.css";
import NavItem from "./NavItem";

function NavBar() {
    return (
        <nav className="navigation-bar">
            <NavItem
                title="Cipher Catalog"
                description="Explore classical ciphers"
                path="/catalog"
            />

            <NavItem
                title="Workshop"
                description="Encrypt and decrypt messages"
                path="/workshop/caesar"
            />

            <NavItem
                title="Frequency Analysis"
                description="Analyse letter patterns"
                path="/frequency"
            />

            <NavItem
                title="Reference"
                description="Learn about cryptography"
                path="/reference"
            />
        </nav>
    )
}

export default NavBar;