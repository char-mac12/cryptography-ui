import NoticeBox from '../../../../Shared/NoticeBox/NoticeBox'
import ToolHeader from '../../../../Shared/ToolHeader/ToolHeader'
import './CaesarConversionSection.css'
import LetterConversionTable from './CaesarLetterConversionTable/CaesarLetterConversionTable'

type ConversionSectionProps = {
    text: string;
    shift: number;
    mode: 'encrypt' | 'decrypt';
};

function CaesarConversionSection({ text, shift, mode }: ConversionSectionProps) {
    const hasText = text.trim().length > 0;
    
    return (
        <div className="conversion-section">
            <ToolHeader title={"Letter Conversions & Modular Arithmetic"} />
            
            {hasText ? (
                <LetterConversionTable
                    text={text}
                    shift={shift}
                    mode={mode}
                />
            ) : (
                <p>Conversion steps will appear here when text is entered.</p>
            )}
            
            <NoticeBox 
                text={
                    mode === 'encrypt'
                        ? "Formula: Cipher = (Plain + Shift) mod 26"
                        : "Formula: Plain = (Cipher - Shift + 26) mod 26"
                } 
            />
        </div>
    )
}

export default CaesarConversionSection