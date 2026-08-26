import ToolTextArea from '../../../../Shared/ToolTextArea/ToolTextArea';

type EncodingTextAreaProps = {
    mode: 'encode' | 'decode';
    input: string;
    output: string;
    setInput: (text: string) => void;
    onSwap: () => void;
};

function EncodingTextArea({
    mode,
    input,
    output,
    setInput,
    onSwap,
}: EncodingTextAreaProps) {

    const isEncode = mode === 'encode';

    return (
        <ToolTextArea
            inputTitle={isEncode ? "Text" : "Encoded Text"}
            outputTitle={isEncode ? "Encoded Text" : "Text"}
            inputText={input}
            outputText={output}
            inputPlaceholder={
                isEncode
                    ? "Enter text..."
                    : "Enter encoded message..."
            }
            outputPlaceholder="Output will appear here..."
            onInputChange={setInput}
            onSwap={onSwap}
        />
    );
}

export default EncodingTextArea;