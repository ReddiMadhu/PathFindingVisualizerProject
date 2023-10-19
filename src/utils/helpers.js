export  const singleCell = {
        cellNumber: 0,
        col: 0,
        row: 0,
        isVisited: false,
        isWall: false,
        isStartPoint: false,
        isEndPoint: false,
        distanceFromStart: Infinity,
        previousCell: null,
        isTarget: false,
    };
    
    export  const getCellObjects = (
        resetOnlyPath = false,
        resetOnlyWalls = false,
        grid
    ) => {
        let gridCells = grid || [];
        let cellNumber = 0;
        for (let rowInd = 0; rowInd < 30; rowInd++) {
        let currentRow = [];
        for (let colInd = 0; colInd < 52; colInd++) {
            if ((resetOnlyPath || resetOnlyWalls) && grid) {
            grid[rowInd][colInd].isVisited = false;
            grid[rowInd][colInd].distanceFromStart = Infinity;
            grid[rowInd][colInd].isTarget = false;
            grid[rowInd][colInd].previousCell = null;
            if (resetOnlyWalls) {
                grid[rowInd][colInd].isWall = false;
            }
            } else {
            currentRow.push({
                ...singleCell,
                row: rowInd,
                col: colInd,
                cellNumber,
            });
            }
            cellNumber++;
        }
        if (!resetOnlyPath) {
            gridCells.push(currentRow);
        }
        }
    
        return gridCells;
    };
    
    export const getCells = (grid) => {
        let cellsArray = [];
        [...grid].forEach((row) => {
        row.forEach((cell) => {
            cellsArray.push(cell);
        });
        });
        return cellsArray;
    };
    
    export const getPath = (endPoint) => {
        let path = getShortestPathCells(endPoint) || [];
        return path;
    };
    
    function getShortestPathCells(endCell) {
        const pathCells = [];
        let currentCell = endCell;
        while (currentCell) {
        pathCells.push(currentCell);
        currentCell = currentCell.previousCell;
        }
    
        return pathCells;
    }
    
    const classNames = (...classes) => {
        return classes.filter(Boolean).join(" ");
    };
    
    export  const generateOddRandomNumber = (numberArray) => {
        let max = numberArray.length - 1;
        let randomNum = Math.floor(Math.random() * (max / 2));
        if (randomNum % 2 === 0) {
        if (randomNum === max) randomNum -= 1;
        else randomNum += 1;
        }
        return numberArray[randomNum];
    };
    
    export const generateRandomNumberWithin = (maxValue) => {
        let randomNum = Math.floor(Math.random() * (maxValue / 2));
        if (randomNum % 2 !== 0) {
        if (randomNum === maxValue) {
            randomNum -= 1;
        } else {
            randomNum += 1;
        }
        }
        return randomNum;
    };
    