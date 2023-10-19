
import React, { useEffect, useRef, useState } from "react";
import Astar from "../astar algorithim/astar";
import { getCellObjects, getPath } from "../utils/helpers";
import Cell from "./Cell";

    import {
    RectangleGroupIcon,
    CalendarIcon,
    MapPinIcon,
    } from "@heroicons/react/24/outline";

    const GridBoard = () => {
    const gridBoardCells = useRef(getCellObjects());

    const [startPoint, setStartPoint] = useState(null);
    const [endPoint, setEndPoint] = useState(null);
    const [foundPath, setFoundPath] = useState(null);

    const [isMouseDown, setIsMouseDown] = useState(false);
    const [renderFlag, setRenderFlag] = useState(false);

    const resetBoardData = () => {
        document.querySelectorAll(`.cell`).forEach((item) => {
        if (item.classList.contains("cell-visited")) {
            item.classList.remove("cell-visited");
        }
        if (item.classList.contains("cell-path")) {
            item.classList.remove("cell-path");
        }
        });
        setFoundPath(null);
    };

    const clearBoard = () => {
        gridBoardCells.current = getCellObjects(true, true, gridBoardCells.current);
        resetBoardData();
    };

    const clearPath = () => {
        gridBoardCells.current = getCellObjects(true, false, gridBoardCells.current);
        resetBoardData();
    };

    const onMouseEnter = (rowIndex, colIndex) => {
        setRenderFlag(!renderFlag);
        let element = gridBoardCells.current[rowIndex];
        if (!isMouseDown) return;
        if (element[colIndex].isStartPoint || element[colIndex].isEndPoint) return;
        element[colIndex].isWall = !element[colIndex].isWall;
    };

    const onCellClick = (cell, rowIndex, colIndex) => {
        let clickedCell = gridBoardCells.current[rowIndex][colIndex];
        if (clickedCell.isWall) {
        clickedCell.isWall = false;
        return;
        }
        if (cell.cellNumber === startPoint?.cellNumber) {
        setStartPoint(null);
        clickedCell.isStartPoint = false;
        clickedCell.distanceFromStart = Infinity;
        return;
        }
        if (cell.cellNumber === endPoint?.cellNumber) {
        setEndPoint(null);
        clickedCell.isEndPoint = false;
        return;
        }
        if (startPoint && endPoint) {
        clickedCell.isWall = true;
        return;
        }
        if (!startPoint) {
        setStartPoint({
            ...clickedCell,
            isStartPoint: true,
            distanceFromStart: 0,
        });
        clickedCell.isStartPoint = true;
        clickedCell.distanceFromStart = 0;
        } else if (startPoint) {
        setEndPoint({
            ...clickedCell,
            isEndPoint: true,
        });
        clickedCell.isEndPoint = true;
        }
    };

    const animateAlgo = (visitedCells, path) => {
        for (let i = 0; i < visitedCells.length; i++) {
        setTimeout(() => {
            const cell = visitedCells[i];
            let item = document.getElementById(`cell-${cell.row}-${cell.col}`);
            if (item) {
            item.className += " cell-visited";
            }
            if (cell.isTarget) {
            setFoundPath(path);
            }
        }, (10) * i);
        }
    };

    const animatePath = (path) => {
        for (let i = 0; i < path.length; i++) {
        setTimeout(() => {
            const cell = path[i];
            let item = document.getElementById(`cell-${cell.row}-${cell.col}`);
            if (item) {
            item.className += " cell-path";
            }
        }, (25) * i);
        }
    };

    const visualizeAlgo = (type) => {
        if (!startPoint || !endPoint) {
        alert("Please mark starting and ending point");
        return;
        }

        let grid = gridBoardCells.current;
        let start = grid[startPoint.row][startPoint.col];
        let end = grid[endPoint.row][endPoint.col];
        let visitedCells = [];
        console.log(start);
        console.log(end);
        let [dCells, DTime] = Astar(grid, start, end) || [];
        visitedCells = dCells || [];

        const path = getPath(end);
        console.log(path);
        animateAlgo(visitedCells, path);
    };

    useEffect(() => {
        if (foundPath && startPoint && endPoint) {
        animatePath(foundPath);
        }
    }, [foundPath]);

    return (
        <>
        <div className="bg-gray-900 pt-4">
            <div className="mx-auto flex max-w-7xl md:flex-row flex-col items-center justify-between">
            <div className="flex flex-1 flex-wrap md:flex-row flex-col gap-4 items-start md:items-center w-full justify-start space-x-4 mx-4">
                <button
                onClick={() => visualizeAlgo()}
                className="items-center w-fit disabled:bg-indigo-400 disabled:cursor-not-allowed inline-flex bg-indigo-600 text-[15px] text-white px-4 py-2 rounded-md"
                >
                <RectangleGroupIcon className="h-5 w-5 mr-2" /> Visualize
                </button>
                <button
                onClick={() => {
                    clearBoard();
                    setRenderFlag(!renderFlag);
                }}
                className="items-center w-fit disabled:bg-green-500 disabled:cursor-not-allowed inline-flex bg-green-600 text-[15px] text-white px-4 py-2 rounded-md"
                >
                <CalendarIcon className="h-5 w-5 mr-2" /> Clear board
                </button>
                <button
                onClick={() => {
                    clearPath();
                }}
                className="items-center w-fit disabled:bg-green-500 disabled:cursor-not-allowed inline-flex bg-green-600 text-[15px] text-white px-4 py-2 rounded-md"
                >
                <MapPinIcon className="h-5 w-5 mr-2" /> Clear path
                </button>
            </div>
            </div>
        </div>
        <br></br>
        <div className="grid grid-cols-gridmap overflow-auto w-full px-4 justify-start md:justify-center items-center my-3">
            {gridBoardCells.current.map((row, rowIndex) => {
            return (
                <React.Fragment key={rowIndex}>
                {row.map((cell, colIndex) => {
                    return (
                    <Cell
                        key={colIndex}
                        id={`cell-${cell.row}-${cell.col}`}
                        onMouseDown={() => {
                        setIsMouseDown(true);
                        }}
                        onMouseEnter={() => {
                        onMouseEnter(rowIndex, colIndex);
                        }}
                        onMouseUp={() => {
                        setIsMouseDown(false);
                        }}
                        onClick={() => {
                        onCellClick(cell, rowIndex, colIndex);
                        }}
                        {...cell}
                    />
                    );
                })}
                </React.Fragment>
            );
            })}
        </div>
        </>
    );
    };

