export interface Rotor {
    name: string;
    wiring: string;
    position: number;
}

export interface Reflector {
    wiring: string;
}

export interface EnigmaMachine {
    alphabet: string;
    rotors: Rotor[];
    reflector: Reflector;
}