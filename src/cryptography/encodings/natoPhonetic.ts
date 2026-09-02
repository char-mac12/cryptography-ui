export const NATO_PHONETIC: Record<string, string> = {

    A: "Alfa",
    B: "Bravo",
    C: "Charlie",
    D: "Delta",
    E: "Echo",
    F: "Foxtrot",
    G: "Golf",
    H: "Hotel",
    I: "India",
    J: "Juliett",
    K: "Kilo",
    L: "Lima",
    M: "Mike",
    N: "November",
    O: "Oscar",
    P: "Papa",
    Q: "Quebec",
    R: "Romeo",
    S: "Sierra",
    T: "Tango",
    U: "Uniform",
    V: "Victor",
    W: "Whiskey",
    X: "X-ray",
    Y: "Yankee",
    Z: "Zulu",
};

const NATO_TO_CHARACTER: Record<string, string> =
    Object.fromEntries(
        Object.entries(NATO_PHONETIC).map(
            ([character, word]) => [
                word.toUpperCase(),
                character,
            ]
        )
    );

export function characterToNatoPhonetic(text: string): string {
    return text
        .toUpperCase()
        .split("")
        .map((character) => {

            if (character === " ") {
                return "/";
            }

            return NATO_PHONETIC[character] ?? character;
        })
        .join(" ");
}

export function natoPhoneticToCharacter(text: string): string {
    return text
        .trim()
        .split(/\s+/)
        .map((word) => {

            if (word === "/") {
                return " ";
            }

            return NATO_TO_CHARACTER[word.toUpperCase()] ?? word;
        })
        .join("");
}