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
    var noticeText = "Notice: When a Caesar Cipher shifts text the shape is identical, just displaced by the shift amount. This is why frequency analysis is very effective at breaking monoalphabetic substitutions.";
    
    return (
        <div className="frequency-section">
            <ToolHeader title="Frequency Analysis" />
            
            {mode === 'encrypt' ? (
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
            )}
    
            <NoticeBox text={noticeText} />
            
        </div>
    )
}

export default FrequencySection