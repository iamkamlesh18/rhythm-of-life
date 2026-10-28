export const NUMBER = '917770000347'

export const waLink = (msg) =>
  `https://wa.me/${NUMBER}?text=${encodeURIComponent(msg)}`
