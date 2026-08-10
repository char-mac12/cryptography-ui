import type { EnigmaMachine, Rotor } from './enigmaTypes';

function substitute(
    letter: string,
    wiring: string,
    alphabet: string
) {
    const index = alphabet.indexOf(letter);
    return wiring[index]
}

function inverseSubstitute(
    letter: string,
    wiring: string,
    alphabet: string
) {
    const index = wiring.indexOf(letter);
    return alphabet[index];
}

export function enigma(
    plaintext: string,
    machine: EnigmaMachine
) {
    let ciphertext = "";

    for (const letter of plaintext) {
        stepRotors(machine);

        let current = letter;

        current = forwardPass(current, machine);
        current = reflect(current, machine);
        current = backwardPass(current, machine);

        ciphertext += current;
    }

    return ciphertext;
}

function stepRotors(machine: EnigmaMachine) {
    const size = machine.alphabet.length;

    machine.rotors[0].position++;

    if (machine.rotors[0].position >= size) {
        machine.rotors[0].position = 0;

        machine.rotors[1].position++;

        if (machine.rotors[1].position >= size) {
            machine.rotors[1].position = 0;

            machine.rotors[2].position++;

            if (machine.rotors[2].position >= size) {
                machine.rotors[2].position = 0
            }
        }
    }
}

function forwardPass(letter: string, machine: EnigmaMachine) {
    let current = letter;

    for (const rotor of machine.rotors) {
        current = forwardRotor(
            current,
            rotor,
            machine.alphabet
        );
    }

    return current;
}

function reflect(letter: string, machine: EnigmaMachine) {
    return substitute(
        letter,
        machine.reflector.wiring,
        machine.alphabet
    );
}

function backwardPass(
    letter: string,
    machine: EnigmaMachine
) {
    let current = letter;

    for (let i = machine.rotors.length - 1; i >= 0; i--) {
        current = backwardRotor(
            current,
            machine.rotors[i],
            machine.alphabet
        );
    }

    return current;
}

function forwardRotor(
    letter: string,
    rotor: Rotor,
    alphabet: string
) {
    let index = alphabet.indexOf(letter);
    index = internalIndex(index, rotor.position, alphabet.length);
    
    const mappedLetter = rotor.wiring[index];
    
    index = alphabet.indexOf(mappedLetter);
    index = absoluteIndex(index, rotor.position, alphabet.length);

    return alphabet[index];
}

function backwardRotor(
    letter: string,
    rotor: Rotor,
    alphabet: string
) {
    let index = alphabet.indexOf(letter);
    index = internalIndex(index, rotor.position, alphabet.length);

    const shiftedLetter = alphabet[index];
    const mappedLetter = inverseSubstitute(shiftedLetter, rotor.wiring, alphabet);
    
    index = alphabet.indexOf(mappedLetter);
    index = absoluteIndex(index, rotor.position, alphabet.length);

    return alphabet[index];
}

function internalIndex(
    index: number,
    position: number,
    alphabetLength: number
) {
    return (index + position) % alphabetLength;
}

function absoluteIndex(
    index: number,
    position: number,
    alphabetLength: number
) {
    return (index - position + alphabetLength) % alphabetLength;
}