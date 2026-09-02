export function atbash(text: string): string {
    return text
        .toUpperCase()
        .split("")
        .map((char) => {
            if (char < "A" || char > "Z") return char;

            const position = char.charCodeAt(0) - 65;
            const mirrored = 25 - position;

            return String.fromCharCode(mirrored + 65);
        })
        .join("");
}