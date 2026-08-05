import type { Cipher } from "../../../../types/Cipher";
import CaesarTool from "./CaesarTool/CaesarTool";
import './CipherTool.css'
import AtbashTool from "./Tools/AtbashTool/AtbashTool";
import PlayfairTool from "./Tools/PlayfairTool/PlayfairTool";
import VigenereTool from "./Tools/VigenereTool/VigenereTool";

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
                    <VigenereTool />
                </div>
            );

        case "atbash":
            return (
                <div>
                    <AtbashTool />
                </div>
            );

        case "playfair":
            return (
                <div>
                    <PlayfairTool />
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