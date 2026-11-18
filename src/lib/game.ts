export type Player = "X" | "O"
export type CellValue = Player | null
export type Board = CellValue[]

export const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const

export function createEmptyBoard(): Board {
  return Array.from({ length: 9 }, () => null)
}

export function getWinner(board: Board): {
  winner: Player | null
  line: readonly number[] | null
} {
  for (const line of WIN_LINES) {
    const [a, b, c] = line
    const value = board[a]
    if (value && value === board[b] && value === board[c]) {
      return { winner: value, line }
    }
  }
  return { winner: null, line: null }
}

export function isDraw(board: Board): boolean {
  return board.every((cell) => cell !== null) && !getWinner(board).winner
}
