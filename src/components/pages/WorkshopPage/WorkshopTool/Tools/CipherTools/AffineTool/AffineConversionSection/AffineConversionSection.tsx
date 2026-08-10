import NoticeBox from '../../../../Shared/NoticeBox/NoticeBox';
import ToolHeader from '../../../../Shared/ToolHeader/ToolHeader';
import './AffineConversionSection.css';
import AffineLetterConversionTable from './AffineLetterConversionTable/AffineLetterConversionTable';

type ConversionSectionProps = {
    text: string;
    a: number;
    b: number;
    mode: 'encrypt' | 'decrypt';
};

function AffineConversionSection({
    text,
    a,
    b,
    mode
}: ConversionSectionProps) {
    const hasText = text.trim().length > 0;

    return (
        <div className="conversion-section">

            <ToolHeader title="Letter Conversions & Modular Arithmetic" />

            {hasText ? (
                <AffineLetterConversionTable
                    text={text}
                    a={a}
                    b={b}
                    mode={mode}
                />
            ) : (
                <p>Conversion steps will appear here when text is entered.</p>
            )}

            <NoticeBox
                text={
                    mode === 'encrypt'
                        ? "Formula: Cipher = (a × Plain + b) (mod 26)"
                        : "Formula: Plain = a⁻¹ × (Cipher - b) (mod 26)"
                }
            />

        </div>
    );
}

export default AffineConversionSection;