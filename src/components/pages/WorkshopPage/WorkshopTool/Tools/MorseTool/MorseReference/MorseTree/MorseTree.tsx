import './MorseTree.css';

function MorseTree() {
    return (
        <div className="morse-tree">

            <div className="tree-key">
                <span>
                    <strong>.</strong> = left
                </span>
                <span>
                    <strong>—</strong> = right
                </span>
            </div>

            <div className="morse-level">
                <div className="morse-node root">
                    Start
                </div>
            </div>


            <div className="morse-level">
                <div className="morse-node">
                    <strong>E</strong>
                    <span>.</span>
                </div>

                <div className="morse-node">
                    <strong>T</strong>
                    <span>-</span>
                </div>
            </div>


            <div className="morse-level">
                <div className="morse-node">
                    <strong>I</strong>
                    <span>..</span>
                </div>

                <div className="morse-node">
                    <strong>A</strong>
                    <span>.-</span>
                </div>

                <div className="morse-node">
                    <strong>N</strong>
                    <span>-.</span>
                </div>

                <div className="morse-node">
                    <strong>M</strong>
                    <span>--</span>
                </div>
            </div>


            <div className="morse-level">
                <div className="morse-node">
                    <strong>S</strong>
                    <span>...</span>
                </div>

                <div className="morse-node">
                    <strong>U</strong>
                    <span>..-</span>
                </div>

                <div className="morse-node">
                    <strong>R</strong>
                    <span>.-.</span>
                </div>

                <div className="morse-node">
                    <strong>W</strong>
                    <span>.--</span>
                </div>

                <div className="morse-node">
                    <strong>D</strong>
                    <span>-..</span>
                </div>

                <div className="morse-node">
                    <strong>K</strong>
                    <span>-.-</span>
                </div>

                <div className="morse-node">
                    <strong>G</strong>
                    <span>--.</span>
                </div>

                <div className="morse-node">
                    <strong>O</strong>
                    <span>---</span>
                </div>
            </div>

        </div>
    );
}

export default MorseTree;