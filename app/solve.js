function is_valid(grid, r, c, num) {
  // 1. Check the Row
  for (let i = 0; i < 9; i++) {
    if (grid[r][i] === num) {
      return false; // Found the number already in this row!
    }
  }

  // 2. Check the Column
  for (let i = 0; i < 9; i++) {
    if (grid[i][c] === num) {
      return false; // Found the number already in this column!
    }
  }

  // 3. Check the 3x3 Box
  // We find the "start" coordinates for the 3x3 square
  let startRow = Math.floor(r / 3) * 3;
  let startCol = Math.floor(c / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[startRow + i][startCol + j] === num) {
        return false; // Found the number in the 3x3 box!
      }
    }
  }

  // If we checked everything and didn't find the number, it's valid!
  return true;
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function solve(grid, cell_value, r = 0, c = 0){
    console.log('testing');
    if (r == 9){ console.log('solved'); return true;}
    else if (c == 9){ 
        return await solve(grid, cell_value, r + 1, 0);
    }
    else if (grid[r][c] !== 0){
        return await solve(grid, cell_value, r, c + 1);
    }
    else{
        for (let num = 1; num < 10; num++){
        if (is_valid(grid, r, c, num)){
            grid[r][c] = num;

            cell_value([...grid.map(row => [...row])]);
            await sleep(50);

            if (await solve(grid,cell_value, r, c + 1)){
                return true;
            }
            grid[r][c] = 0;
            cell_value([...grid.map(row => [...row])]);
            await sleep(20);
        }
        }
        return false;
    }

}
