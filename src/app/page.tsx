import { TicTacToe } from "@/components/tic-tac-toe"

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-10">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_oklch(0.95_0.02_250),_transparent_55%),radial-gradient(ellipse_at_bottom,_oklch(0.96_0.015_80),_transparent_50%)]" />
      <TicTacToe />
    </main>
  )
}
