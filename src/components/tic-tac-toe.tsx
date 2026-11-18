"use client"

import { useState } from "react"
import { PartyPopper, RotateCcw, Sparkles } from "lucide-react"

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
import { celebrateDraw, celebrateWin } from "@/lib/confetti"
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
  const [lastMove, setLastMove] = useState<number | null>(null)

  const { winner, line } = getWinner(board)
  const draw = !winner && isDraw(board)
  const gameOver = Boolean(winner || draw)

  function handleCellClick(index: number) {
    if (board[index] || gameOver) return

    const nextBoard = board.map((cell, i) =>
      i === index ? currentPlayer : cell
    )
    setBoard(nextBoard)
    setLastMove(index)

    const result = getWinner(nextBoard)
    if (result.winner) {
      setScores((prev) => ({
        ...prev,
        [result.winner!]: prev[result.winner!] + 1,
      }))
      celebrateWin(result.winner)
      return
    }

    if (isDraw(nextBoard)) {
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }))
      celebrateDraw()
      return
    }

    setCurrentPlayer((player) => (player === "X" ? "O" : "X"))
  }

  function resetRound() {
    setBoard(createEmptyBoard())
    setLastMove(null)
    if (draw) {
      setCurrentPlayer((player) => (player === "X" ? "O" : "X"))
    }
  }

  function resetAll() {
    setBoard(createEmptyBoard())
    setCurrentPlayer("X")
    setScores({ X: 0, O: 0, draws: 0 })
    setLastMove(null)
  }

  const statusLabel = winner
    ? `Player ${winner} wins!`
    : draw
      ? "It's a draw — rematch?"
      : `Player ${currentPlayer}'s turn`

  return (
    <Card className="game-card w-full max-w-md overflow-hidden border-0 shadow-xl">
      <CardHeader className="relative text-center">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(135deg,oklch(0.92_0.08_45),oklch(0.93_0.07_185),oklch(0.94_0.06_95))] opacity-90" />
        <div className="relative">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Sparkles className="size-5 text-[oklch(0.65_0.18_45)]" />
            <CardTitle className="font-heading text-4xl tracking-tight">
              TicTacToe
            </CardTitle>
            <PartyPopper className="size-5 text-[oklch(0.62_0.14_185)]" />
          </div>
          <CardDescription className="text-base">
            Colorful showdown — first to three in a row wins.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="relative flex flex-col items-center gap-6 pt-2">
        <div className="flex w-full items-center justify-between gap-2">
          <ScorePill
            label="X"
            value={scores.X}
            tone="x"
            active={currentPlayer === "X" && !gameOver}
          />
          <ScorePill label="Draws" value={scores.draws} tone="draw" muted />
          <ScorePill
            label="O"
            value={scores.O}
            tone="o"
            active={currentPlayer === "O" && !gameOver}
          />
        </div>

        <Badge
          className={cn(
            "px-3.5 py-1.5 text-sm font-semibold transition-colors",
            winner === "X" &&
              "border-transparent bg-[oklch(0.72_0.17_45)] text-white",
            winner === "O" &&
              "border-transparent bg-[oklch(0.65_0.12_185)] text-white",
            draw && "border-transparent bg-[oklch(0.78_0.12_95)] text-[oklch(0.3_0.05_95)]",
            !gameOver &&
              currentPlayer === "X" &&
              "border-[oklch(0.78_0.12_45)] bg-[oklch(0.96_0.04_45)] text-[oklch(0.45_0.16_45)]",
            !gameOver &&
              currentPlayer === "O" &&
              "border-[oklch(0.75_0.08_185)] bg-[oklch(0.95_0.04_185)] text-[oklch(0.42_0.1_185)]"
          )}
        >
          {statusLabel}
        </Badge>

        <div
          className="board-grid grid grid-cols-3 gap-2.5 rounded-2xl p-3"
          role="grid"
          aria-label="Tic tac toe board"
        >
          {board.map((cell, index) => {
            const isWinningCell = line?.includes(index)
            const justPlayed = lastMove === index
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
                  "cell-button flex size-20 items-center justify-center rounded-2xl text-3xl font-bold transition-all sm:size-24 sm:text-4xl",
                  "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                  "disabled:cursor-default",
                  !cell &&
                    !gameOver &&
                    "cursor-pointer hover:-translate-y-0.5 hover:shadow-md active:scale-[0.97]",
                  isWinningCell && "cell-win",
                  justPlayed && cell && "cell-pop"
                )}
              >
                {cell && (
                  <span
                    className={cn(
                      "mark",
                      cell === "X" ? "mark-x" : "mark-o",
                      justPlayed && "mark-enter"
                    )}
                  >
                    {cell}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </CardContent>

      <Separator className="opacity-60" />

      <CardFooter className="justify-center gap-2 bg-[oklch(0.985_0.01_95)]">
        <Button
          variant="outline"
          onClick={resetRound}
          className="border-[oklch(0.85_0.05_45)] bg-white hover:bg-[oklch(0.97_0.03_45)]"
        >
          <RotateCcw data-icon="inline-start" />
          {gameOver ? "Next round" : "Reset board"}
        </Button>
        <Button
          onClick={resetAll}
          className="bg-[oklch(0.55_0.14_185)] text-white hover:bg-[oklch(0.48_0.14_185)]"
        >
          New game
        </Button>
      </CardFooter>
    </Card>
  )
}

function ScorePill({
  label,
  value,
  tone,
  active = false,
  muted = false,
}: {
  label: string
  value: number
  tone: "x" | "o" | "draw"
  active?: boolean
  muted?: boolean
}) {
  return (
    <div
      className={cn(
        "score-pill flex min-w-20 flex-col items-center rounded-xl border px-3 py-2.5 transition-all",
        tone === "x" && "border-[oklch(0.85_0.08_45)] bg-[oklch(0.97_0.03_45)]",
        tone === "o" && "border-[oklch(0.85_0.06_185)] bg-[oklch(0.96_0.03_185)]",
        tone === "draw" && "border-transparent bg-[oklch(0.96_0.02_95)]",
        active && "scale-105 shadow-md ring-2",
        active && tone === "x" && "ring-[oklch(0.72_0.15_45)]",
        active && tone === "o" && "ring-[oklch(0.65_0.12_185)]",
        muted && "opacity-90"
      )}
    >
      <span
        className={cn(
          "text-xs font-bold tracking-wide uppercase",
          tone === "x" && "text-[oklch(0.55_0.16_45)]",
          tone === "o" && "text-[oklch(0.48_0.11_185)]",
          tone === "draw" && "text-muted-foreground"
        )}
      >
        {label}
      </span>
      <span className="text-xl font-bold tabular-nums">{value}</span>
    </div>
  )
}
