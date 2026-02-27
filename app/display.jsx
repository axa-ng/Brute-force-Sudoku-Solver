import { useState } from 'react';
import { solve } from "./solve.js";

function Box({ value, row, col, updateCell }) {
  // Logic to decide what to show in the input box
  let displayValue = value;
  if (value === 0) {
    displayValue = ""; // If data is 0, show an empty box
  }

  const cellStyle = {
    borderBottom: (row === 2 || row === 5) ? '5px solid white' : '1px solid #ccc',
    borderRight: (col === 2 || col === 5) ? '5px solid white' : '1px solid #ccc',
  };

  return (
    <input
      type="number"
      className="cell-input"
      value={displayValue}
      onChange={function(e) {
        // When user types, send the row, column, and new text up to Main
        updateCell(row, col, e.target.value);
      }}
      style={cellStyle}
    />
  );
}

function Display({ board, updateCell }) {
  const visualCells = [];

  // Use simple loops to build the list of Box components
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      visualCells.push(
        <Box 
          key={`${r}-${c}`} 
          value={board[r][c]} 
          row={r} 
          col={c} 
          updateCell={updateCell} 
        />
      );
    }
  }

  return <div className="grid">{visualCells}</div>;
}

export function Main(){
  const [grid, cell_value] = useState(create_grid_array(9,9));
  
  function update_grid(r, c, num){
    const new_grid = [...grid];
    const row = [...new_grid[r]];
    
    if (num === ''){
      row[c] = 0;
    } 
    else if (isNaN(parseInt(num)) || num > 9) {
      row[c] = 0;
    } else{
      row[c] = parseInt(num);
    }
    new_grid[r] = row;
    cell_value(new_grid);
  };

  return (
    <div className="wrapper">
      <h2>Sudoku Solver</h2>
      <Display board={grid} updateCell={update_grid} />
      
      <button 
        style={{ marginTop: '20px', padding: '10px 30px', cursor: 'pointer' }}
        onClick={async () =>  await solve(grid, cell_value)}
      >Solve</button>
    </div>
  );
}

function create_grid_array(r, c){
  const grid = [];

  for(let i = 0; i < r; i++){
    grid[i] = [];
    for(let j = 0; j < c; j++){
      grid[i][j] = 0;
    }
  }

  return grid;
}

