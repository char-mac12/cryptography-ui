import type { Cipher } from "../../../../types/Cipher";

type CipherToolProps = {
    cipher: Cipher;
};

function CipherTool({ cipher }: CipherToolProps) {

    switch (cipher.id) {
        case "caesar":
            return (
                <div>
                    Caesar Tool
                </div>
            );

        case "vigenere":
            return (
                <div>
                    Vigenere Tool
                </div>
            );

        case "atbash":
            return (
                <div>
                    Atbash Tool
                </div>
            );

        default:
            return (
                <div>
                    Tool not available
                </div>
            );
    }
}

export default CipherTool;