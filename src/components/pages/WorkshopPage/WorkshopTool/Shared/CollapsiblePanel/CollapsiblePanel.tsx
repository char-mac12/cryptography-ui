import { useState, type ReactNode } from "react";
import "./CollapsiblePanel.css";

interface CollapsiblePanelProps {
    title: string;
    children: ReactNode;
    defaultOpen?: boolean;
}

function CollapsiblePanel({
    title,
    children,
    defaultOpen = false
}: CollapsiblePanelProps) {

    const [open, setOpen] = useState(defaultOpen);

    return (
        <section className="collapsible-panel">

            <button
                className="collapsible-header"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
            >
                <span className={`collapse-icon ${open ? "open" : ""}`}>
                    ❯
                </span>

                {title}
            </button>


            {open && (
                <div className="collapsible-content">
                    {children}
                </div>
            )}

        </section>
    );
}

export default CollapsiblePanel;