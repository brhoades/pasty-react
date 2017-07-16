/*
Language: irc
Authors: Swant <hljs@swant.pw>
         Billy Rhoades <billyarhoades@gmail.com>
Website: https://swant.pw/
Category: misc
*/

export default function(hljs) {
  return {
  case_insensitive: true,
  aliases: ['irc-logs'],
  contains: [
    {
      className: 'meta',
      begin: '^\\[', end: '\\]'
    },
    {
      className: 'number',
      begin: '\\[[0-9]\{2\}:', end: '[0-9]\{2\}:[0-9]\{2\}\\]'
    },
    {
      className: 'meta',
      begin: '^[0-9]\{2\}:[0-9]\{2\}:[0-9]\{2\}', end: '.',
      returnBegin: true,
      relevance: 3
    },
    {
      className: 'title',
      begin: ' -', end: '- '
    },
    {
      className: 'title',
      begin: '^-', end: '- '
    },
    {
      className: 'built_in',
      begin: ' <', end: '> ',
      contains: [
        {
          className: 'symbol',
          begin: '[\\^~@%]{1}',
          returnBegin: true,
          end: '.',
          relevance: 5
        }
      ],
      relevance: 3
    },
    {
      className: 'built_in',
      begin: '^<', end: '> '
    }
  ]
}
}
