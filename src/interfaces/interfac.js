export const CellInterface = {
    cellNumber: 0,
    col: 0,
    row: 0,
    isVisited: false,
    isWall: false,
    isStartPoint: false,
    isEndPoint: false,
    distanceFromStart: 0,
    previousCell: null,
    };
    
    export const SearchingAlgoEnum = {
        DIJKSTRA: "DIJKSTRA",
        BFS: "BFS",
        DFS: "DFS",
    };
    
    export const AlgorithmOption = {
        name: "",
        type: SearchingAlgoEnum.DIJKSTRA,
        onClick: () => {},
    };
    