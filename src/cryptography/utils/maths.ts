export function gcd(a: number, b: number): number {
    a = Math.abs(a);
    b = Math.abs(b);

    while (b !== 0) {
        [a, b] = [b, a % b];
    }

    return a;
}

export function mod(n: number, m: number): number {
    return ((n % m) + m) % m;
}

export function modInverse(a: number, m: number): number {
    a = mod(a, m);

    for (let x = 1; x < m; x++) {
        if (mod(a * x, m) === 1) {
            return x;
        }
    }

    throw new Error(`${a} has no modular inverse modulo ${m}`);
}