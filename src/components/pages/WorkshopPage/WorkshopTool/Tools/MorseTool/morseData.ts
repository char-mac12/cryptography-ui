export const morseAlphabet: Record<string, string> = {
    A: ".—",
    B: "—...",
    C: "—.—.",
    D: "—..",
    E: ".",
    F: "..—.",
    G: "——.",
    H: "....",
    I: "..",
    J: ".———",
    K: "—.—",
    L: ".—..",
    M: "——",
    N: "—.",
    O: "———",
    P: ".——.",
    Q: "——.—",
    R: ".—.",
    S: "...",
    T: "—",
    U: "..—",
    V: "...—",
    W: ".——",
    X: "—..—",
    Y: "—.——",
    Z: "——..",

    0: "—————",
    1: ".————",
    2: "..———",
    3: "...——",
    4: "....—",
    5: ".....",
    6: "—....",
    7: "——...",
    8: "———..",
    9: "————."
};


export function characterToMorse(text: string) {
    return text
        .toUpperCase()
        .split("")
        .map(character => {
            if (character === " ") return "/";
            return morseAlphabet[character] ?? "";
        })
        .join(" ");
}


export function morseToCharacter(text: string) {
    const reverseAlphabet = Object.fromEntries(
        Object.entries(morseAlphabet)
            .map(([character, morse]) => [morse, character])
    );

    return text
        .split(" ")
        .map(code => {
            if (code === "/") return " ";
            return reverseAlphabet[code] ?? "";
        })
        .join("");
}