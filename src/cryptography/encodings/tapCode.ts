export const TAP_CODE: Record<string, string> = {
    A: "11",
    B: "12",
    C: "13",
    K: "13",
    D: "14",
    E: "15",

    F: "21",
    G: "22",
    H: "23",
    I: "24",
    J: "25",

    L: "31",
    M: "32",
    N: "33",
    O: "34",
    P: "35",

    Q: "41",
    R: "42",
    S: "43",
    T: "44",
    U: "45",

    V: "51",
    W: "52",
    X: "53",
    Y: "54",
    Z: "55",
};

const TAP_CODE_TO_CHARACTER: Record<string, string> =
    Object.fromEntries(
        Object.entries(TAP_CODE)
            .filter(([character]) => character !== "K")
            .map(([character, code]) => [code, character])
    );

export function characterToTapCode(text: string): string {
    return text
        .toUpperCase()
        .split("")
        .filter(character => TAP_CODE[character] !== undefined)
        .map(character => TAP_CODE[character])
        .join(" ");
}

export function tapCodeToCharacter(text: string): string {
    return text
        .trim()
        .split(/\s+/)
        .map(code => TAP_CODE_TO_CHARACTER[code] ?? code)
        .join("");
}

export function tapCodeToTaps(text: string): string {
    return text
        .trim()
        .split(/\s+/)
        .map(code => {
            if (!/^\d{2}$/.test(code)) {
                return code;
            }

            const row = Number(code[0]);
            const column = Number(code[1]);

            return ".".repeat(row) + " " + ".".repeat(column);
        })
        .join("  ");
}

export function tapsToTapCode(text: string): string {
    const groups = text.trim().split(/\s+/);

    if (groups.length % 2 !== 0) {
        return text;
    }

    const codes: string[] = [];

    for (let i = 0; i < groups.length; i += 2) {
        const row = groups[i].length;
        const column = groups[i + 1].length;

        if (
            row < 1 ||
            row > 5 ||
            column < 1 ||
            column > 5
        ) {
            codes.push(groups[i], groups[i + 1]);
            continue;
        }

        codes.push(`${row}${column}`);
    }

    return codes.join(" ");
}