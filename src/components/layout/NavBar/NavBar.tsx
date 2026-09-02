import "./NavBar.css";
import NavItem from "./NavItem/NavItem";

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
                matchPath="/workshop/:toolId"
            />

            <NavItem 
                title="Analysis"
                description="Investigate ciphertext and uncover patterns"
                path="/analysis/chi-squared"
                matchPath="/workshop/:analysisId"
            />

            <NavItem
                title="Detector"
                description="Identify possible ciphers"
                path="/detector"
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