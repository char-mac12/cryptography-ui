import './ToolTextArea.css';
import SwapTextButton from './SwapTextButton/SwapTextButton';
import TextBox from './TextBox/TextBox';

type ToolTextAreaProps = {
    inputTitle: string;
    outputTitle: string;

    inputText: string;
    outputText: string;

    inputPlaceholder?: string;
    outputPlaceholder?: string;

    onInputChange: (text: string) => void;
    onSwap: () => void;
};

function ToolTextArea({
    inputTitle,
    outputTitle,
    inputText,
    outputText,
    inputPlaceholder = "Enter your message...",
    outputPlaceholder = "Output will appear here...",
    onInputChange,
    onSwap,
}: ToolTextAreaProps) {

    return (
        <div className="tool-text-area">

            <TextBox
                title={inputTitle}
                value={inputText}
                placeholder={inputPlaceholder}
                onChange={onInputChange}
                readOnly={false}
            />

            <SwapTextButton onClick={onSwap} />

            <TextBox
                title={outputTitle}
                value={outputText}
                placeholder={outputPlaceholder}
                readOnly={true}
            />

        </div>
    );
}

export default ToolTextArea;