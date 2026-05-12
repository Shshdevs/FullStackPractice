import _ from 'lodash'

export const ideas = _.times(100, (i) => ({
  nick: `cool-idea-nick-${i}`,
  name: `Idea ${i}`,
  description: `Such a cool idea№${i} in my head!`,
  text: _.times(100, (j) => `<p>Text paragraph ${j} of idea ${i}</p>`).join(''),
}))
