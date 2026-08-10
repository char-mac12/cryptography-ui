import type { Tool } from '../../../../types/Tool'
import CaesarTool from "./Tools/CaesarTool/CaesarTool";
import './WorkshopTool.css'
import AtbashTool from "./Tools/AtbashTool/AtbashTool";
import PlayfairTool from "./Tools/PlayfairTool/PlayfairTool";
import VigenereTool from "./Tools/VigenereTool/VigenereTool";
import MorseTool from './Tools/MorseTool/MorseTool';
import PolybiusTool from './Tools/PolybiusTool/PolybiusTool';
import AffineTool from './Tools/AffineTool/AffineTool';

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