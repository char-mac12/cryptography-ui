import { removeNonLetters } from "../utils/alphabet";

type Rail = Array<string | null>;
export type Rails = Rail[];

export function railFenceEncrypt(
    plaintext: string,
    numRails: number
): string {
    const text = removeNonLetters(plaintext);

    if (numRails <= 1 || numRails >= text.length) {
        return text;
    }

    const rails = createRails(numRails, text.length);
    
    placePlaintextOnRails(rails, text);

    return readRailsByRow(rails);
}

export function railFenceDecrypt(
    ciphertext: string,
    numRails: number
): string {
    const text = removeNonLetters(ciphertext);

    if (numRails <= 1 || numRails >= text.length) {
        return text;
    }

    const rails = createRails(numRails, text.length);

    markRailPositions(rails);
    fillRailsFromCiphertext(rails, text);

    return readRailsInZigZagOrder(rails);
}

export function createRails(numRails: number, length: number): Rails {
    return Array.from(
        { length: numRails },
        () => Array<string | null>(length).fill(null)
    );
}

export function placePlaintextOnRails(rails: Rails, text: string): void {
    let rail = 0;
    let direction = 1; // move down = 1, move up = -1

    for (let i = 0; i < text.length; i++) {
        rails[rail][i] = text[i];

        if (rail === 0) {
            direction = 1;
        } else if (rail === rails.length - 1) {
            direction = -1;
        }

        rail += direction;
    }
}

export function readRailsByRow(rails: Rails): string {
    let ciphertext = "";

    for (const rail of rails) {
        for (const char of rail) {
            if (char !== null) {
                ciphertext += char;
            }
        }
    }

    return ciphertext;
}

export function markRailPositions(
    rails: Rails
): void {
    let rail = 0;
    let direction = 1; // move down = 1, move up = -1

    const numRails = rails.length
    const length = rails[0].length

    for (let i = 0; i < length; i++) {
        rails[rail][i] = "";

        if (rail === 0) {
            direction = 1;
        } else if (rail === numRails - 1) {
            direction = -1;
        }

        rail += direction;
    }
}

export function fillRailsFromCiphertext(rails: Rails, text: string): void {
    let index = 0;

    for (let rail = 0; rail < rails.length; rail++) {
        for (let column = 0; column < rails[rail].length; column++) {
            if (rails[rail][column] !== null) {
                rails[rail][column] = text[index];
                index++;
            }
        }
    }
}

export function readRailsInZigZagOrder(
    rails: Rails
): string {
    let plaintext = "";
    let rail = 0;
    let direction = 1;

    const numRails = rails.length
    const length = rails[0].length

    for (let i = 0; i < length; i++) {
        const char = rails[rail][i];

        if (char !== null) {
            plaintext += char;
        }

        if (rail === 0) {
            direction = 1;
        } else if (rail === numRails - 1) {
            direction = -1;
        }

        rail += direction;
    }

    return plaintext;
}

export function readRailsByRowAsList(rails: Rails): string[] {
    return rails.map((rail) =>
        rail
            .filter((char) => char !== null)
            .join("")
    );
}