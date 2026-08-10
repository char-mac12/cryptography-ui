import VigenereLetterConversionTable from './VigenereLetterConversionTable/VigenereLetterConversionTable';
import './VigenereConversionSection.css';
import ToolHeader from '../../../../Shared/ToolHeader/ToolHeader';
import NoticeBox from '../../../../Shared/NoticeBox/NoticeBox';

type Props = {
    text: string;
    keyword: string;
    mode: 'encrypt' | 'decrypt';
};

function VigenereConversionSection({
    text,
    keyword,
    mode
}: Props) {

    const hasText = text.trim().length > 0;
    const hasKeyword = keyword.trim().length > 0;

    return (
        <div className="conversion-section">
            <ToolHeader title="Letter Conversions & Repeating Keyword" />

            {hasText && hasKeyword ? (
                <VigenereLetterConversionTable
                    text={text}
                    keyword={keyword}
                    mode={mode}
                />
            ) : (
                <p>Conversion steps will appear here when text and a keyword are entered.</p>
            )}

            <NoticeBox
                text={
                    mode === "encrypt"
                        ? "Formula: Cipher = (Plain + Keyword) mod 26"
                        : "Formula: Plain = (Cipher − Keyword + 26) mod 26"
                }
            />
        </div>
    );
}

export default VigenereConversionSection;