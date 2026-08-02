import logo from '../../../assets/vite.svg'
import './Footer.css'

function Footer() {
    return (
        <div className="footer">
            <div className="footer-main">
                <div className="site-identity-section">
                    <div className="identity-header">
                        <div className="logo">
                            <img src={logo} alt="Cryptography Guide logo" />
                        </div>
                    <h3>Cryptography Guide</h3>
                    </div>
                    <p>A reference and interactive toolkit for classical and modern cryptography.</p>
                </div>
                <div className="nav-section">
                    <h4>Tools</h4>
                    <p>Cipher Catalog</p>
                    <p>Frequency Analysis</p>
                    <p>Reference Tables</p>
                </div>
                <div className="about-section">
                    <h4>About</h4>
                    <p>§ Built for education</p>
                    <p>§ Step-by-step cipher breakdowns</p>
                    <p>§ 11 algorithms</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>2026 Cryptography Guide</p>
                <p>MIT License</p>
                <p>v0.0.0</p>
            </div>
        </div>
    )
}

export default Footer