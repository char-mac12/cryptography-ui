import "./ReferenceBox.css";

type ReferenceBoxProps = {
    title: string;
    children: React.ReactNode;
};

function ReferenceBox({ title, children }: ReferenceBoxProps) {
    return (
        <div className="reference-box">
            <h3 className="reference-box-title">
                {title}
            </h3>

            <div className="reference-box-content">
                {children}
            </div>
        </div>
    );
}

export default ReferenceBox;