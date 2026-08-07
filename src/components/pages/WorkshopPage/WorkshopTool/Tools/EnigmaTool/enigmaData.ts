import type { EnigmaMachine } from "./enigmaTypes";

export const createDefaultMachine = (): EnigmaMachine => ({
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",

    rotors: [
        {
            name: "I",
            wiring: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
            position: 0,
        },
        {
            name: "II",
            wiring: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
            position: 0,
        },
        {
            name: "III",
            wiring: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
            position: 0,
        },
    ],

    reflector: {
        wiring: "YRUHQSLDPXNGOKMIEBFZCWVJAT",
    },
});