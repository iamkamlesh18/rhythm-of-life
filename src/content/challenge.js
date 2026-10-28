export const challengePhases = [
  { name: 'Release', start: 1, end: 30 },
  { name: 'Rebuild', start: 31, end: 60 },
  { name: 'Rise', start: 61, end: 90 },
]

export const challengeEntries = (() => {
  const entries = []
  const themes = [
    'Reset', 'Breath', 'Gentle focus', 'Stillness', 'Patience', 'Ease', 'Self-trust', 'Lightness', 'Perspective', 'Grounding',
  ]

  for (let day = 1; day <= 90; day += 1) {
    const phase = day <= 30 ? 'Release' : day <= 60 ? 'Rebuild' : 'Rise'
    const theme = themes[(day - 1) % themes.length]
    const affirmation =
      day % 3 === 0
        ? 'I am allowed to move gently and still make progress.'
        : day % 3 === 1
          ? 'My rhythm is becoming steadier with each small step.'
          : 'I can begin again without judgment and still feel supported.'

    const action =
      day % 5 === 0
        ? 'Take three slow breaths and write one sentence about what feels lighter today.'
        : day % 5 === 1
          ? 'Put your phone away for two minutes and notice what is calmer when it is quiet.'
          : day % 5 === 2
            ? 'Choose one small action that supports your ease instead of your pressure.'
            : day % 5 === 3
              ? 'Pause for one minute and ask: what would feel more supportive right now?'
              : 'Take a short walk and notice what feels easier to carry after a few minutes.'

    const gratitude =
      day % 4 === 0
        ? 'What has been gentle or supportive today?'
        : day % 4 === 1
          ? 'What helped you feel more present for a moment today?'
          : day % 4 === 2
            ? 'What part of your day deserves a little tenderness?'
            : 'What is one small thing you can thank yourself for today?'

    entries.push({
      day,
      phase,
      theme,
      affirmation,
      action,
      gratitude,
    })
  }

  return entries
})()
