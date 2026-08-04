import NoticeBox from '../NoticeBox/NoticeBox'
import ToolHeader from '../ToolHeader/ToolHeader'
import FrequencyChart from './FrequencyChart/FrequencyChart'
import './FrequencySection.css'

function FrequencySection() {
    return (
        <div className="frequency-section">
            <ToolHeader title="Frequency Analysis" />
            <FrequencyChart title="Plaintext Frequencies" />
            <FrequencyChart title="Ciphertext Frequencies" />
            <NoticeBox text="Notice: a caesar..." />
        </div>
    )
}

export default FrequencySection