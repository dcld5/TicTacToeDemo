"use client"

import { useState } from "react"
import { RotateCcw } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  createEmptyBoard,
  getWinner,
  isDraw,
  type Board,
  type Player,
} from "@/lib/game"
import { cn } from "@/lib/utils"

type Scores = Record<Player | "draws", number>

export function TicTacToe() {
  const [board, setBoard] = useState<Board>(createEmptyBoard)
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X")
  const [scores, setScores] = useState<Scores>({ X: 0, O: 0, draws: 0 })

  const { winner, line } = getWinner(board)
  const draw = !winner && isDraw(board)
  const gameOver = Boolean(winner || draw)

  function handleCellClick(index: number) {
    if (board[index] || gameOver) return

    const nextBoard = board.map((cell, i) =>
      i === index ? currentPlayer : cell
    )
    setBoard(nextBoard)

    const result = getWinner(nextBoard)
    if (result.winner) {
      setScores((prev) => ({
        ...prev,
        [result.winner!]: prev[result.winner!] + 1,
      }))
      return
    }

    if (isDraw(nextBoard)) {
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }))
      return
    }

    setCurrentPlayer((player) => (player === "X" ? "O" : "X"))
  }

  function resetRound() {
    setBoard(createEmptyBoard())
    // Winner keeps the next kickoff; after a draw, swap who starts.
    if (draw) {
      setCurrentPlayer((player) => (player === "X" ? "O" : "X"))
    }
  }

  function resetAll() {
    setBoard(createEmptyBoard())
    setCurrentPlayer("X")
    setScores({ X: 0, O: 0, draws: 0 })
  }

  const statusLabel = winner
    ? `Player ${winner} wins`
    : draw
      ? "It's a draw"
      : `Player ${currentPlayer}'s turn`

  return (
    <Card className="w-full max-w-md shadow-sm">
      <CardHeader className="text-center">
        <CardTitle className="font-heading text-3xl tracking-tight">
          TicTacToe
        </CardTitle>
        <CardDescription>
          Two players. Take turns. First to three in a row wins.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-6">
        <div className="flex w-full items-center justify-between gap-2">
          <ScorePill label="X" value={scores.X} active={currentPlayer === "X" && !gameOver} />
          <ScorePill label="Draws" value={scores.draws} muted />
          <ScorePill label="O" value={scores.O} active={currentPlayer === "O" && !gameOver} />
        </div>

        <Badge
          variant={winner ? "default" : draw ? "secondary" : "outline"}
          className="px-3 py-1 text-sm"
        >
          {statusLabel}
        </Badge>

        <div
          className="grid grid-cols-3 gap-2"
          role="grid"
          aria-label="Tic tac toe board"
        >
          {board.map((cell, index) => {
            const isWinningCell = line?.includes(index)
            return (
              <button
                key={index}
                type="button"
                role="gridcell"
                aria-label={
                  cell
                    ? `Cell ${index + 1}, ${cell}`
                    : `Cell ${index + 1}, empty`
                }
                disabled={Boolean(cell) || gameOver}
                onClick={() => handleCellClick(index)}
                className={cn(
                  "flex size-20 items-center justify-center rounded-xl border text-3xl font-semibold transition-all sm:size-24 sm:text-4xl",
                  "border-border bg-muted/40 hover:bg-muted disabled:hover:bg-muted/40",
                  "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
                  "disabled:cursor-default",
                  isWinningCell && "border-primary bg-primary/10 text-primary",
                  !cell && !gameOver && "cursor-pointer active:scale-[0.98]"
                )}
              >
                <span
                  className={cn(
                    cell === "X" && "text-foreground",
                    cell === "O" && "text-muted-foreground"
                  )}
                >
                  {cell}
                </span>
              </button>
            )
          })}
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="justify-center gap-2">
        <Button variant="outline" onClick={resetRound}>
          <RotateCcw data-icon="inline-start" />
          {gameOver ? "Next round" : "Reset board"}
        </Button>
        <Button variant="secondary" onClick={resetAll}>
          New game
        </Button>
      </CardFooter>
    </Card>
  )
}

function ScorePill({
  label,
  value,
  active = false,
  muted = false,
}: {
  label: string
  value: number
  active?: boolean
  muted?: boolean
}) {
  return (
    <div
      className={cn(
        "flex min-w-20 flex-col items-center rounded-lg border px-3 py-2",
        active && "border-primary bg-primary/5",
        muted && "border-transparent bg-muted/50"
      )}
    >
      <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
        {label}
      </span>
      <span className="text-lg font-semibold tabular-nums">{value}</span>
    </div>
  )
}
