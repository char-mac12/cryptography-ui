const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"

export interface PlayfairEncryptionStep {
    pair: string;
    rule: "same-row" | "same-column" | "rectangle";
    firstPosition: {
        row: number;
        col: number;
    };
    secondPosition: {
        row: number;
        col: number;
    };
    result: string;
}

export function prepareKeyword(keyword: string) {
    const cleanedKeyword = keyword
        .toUpperCase()
        .replace(/[^A-Z]/g, "")
        .replace(/J/g, "I");

    const uniqueKeyword = Array.from(new Set(cleanedKeyword)).join("");

    const preparedKeyword = Array.from(
        new Set(uniqueKeyword + alphabet)
    ).join("");

    return {
        cleanedKeyword,
        uniqueKeyword,
        preparedKeyword
    }
}

export function generateKeywordSquare(keyword: string): string[][] {
    const { preparedKeyword } = prepareKeyword(keyword);
    
    const square: string[][] = [];

    for (let i = 0; i < 25; i += 5) {
        square.push(preparedKeyword.slice(i, i + 5).split(""));
    }

    return square;
}

function findPosition(
    square: string[][],
    letter: string
) {
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            if (square[row][col] === letter) {
                return { row, col };
            }
        }
    }

    throw new Error(`Letter ${letter} not found!`);
}

export function preparePlaintextSteps(text: string) {
    const cleanedPlaintext = text
        .toUpperCase()
        .replace(/[^A-Z]/g, "")
        .replace(/J/g, "I");

    const initialPairs: string[] = [];

    for (let i = 0; i < cleanedPlaintext.length; i += 2) {
        initialPairs.push(cleanedPlaintext.slice(i, i + 2));
    }

    const separatedPairs: string[] = [];

    let i = 0;

    while (i < cleanedPlaintext.length) {
        const first = cleanedPlaintext[i];
        const second = cleanedPlaintext[i + 1];

        if (first === second) {
            separatedPairs.push(first + "X");
            i++;
        } else {
            separatedPairs.push(first + (second ?? ""));
            i += 2;
        }
    }

    const paddedPairs = [...separatedPairs];

    const lastIndex = paddedPairs.length - 1;

    if (paddedPairs[lastIndex].length === 1) {
        paddedPairs[lastIndex] += "X";
    }


    return {
        cleanedPlaintext,
        initialPairs,
        separatedPairs,
        paddedPairs
    };
}

export function preparePlaintext(text: string) {
    const cleaned = text
        .toUpperCase()
        .replace(/[^A-Z]/g, "")
        .replace(/J/g, "I");

    const pairs: string[] = [];

    let i = 0;

    while (i < cleaned.length) {
        const first = cleaned[i];
        const second = cleaned[i + 1];

        if (first === second) {
            pairs.push(first + "X");
            i++;
        } else {
            pairs.push(first+ (second ?? "X"));
            i += 2
        }
    }

    return pairs;
}

function encryptPair(
    pair: string,
    square: string[][]
): PlayfairEncryptionStep {
    const firstPos = findPosition(square, pair[0]);
    const secondPos = findPosition(square, pair[1]);

    if (firstPos.row === secondPos.row) {
        const result = encryptSameRowPair(
            firstPos,
            secondPos,
            square
        );

        return {
            pair,
            rule: "same-row",
            firstPosition: firstPos,
            secondPosition: secondPos,
            result
        }
    } else if (firstPos.col === secondPos.col) {
        const result = encryptSameColPair(
            firstPos,
            secondPos,
            square
        )

        return {
            pair,
            rule: "same-column",
            firstPosition: firstPos,
            secondPosition: secondPos,
            result
        }
    } else {
        const result = encryptRectangleRulePair(
            firstPos,
            secondPos,
            square
        )

        return {
            pair,
            rule: "rectangle",
            firstPosition: firstPos,
            secondPosition: secondPos,
            result
        }
    }
}

export function playfairEncryptionSteps(
    text: string,
    keyword: string
): PlayfairEncryptionStep[] {

    const square = generateKeywordSquare(keyword);
    const pairs = preparePlaintext(text);

    return pairs.map(pair =>
        encryptPair(pair, square)
    );
}

function encryptSameRowPair(
    firstPos: { row: number, col: number },
    secondPos: { row: number, col: number },
    square: string[][]
) {
    return (
        square[firstPos.row][(firstPos.col + 1) % 5] +
        square[secondPos.row][(secondPos.col + 1) % 5]
    )
}

function encryptSameColPair(
    firstPos: { row: number, col: number },
    secondPos: { row: number, col: number },
    square: string[][]
) {
    return (
        square[(firstPos.row + 1) % 5][firstPos.col] +
        square[(secondPos.row + 1) % 5][secondPos.col]
    )
}

function encryptRectangleRulePair(
    firstPos: { row: number, col: number },
    secondPos: { row: number, col: number },
    square: string[][]
) {
    return (
        square[firstPos.row][secondPos.col] +
        square[secondPos.row][firstPos.col]
    )
}

export function playfairEncrypt(
    text: string,
    keyword: string
) {
    const square = generateKeywordSquare(keyword);
    const pairs = preparePlaintext(text);

    return pairs
        .map(pair => encryptPair(pair, square).result)
        .join("");
}

export function playfairDecrypt() {
    return (
        ""
    )
}