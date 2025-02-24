const directionToTuple = (direction: number) => {
    switch (direction) {
        case 0:
            return [-1, 0];
        case 1:
            return [-1, 1];
        case 2:
            return [0, 1];
        case 3:
            return [1, 1];
        case 4:
            return [1, 0];
        case 5:
            return [1, -1];
        case 6:
            return [0, -1];
        case 7:
            return [-1, -1];
    }
    return [0, 0];
};

const createRandomGrid = () => {
    let gridContent = [];
    for (let i = 0; i < 10; i++) {
        let row = [];
        for (let j = 0; j < 10; j++) {
            row.push(String.fromCharCode(0|Math.random()*26+97).toUpperCase());
        }
        gridContent.push(row);
    }
    return gridContent;
};

const insertWords = (grid: string[][], words: string[]) => {
    const occupied: Set<string> = new Set();
    const wordPositions: {entry: {word: string, positions: {row: number, col: number}[]}}[] = [];

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const candidates: {row: number, col: number}[] = [];
        let dx = 0;
        let dy = 0;

        let attempts = 0;
        while (candidates.length === 0 && attempts < 5) {
            [dx, dy] = directionToTuple(Math.floor(Math.random() * 8));

            for (let row = 0; row < 10; row++) {
                for (let col = 0; col < 10; col++) {
                    if (row + word.length*dx >= 10 || row + word.length*dx < 0) {
                        continue;
                    }
                    if (col + word.length*dy >= 10 || col + word.length*dy < 0) {
                        continue;
                    }

                    let valid = true;
                    for (let j = 0; j < word.length; j++) {
                        if (occupied.has((row + j*dx) + "-" + (col + j*dy))) {
                            valid = false;
                            break;
                        }
                    }
                    if (valid) {
                        candidates.push({row, col});
                    }
                }
            }
            attempts++;
        }

        const position: {row: number, col: number} = candidates[Math.floor(Math.random() * candidates.length)];
        wordPositions.push({entry: {word: word, positions: []}});
        for (let j = 0; j < word.length; j++) {
            grid[position.row + j*dx][position.col + j*dy] = word[j].toUpperCase();
            occupied.add((position.row + j*dx) + "-" + (position.col + j*dy));
            wordPositions[i].entry.positions.push({row: position.row + j*dx, col: position.col + j*dy});
        }
    }

    return wordPositions;
}

export const createGameState = (words: string[]) => {
    if (words.length === 0) {
        return undefined;
    }

    const gridContent = createRandomGrid();
    const wordPositions = insertWords(gridContent, words);

    return {
        gridContent,
        wordPositions
    };
};
