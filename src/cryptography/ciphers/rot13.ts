import { encryptCaesar } from './caesar'

export function rot13(text: string): string {
    return encryptCaesar(text, 13);
}