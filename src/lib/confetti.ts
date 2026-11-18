import confetti from "canvas-confetti"

const X_COLORS = ["#ff6b4a", "#ff8f6b", "#ffd166", "#fff1c1"]
const O_COLORS = ["#1fb6a6", "#3dd6c6", "#7ee8db", "#c8f7f0"]
const DRAW_COLORS = ["#94a3b8", "#cbd5e1", "#fbbf24", "#fde68a"]

export function celebrateWin(player: "X" | "O") {
  const colors = player === "X" ? X_COLORS : O_COLORS

  confetti({
    particleCount: 90,
    spread: 70,
    origin: { y: 0.65 },
    colors,
    scalar: 1.05,
  })

  window.setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors,
    })
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors,
    })
  }, 180)
}

export function celebrateDraw() {
  confetti({
    particleCount: 40,
    spread: 55,
    startVelocity: 25,
    origin: { y: 0.7 },
    colors: DRAW_COLORS,
    scalar: 0.85,
  })
}
