import NavItem from "../../layout/NavBar/NavItem/NavItem";
import "./ReferencePage.css";

function ReferencePage() {
    return (
        <section className="reference-page">
            <h1>Reference</h1>

            <p>
                Explore the history, terminology, and reference material
                behind cryptography.
            </p>

            <div className="reference-options">
                <NavItem
                    title="Timeline"
                    description="Explore the history and development of cryptography"
                    path="/reference/timeline"
                />

                <NavItem
                    title="Definitions"
                    description="Learn key cryptography terms and concepts"
                    path="/reference/definitions"
                />

                <NavItem
                    title="Tables"
                    description="View useful cryptography reference tables"
                    path="/reference/tables"
                />
            </div>
        </section>
    );
}

export default ReferencePage;