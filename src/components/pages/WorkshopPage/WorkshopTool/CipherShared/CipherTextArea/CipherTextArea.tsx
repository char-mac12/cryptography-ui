import ToolTextArea from '../../../../Shared/ToolTextArea/ToolTextArea';

type CipherTextAreaProps = {
    mode: 'encrypt' | 'decrypt';
    plaintext: string;
    ciphertext: string;
    setPlaintext: (text: string) => void;
    setCiphertext: (text: string) => void;
    onSwap: () => void;
};

function CipherTextArea({
    mode,
    plaintext,
    ciphertext,
    setPlaintext,
    setCiphertext,
    onSwap,
}: CipherTextAreaProps) {

    const isEncrypt = mode === "encrypt";

    return (
        <ToolTextArea
            inputTitle={isEncrypt ? "Plaintext" : "Ciphertext"}
            outputTitle={isEncrypt ? "Ciphertext" : "Plaintext"}
            inputText={isEncrypt ? plaintext : ciphertext}
            outputText={isEncrypt ? ciphertext : plaintext}
            onInputChange={isEncrypt ? setPlaintext : setCiphertext}
            onSwap={onSwap}
        />
    );
}

export default CipherTextArea;