export default GridBoard;



// import React,{useState,useEffect} from "react";
// import "./pathfind.css"
// import Node from "./node";
// const rows=15;
// const cols=15;
// const NODE_START_ROW= 0;
// const NODE_START_COL = 0;
// const NODE_END_ROW = rows-1;
// const NODE_END_COL = cols - 1;

// const Pathfind=()=>{
//     const [Grid,setGrid]=useState([]);
//     const [Path, setPath]=useState([]);
//     const [VisitedNodes, setVisitedNodes]=useState([]);
    
//     useEffect(()=>{
//         initalizegrid();
//     },[]);

//     const initalizegrid=()=>{
//         const grid=new Array(rows);

//         for(let i=0;i<rows;i++){
//             grid[i]=new Array(cols);
//         }

//         createSpot(grid);

//         setGrid(grid);

//         addNeighbours(grid);
//         const startNode=grid[NODE_START_ROW][NODE_START_COL];
//         const endNode=grid[NODE_END_ROW][NODE_END_COL];
//         let path=Astar(startNode,endNode);
//         startNode.isWall=false;
//         endNode.isWall=false;
//         setPath(path.path);
//         setVisitedNodes(path.visitedNodes);
//     };
//     // CREATE SPOT
//     const createSpot=(grid)=>{
//         for(let i=0;i<rows;i++){
//             for(let j=0;j<cols;j++){
//                 grid[i][j]=new Spot(i,j);
//             }
//         }
//     };
    
//     //Add Neighbours
//     const addNeighbours = (grid) => {
//         for (let i = 0; i < rows; i++){
//             for (let j = 0; j < cols; j++){
//             grid[i][j].addneighbours(grid);
//     }
// }
//     }
//     //spot consturctor
//     function Spot(i,j){
//         this.x=i;
//         this.y=j;
//         this.f=0;
//         this.isStart = this.x===NODE_START_ROW && this.y===NODE_START_COL;
//         this.isEnd = this.x===NODE_END_ROW && this.y===NODE_END_COL;
//         this.g=0;
//         this.f=0;
//         this.h=0;
//         this.neighbours = [];
//         this.isWall=false;
//         if(Math.random(1)<0.2){
//             this.isWall=true;
//         }
//         this.previous=undefined;
//         this.addneighbours = function(grid)
//         {
//             let i = this.x;
//             let j = this.y;
//             if(i > 0) this.neighbours.push(grid[i-1][j]);
//             if(i < rows - 1) this.neighbours.push(grid[i+1][j]);
//             if(j > 0) this.neighbours.push(grid[i][j-1]);
//             if(j < cols - 1) this.neighbours.push(grid[i][j+1]);
//         };

//     }
//     //grid withb node
//     const gridWithNode=(
//         <div className="oo">
//             {Grid.map((row,rowIndex)=>{
//                 return(
//                     <div key={rowIndex} >
//                     {row.map((col,colIndex)=>{
//                         const{isStart, isEnd,isWall}=col;
//                         return <Node key={colIndex} isStart=
//                             {isStart} isEnd={isEnd} row={rowIndex} col={colIndex} isWall={isWall}
//                         />;
//                     })}
//                     </div>
//                 );
//             })}
//         </div>
//     );
//     const visualizeShortestPath=(shortestPathNodes)=>
//     {
//         for(let i=0;i<shortestPathNodes.length;i++)
//         {
//             setTimeout(()=>{
//                 const node=shortestPathNodes[i];
//                 document.getElementById(`node-${node.x}-${node.y}`).className="node node-shortest-path";
//             },10*i)
//         }
//     }
//     const visualizePath=()=>
//     {
//         for(let i=0;i<=VisitedNodes.length;i++)
//         {
//             if(i===VisitedNodes.length){
//                 setTimeout(()=>{
//                     visualizeShortestPath(Path);
//                 },20*i);
//             }else{
//                 setTimeout(()=>{
//                 const node=VisitedNodes[i];
//                 document.getElementById(`node-${node.x}-${node.y}`).className="node node-visited";
//             },20*i);
//             }
//         }
//     }
//     console.log(Path);
//     return (
//         <div className="Wrapper">
//         <button onClick={visualizePath}>Visualize Path</button>
//             <h1>path find component</h1>
//             {gridWithNode}
//         </div>
//     )
// };
// export default Pathfind;