export const analyses = [
    {
        id: "frequency-analysis",
        title: "Frequency Analysis",
        difficulty: "Beginner",
        category: "Statistical Analysis",
        origin: "Classical cryptanalysis",
        description: "Examines the frequency of characters in ciphertext and compares them with expected language frequencies to identify patterns and possible substitutions.",
        inputTypes: ["Text"],
        hasVisualisation: true,
        tags: ["Educational", "Cryptanalysis", "Statistical", "Beginner"],
    },

    {
        id: "index-of-coincidence",
        title: "Index of Coincidence",
        difficulty: "Intermediate",
        category: "Statistical Analysis",
        origin: "1920s • William F. Friedman",
        description: "Measures the likelihood that two randomly selected letters from a text are identical. It can help distinguish between monoalphabetic and polyalphabetic ciphers.",
        inputTypes: ["Text"],
        hasVisualisation: true,
        tags: ["Educational", "Cryptanalysis", "Statistical"],
    },

    {
        id: "kasiski-examination",
        title: "Kasiski Examination",
        difficulty: "Advanced",
        category: "Polyalphabetic Analysis",
        origin: "1863 • Friedrich Kasiski",
        description: "Finds repeated sequences in ciphertext and examines the distances between their occurrences to help estimate the key length of a polyalphabetic cipher.",
        inputTypes: ["Text"],
        hasVisualisation: true,
        tags: ["Educational", "Cryptanalysis", "Polyalphabetic"],
    },

    {
        id: "chi-squared",
        title: "Chi-Squared Analysis",
        difficulty: "Intermediate",
        category: "Statistical Analysis",
        origin: "Statistical analysis",
        description: "Compares observed letter frequencies with expected language frequencies to measure how closely a ciphertext resembles a known language distribution.",
        inputTypes: ["Text"],
        hasVisualisation: true,
        tags: ["Educational", "Cryptanalysis", "Statistical"],
    },
];