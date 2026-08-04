import logo from '../../../assets/crypto.png'
import './Header.css'

function Header() {
    return (
        <header className="header">
            <div className="header-left">
                <div className="logo">
                    <img src={logo} alt="Cryptography Guide logo" />
                </div>
                <div className="site-identity">
                    <h1>Cryptography Guide</h1>
                    <p>CRYPTOGRAPHY TOOLS & ANALYSIS</p>
                </div>
            </div>

            <div className="header-divider"></div>
            
            <div className="status-info">
                <span>11 algorithms · 5 categories</span>
            </div>
        </header>
    )
}

export default Header