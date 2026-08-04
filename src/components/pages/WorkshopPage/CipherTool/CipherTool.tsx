import type { Cipher } from "../../../../types/Cipher";
import CaesarTool from "./CaesarTool/CaesarTool";
import './CipherTool.css'

type CipherToolProps = {
    cipher: Cipher;
};

function CipherTool({ cipher }: CipherToolProps) {

    switch (cipher.id) {
        case "caesar":
            return (
                <CaesarTool />
            );

        case "vigenere":
            return (
                <div>
                    Vigenere Tool - work in progress!
                </div>
            );

        case "atbash":
            return (
                <div>
                    Atbash Tool - work in progress!
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