const getNeighbors = (currentCell, grid) => {
        const neighbors = [];
        const { col, row } = currentCell;
    
        if (col > 0) neighbors.push(grid[row][col - 1]);
    
        if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    
        if (row > 0) neighbors.push(grid[row - 1][col]);
    
        if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    
        return neighbors.filter((n) => !n?.isVisited);
};
    
const traverseFurtherInGrid = (currentCell, grid,endCell) => {
        let remainingNeighbors = getNeighbors(currentCell, grid);
        for (let cell of remainingNeighbors) {
            let d = Math.abs(cell.col-endCell.col) + Math.abs(cell.row -endCell.row);
        cell.distanceFromStart = currentCell.distanceFromStart + 1+d;
        
        cell.previousCell = currentCell;
        }
};
    
const Astar = (grid, startCell, endCell) => {
        let startTime = Date.now();
        let endTime;
        let unvisitedCells = grid.flat(); // flatten the grid
        startCell.distanceFromStart = 0;
        let visitedCells = [];
    
        while (unvisitedCells.length > 0) {
        unvisitedCells.sort(
            (cellA, cellB) => cellA.distanceFromStart - cellB.distanceFromStart
        );
        let currentCell = unvisitedCells.shift();
    
        if (!currentCell) {
            endTime = Date.now();
            return [visitedCells, endTime - startTime];
        }
        if (currentCell.isWall) continue;
        if (currentCell.distanceFromStart === Infinity) {
            endTime = Date.now();
            return [visitedCells, endTime - startTime];
        }
        currentCell.isVisited = true;
        visitedCells.push(currentCell);
        if (currentCell.cellNumber === endCell.cellNumber) {
            currentCell.isTarget = true;
            endTime = Date.now();
            return [visitedCells, endTime - startTime];
        }
        traverseFurtherInGrid(currentCell, grid,endCell);
        }
};
  
  

  
export default Astar;
// function Astar(startNode,endnode) {
//     let openSet =[];
//     let closedSet=[];
//     let path =[];
//     let visitedNodes=[];

//     openSet.push(startNode);
//     while (openSet.length>0){
//         let leastIndex =0;
//         for (let i = 0; i < openSet.length; i++){
//             if (openSet[i].f< openSet[leastIndex].f){
//                 leastIndex = i;
//             }
//         }

//         let current = openSet[leastIndex];
//         visitedNodes.push(current);
//         if (current ===endnode) {
//             let temp=current;
//             path.push(temp.previous);
//             while(temp.previous)
//             {
//                 path.push(temp.previous);
//                 temp=temp.previous;
//             }
//             //console.log(path);
//             return {path,visitedNodes};
//             //console.log("Done! pathFound!");
//         }

//         openSet = openSet.filter((elt)=> elt !== current);
//         closedSet.push(current);

//         let neighbours = current.neighbours;
//         for(let i = 0; i <neighbours.length; i++)
//         {
//             let neighbour = neighbours[i];
//             if(!closedSet.includes(neighbour) && !neighbour.isWall)
//             {
//                 let tempG = current.g + 1;
//                 let newPath = false;
//                 if(openSet.includes(neighbour)) {
//                     if (tempG < neighbour.g) {
//                         neighbour.g = tempG;
//                         newPath = true;
//                     }
//                 }else {
//                     neighbour.g = tempG;
//                     newPath = true;
//                     openSet.push(neighbour);
//                 }

//                 if (newPath)
//                 {
//                     neighbour.h = heruistic(neighbour,endnode);
//                     neighbour.f = neighbour.g + neighbour.h;
//                     neighbour.previous = current;
//                 }
                
//                 }
//             }
//         }
//         return {path,visitedNodes, error:"No path found!"};
//     }
//     function heruistic(a, b){
//         let d = Math.abs(a.x -a.y) + Math.abs(b.x -b.y);
//         return d;
//     }
// Go until you hit a wall
// Change direction as soon as you hit a wall