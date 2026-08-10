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