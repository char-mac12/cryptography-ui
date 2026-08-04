import NoticeBox from '../Shared/NoticeBox/NoticeBox'
import ToolHeader from '../Shared/ToolHeader/ToolHeader'
import FrequencyChart from './FrequencyChart/FrequencyChart'
import './FrequencySection.css'

type FrequencySectionProps = {
    mode: 'encrypt' | 'decrypt'
    plaintext: string;
    ciphertext: string;
}

function FrequencySection({ mode, plaintext, ciphertext }: FrequencySectionProps) {
    const text = mode === 'encrypt' ? plaintext : ciphertext;
    const hasText = text.trim().length > 0;
    
    const noticeText = "Notice: When a Caesar Cipher shifts text the shape is identical, just displaced by the shift amount. This is why frequency analysis is very effective at breaking monoalphabetic substitutions.";

    return (
        <div className="frequency-section">
            <ToolHeader title="Frequency Analysis" />
            
            {hasText ? (
                mode === 'encrypt' ? (
                    <>
                        <FrequencyChart 
                            title="Plaintext Frequencies" 
                            text={plaintext} 
                        />

                        <FrequencyChart 
                            title="Ciphertext Frequencies" 
                            text={ciphertext} 
                        />
                    </>
                ) : (
                    <>
                        <FrequencyChart 
                            title="Ciphertext Frequencies" 
                            text={ciphertext} 
                        />

                        <FrequencyChart 
                            title="Plaintext Frequencies" 
                            text={plaintext} 
                        />
                    </>
                )
            ) : (
                <p>Frequency analysis will appear here when text is entered.</p>
            )}
    
            <NoticeBox text={noticeText} />
            
        </div>
    )
}

export default FrequencySection