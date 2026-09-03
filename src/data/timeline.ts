import type { TimelineEvent } from "../types/timelineEvent";

export const timelineEvents: TimelineEvent[] = [
    {
        year: "c. 1900 BC",
        title: "Early Cryptography",
        summary: "One of the earliest known examples of deliberately altered writing.",
        description:
            "An inscription from ancient Egypt used unusual hieroglyphic symbols instead of the expected forms. Although it was not encryption in the modern sense, it demonstrates the early use of altered writing to make a message less straightforward to read."
    },

    {
        year: "c. 500 BC",
        title: "The Scytale",
        summary: "An ancient Spartan technique for disguising written messages.",
        description:
            "The scytale is traditionally associated with Sparta. A strip of material was wrapped around a rod and the message was written along it. When unwrapped, the letters appeared scrambled, creating an early example of transposition."
    },

    {
        year: "c. 100 BC",
        title: "Caesar Cipher",
        summary: "A substitution cipher associated with Julius Caesar.",
        description:
            "The Caesar cipher shifts each letter of the alphabet by a fixed number of positions. It is one of the best-known examples of a substitution cipher and provides a simple introduction to how encryption can transform plaintext into ciphertext.",
        person: "Julius Caesar",
        link: {
            label: "Try Caesar Cipher",
            path: "/workshop/caesar"
        }
    },

    {
        year: "9th Century",
        title: "Frequency Analysis",
        summary: "Cryptanalysis began using patterns in language to break ciphers.",
        description:
            "The scholar Al-Kindi described methods for analysing the frequency of letters in encrypted messages. By comparing the frequency of ciphertext symbols with the expected frequency of letters in a language, cryptanalysts could begin to break substitution ciphers.",
        person: "Al-Kindi",
        link: {
            label: "Explore Frequency Analysis",
            path: "/analysis/frequency"
        }
    },

    {
        year: "1460s",
        title: "Alberti's Cipher Disk",
        summary: "A mechanical device introduced the idea of changing substitution alphabets.",
        description:
            "Leon Battista Alberti described a cipher disk that used two alphabets and allowed the substitution alphabet to change during encryption. This was an important step toward more complex polyalphabetic ciphers.",
        person: "Leon Battista Alberti"
    },

    {
        year: "16th Century",
        title: "Vigenère Cipher",
        summary: "A polyalphabetic cipher that uses a keyword to vary the substitution.",
        description:
            "The Vigenère cipher uses a repeating keyword to determine how far each letter is shifted. By changing the shift throughout a message, it was designed to make traditional frequency analysis more difficult.",
        link: {
            label: "Try Vigenère Cipher",
            path: "/workshop/vigenere"
        }
    },

    {
        year: "16th Century",
        title: "Bacon's Cipher",
        summary: "A cipher that represents letters using combinations of two symbols.",
        description:
            "Francis Bacon described a method in which letters could be represented using combinations of two different forms. This made it possible to hide information within apparently ordinary text by varying its appearance.",
        person: "Francis Bacon",
        link: {
            label: "Try Bacon's Cipher",
            path: "/workshop/bacon"
        }
    },

    {
        year: "19th Century",
        title: "Morse Code",
        summary: "A system for representing letters and numbers using dots and dashes.",
        description:
            "Morse code allowed written messages to be transmitted over telegraph systems using sequences of short and long signals. It became an important communication system and remains widely recognised today.",
        person: "Samuel Morse",
        link: {
            label: "Try Morse Code",
            path: "/workshop/morse"
        }
    },

    {
        year: "1854",
        title: "Playfair Cipher",
        summary: "A digraph cipher that encrypts pairs of letters instead of individual letters.",
        description:
            "The Playfair cipher encrypts pairs of letters using a 5 by 5 keyword square. Working with pairs rather than individual letters makes simple frequency analysis more difficult.",
        link: {
            label: "Try Playfair Cipher",
            path: "/workshop/playfair"
        }
    },

    {
        year: "20th Century",
        title: "Elizebeth Friedman",
        summary: "A pioneering American cryptanalyst who helped establish modern cryptanalysis.",
        description:
            "Elizebeth Smith Friedman became one of the most influential figures in American cryptology. Her work included breaking codes and ciphers used by organised crime and contributing to the development of American cryptanalytic methods.",
        person: "Elizebeth Smith Friedman"
    },

    {
        year: "World War II",
        title: "Enigma and Bletchley Park",
        summary: "Large-scale cryptanalysis helped Allied forces read encrypted German communications.",
        description:
            "During World War II, cryptanalysts and mathematicians at Bletchley Park worked to break encrypted communications produced by German systems including Enigma. The work involved large teams of people, machines, mathematics and careful cryptanalysis.",
        person: "Joan Clarke"
    },

    {
        year: "1949",
        title: "Claude Shannon",
        summary: "Information theory provided a mathematical foundation for understanding secrecy and communication.",
        description:
            "Claude Shannon's work connected cryptography with information theory. His research helped establish mathematical ways of thinking about information, uncertainty and the security of cryptographic systems.",
        person: "Claude Shannon",
        link: {
            label: "Explore Entropy",
            path: "/analysis/entropy"
        }
    },

    {
        year: "1970s",
        title: "Public-Key Cryptography",
        summary: "Cryptography developed methods for secure communication without first sharing a secret key.",
        description:
            "Public-key cryptography introduced a fundamentally different approach to encryption. Systems based on public and private keys made it possible to establish secure communications without requiring both parties to already possess the same secret key."
    },

    {
        year: "1977",
        title: "RSA",
        summary: "RSA became one of the best-known public-key cryptographic algorithms.",
        description:
            "RSA demonstrated how mathematical problems involving very large numbers could be used to create a public-key cryptosystem. It became an important part of the history of modern cryptography."
    },

    {
        year: "21st Century",
        title: "Modern Cryptography",
        summary: "Cryptography became a fundamental part of everyday digital security.",
        description:
            "Modern cryptography protects information across the internet, computers and digital communication systems. It is used for purposes including confidentiality, authentication, integrity and secure key exchange."
    }
]