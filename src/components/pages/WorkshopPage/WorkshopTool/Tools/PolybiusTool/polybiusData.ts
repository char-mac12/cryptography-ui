export const polybiusSquare = [
    ["A", "B", "C", "D", "E"],
    ["F", "G", "H", "I", "K"],
    ["L", "M", "N", "O", "P"],
    ["Q", "R", "S", "T", "U"],
    ["V", "W", "X", "Y", "Z"],
];


export function characterToPolybius(
    text: string,
    square: string[][]
) {
    let result = "";

    for (let letter of text.toUpperCase()) {
        if (letter === "J") {
            letter = "I";
        }

        for (let row = 0; row < square.length; row++) {
            for (let column = 0; column < square[row].length; column++) {

                if (square[row][column] === letter) {
                    result += `${row + 1}${column + 1}`;
                }
            }
        }
    }

    return result;
}


export function polybiusToCharacter(
    text: string,
    square: string[][]
) {
    let result = "";

    for (let i = 0; i < text.length; i += 2) {
        const row = Number(text[i]) - 1;
        const column = Number(text[i + 1]) - 1;

        result += square[row][column];

    }

    return result;
}

export function generatePolybiusSquare(keyword: string) {

    const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";

    const cleanedKeyword = keyword
        .toUpperCase()
        .replace(/J/g, "I")
        .replace(/[^A-Z]/g, "");

    const letters = [
        ...new Set(cleanedKeyword + alphabet)
    ];

    return [
        letters.slice(0, 5),
        letters.slice(5, 10),
        letters.slice(10, 15),
        letters.slice(15, 20),
        letters.slice(20, 25),
    ];
}