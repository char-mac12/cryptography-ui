import type { Tool } from '../../../../types/Tool'
import CaesarTool from "./Tools/CipherTools/CaesarTool/CaesarTool";
import './WorkshopTool.css'
import AtbashTool from "./Tools/CipherTools/AtbashTool/AtbashTool";
import PlayfairTool from "./Tools/CipherTools/PlayfairTool/PlayfairTool";
import VigenereTool from "./Tools/CipherTools/VigenereTool/VigenereTool";
import MorseTool from './Tools/EncodingTools/MorseTool/MorseTool';
import PolybiusTool from './Tools/EncodingTools/PolybiusTool/PolybiusTool';
import AffineTool from './Tools/CipherTools/AffineTool/AffineTool';
import RailFenceTool from './Tools/CipherTools/RailFenceTool/RailFenceTool';
import NatoPhoneticTool from './Tools/EncodingTools/NatoPhoneticTool/NatoPhoneticTool';
import TapCodeTool from './Tools/EncodingTools/TapCodeTool/TapCodeTool';
import ROT13Tool from './Tools/CipherTools/Rot13Tool/Rot13Tool';
// import SemaphoreTool from './Tools/EncodingTools/SemaphoreTool/SemaphoreTool';

type WorkshopToolProps = {
    tool: Tool;
};

function WorkshopTool({ tool }: WorkshopToolProps) {

    switch (tool.id) {
        case "caesar":
            return (
                <CaesarTool />
            );

        case "vigenere":
            return (
                <VigenereTool />
            );

        case "atbash":
            return (
                <AtbashTool />
            );

        case "playfair":
            return (
                <PlayfairTool />
            );

        case "morse":
            return (
                <MorseTool />
            );

        case "polybius": 
            return (
                <PolybiusTool />
            );

        case "affine": 
            return (
                <AffineTool />
            );

        case "rail-fence":
            return (
                <RailFenceTool />
            );

        case "nato-phonetic":
            return (
                <NatoPhoneticTool />
            );

        case "tap-code":
            return (
                <TapCodeTool />
            );

        case "rot13":
            return (
                <ROT13Tool />
            )

        // case "semaphore":
        //     return (
        //         <SemaphoreTool />
        //     );

        // case "enigma":
        //     return (
        //         <EnigmaTool />
        //     );

        default:
            return (
                <div>
                    Tool not available
                </div>
            );
    }
}

export default WorkshopTool;