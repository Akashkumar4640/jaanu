/**
 * Proper Fisher-Yates shuffle for 3x3 puzzle board.
 * Randomly shuffles all 9 pieces across the entire grid,
 * ensuring pieces cross both rows and columns.
 */
export function generateRandomPuzzleBoard(): number[] {
  const solved = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let board: number[] = [];
  let isWellMixed = false;

  // Repeat until the arrangement is genuinely scrambled
  while (!isWellMixed) {
    board = [...solved];

    // Standard Fisher-Yates shuffle across all 9 unique piece positions
    for (let i = board.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [board[i], board[j]] = [board[j], board[i]];
    }

    // Measure how many pieces stayed in their original solved position
    const solvedPieces = board.filter((val, idx) => val === idx).length;

    // Measure how many pieces moved to a DIFFERENT row (0, 1, or 2)
    const rowCrossed = board.filter((val, idx) => Math.floor(val / 3) !== Math.floor(idx / 3)).length;

    // Measure how many pieces moved to a DIFFERENT column (0, 1, or 2)
    const colCrossed = board.filter((val, idx) => (val % 3) !== (idx % 3)).length;

    // Strict requirements:
    // 1. Not solved and not nearly solved (at most 1 piece in its correct spot)
    // 2. High degree of row-crossing: at least 5 pieces must be in a different row
    // 3. High degree of column-crossing: at least 5 pieces must be in a different column
    if (solvedPieces <= 1 && rowCrossed >= 5 && colCrossed >= 5) {
      isWellMixed = true;
    }
  }

  return board;
}
