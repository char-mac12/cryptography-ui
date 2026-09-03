export function findRepeatedNGrams(text: string, n: number): Record<string, number[]> {
    const positions: Record<string, number[]> = {};

    for (let i = 0; i <= text.length - n; i++) {
        const gram = text.slice(i, i + n);

        if (!positions[gram]) {
            positions[gram] = [];
        }

        positions[gram].push(i);
    }

    return Object.fromEntries(
        Object.entries(positions).filter(([, pos]) => pos.length > 1)
    );
}

export function getDistances(positions: number[]): number[] {
    const distances: number[] = [];

    for (let i = 0; i < positions.length - 1; i++) {
        for (let j = i + 1; j < positions.length; j++) {
            distances.push(positions[j] - positions[i]);
        }
    }

    return distances;
}

export function getFactors(number: number, maxFactor: number = 20): number[] {
    const factors: number[] = [];

    for (let i = 2; i <= Math.min(number, maxFactor); i++) {
        if (number % i === 0) {
            factors.push(i);
        }
    }

    return factors;
}

export function kasiskiExamination(
    text: string, 
    n: number = 3, 
    maxFactor: number = 20
): Record<number, number> {
    const repeated = findRepeatedNGrams(text, n);
    const factorCounts: Record<number, number> = {};

    for (const gram in repeated) {
        const distances = getDistances(repeated[gram]);

        for (const distance of distances) {
            const factors = getFactors(distance, maxFactor);

            for (const factor of factors) {
                factorCounts[factor] = (factorCounts[factor] || 0) + 1;
            }
        }
    }

    return factorCounts;
}