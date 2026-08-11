export function encryptCaesar(text: string, shift: number): string {
    return text
        .toUpperCase()
        .split("")
        .map(char => {
            const code = char.charCodeAt(0);

            if (code >= 65 && code <= 90) {
                return String.fromCharCode(
                    ((code - 65 + shift) % 26) + 65
                );
            }

            return char;
        })
        .join("");
}

export function decryptCaesar(text: string, shift: number): string {
    return encryptCaesar(text, 26 - (shift % 26));
}