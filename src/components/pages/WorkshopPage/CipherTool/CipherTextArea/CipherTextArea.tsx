import './CipherTextArea.css'
import SwapTextButton from './SwapTextButton/SwapTextButton'
import TextBox from './TextBox/TextBox';

type Props = {
    mode: 'encrypt' | 'decrypt';
    plaintext: string;
    ciphertext: string;
    setPlaintext: (text: string) => void;
    setCiphertext: (text: string) => void;
    onSwap: () => void;
}

function CipherTextArea({
    mode,
    plaintext,
    ciphertext,
    setPlaintext,
    setCiphertext,
    onSwap,
}: Props) {
    var isEncrypt = mode === 'encrypt';

    return (
        <div className="cipher-text-area">
            <TextBox 
                title={isEncrypt ? 'Plaintext' : 'Ciphertext'}
                value={isEncrypt ? plaintext : ciphertext}
                placeholder="Enter your message..."
                onChange={isEncrypt ? setPlaintext : setCiphertext}
                readOnly={false}
            />

            <SwapTextButton onClick={onSwap} />

            <TextBox 
                title={isEncrypt ? 'Ciphertext' : 'Plaintext'}
                value={isEncrypt ? ciphertext : plaintext}
                placeholder="Output will appear here..."
                readOnly={true}
            />
        </div>
    )
}

export default CipherTextArea