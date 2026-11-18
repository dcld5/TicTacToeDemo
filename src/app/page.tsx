import { TicTacToe } from "@/components/tic-tac-toe"

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-10">
      <div className="game-backdrop pointer-events-none absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="blob blob-a" />
        <div className="blob blob-b" />
        <div className="blob blob-c" />
      </div>
      <TicTacToe />
    </main>
  )
}
