import { Howl } from 'howler'

const base = import.meta.env.BASE_URL + 'audio/'

const make = (file) =>
  new Howl({
    src: [base + file],
    loop: true,
    volume: 0,
    preload: false,
  })

export const tracks = {
  rain: make('rain.mp3'),
  forest: make('forest.mp3'),
  ocean: make('ocean.mp3'),
  bowl: make('bowl.mp3'),
}

export const playTrack = (id, volume = 0.35) => {
  const track = tracks[id]
  if (!track) return

  if (!track.playing()) {
    track.play()
  }

  track.fade(0, volume, 1500)
}

export const stopTrack = (id) => {
  const track = tracks[id]
  if (!track) return

  track.fade(track.volume(), 0, 1000)
  setTimeout(() => track.stop(), 1000)
}
