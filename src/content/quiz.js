export const quizQuestions = [
  {
    id: 'energy',
    question: 'When your week feels full, what is the first thing that shifts?',
    options: [
      { text: 'I start scattered and jump between things.', outcome: 'Scattered' },
      { text: 'I feel heavy, tired, and emotionally full.', outcome: 'Heavy' },
      { text: 'I freeze and keep circling the same thought.', outcome: 'Stuck' },
      { text: 'I feel calm and steadily focused.', outcome: 'Flowing' },
    ],
  },
  {
    id: 'patterns',
    question: 'What happens when you are trying to make a change?',
    options: [
      { text: 'I start five things at once and lose momentum.', outcome: 'Scattered' },
      { text: 'I carry the pressure so deeply that I feel drained.', outcome: 'Heavy' },
      { text: 'I keep returning to old habits without a clear way forward.', outcome: 'Stuck' },
      { text: 'I find the next gentle step and move with it.', outcome: 'Flowing' },
    ],
  },
  {
    id: 'support',
    question: 'What kind of support feels most natural right now?',
    options: [
      { text: 'More structure and gentle focus.', outcome: 'Scattered' },
      { text: 'A softer place to release emotional weight.', outcome: 'Heavy' },
      { text: 'A way to move past the loop without forcing.', outcome: 'Stuck' },
      { text: 'A rhythm that helps me stay aligned and steady.', outcome: 'Flowing' },
    ],
  },
]

export const quizResults = {
  Scattered: {
    insight: 'You are not failing at focus; you are carrying too many signals at once. A calmer rhythm can help your attention settle.',
    affirmation: 'I can return to a rhythm that feels gentler and clearer.',
  },
  Heavy: {
    insight: 'You are carrying more than you were meant to carry alone. There is space for softness and support to meet you.',
    affirmation: 'I am allowed to set down what is too heavy to hold alone.',
  },
  Stuck: {
    insight: 'The pattern is familiar, but it does not have to be your only path. You are ready for a gentler movement forward.',
    affirmation: 'I can move forward with patience and a softer pace.',
  },
  Flowing: {
    insight: 'You are already listening to what helps you feel more aligned. A little more care can help you keep that rhythm alive.',
    affirmation: 'I trust the rhythm that brings me closer to ease and clarity.',
  },
}
