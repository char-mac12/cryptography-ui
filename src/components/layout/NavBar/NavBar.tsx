import "./NavBar.css";
import NavItem from "./NavItem";

function NavBar() {
    return (
        <nav className="navigation-bar">
            <NavItem
                title="Tool Catalog"
                description="Explore cryptography ciphers and tools"
                path="/catalog"
            />

            <NavItem
                title="Workshop"
                description="Encrypt and decrypt messages"
                path="/workshop/caesar"
                matchPath="/workshop/:cipherId"
            />

            <NavItem
                title="Detector"
                description="Identify possible ciphers"
                path="/detector"
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