/* tslint:disable */
/*
Language: irc
Authors: Swant <hljs@swant.pw>
         Billy Rhoades <billyarhoades@gmail.com>
Website: https://swant.pw/
Category: misc
   
Mostly meant to match weechat raw output.
*/

export default function(hljs) {
  return {
  case_insensitive: true,
  aliases: ['irc-logs'],
  contains: [
    {
      className: 'meta',
      begin: /^\[?[0-9]{2}:[0-9]{2}:[0-9]{2}\]?/, end: /$/,
      relevance: 3,
      contains: [
        // Channel info
        {
          className: 'title',
          begin: '-- ', end: /$/,
          relevance: 10,
          endsParent: true,
        },
        // Action
        {
          className: 'title',
          begin: /\*\s/, end: /$/,
          endsParent: true,
          contains: [
            {
              // their name
              className: 'built_in',
              begin: /\w+/,
              relevance: 10,
              beginEnds: true,
            },
            {
              // action text
              className: 'subst',
              endsParent: true,
              begin: /\s/, end: /$/,
              contains: [
                // timestamp
                {
                  className: 'meta',
                  begin: /\[/, end: /\]/
                },
              ],
            },
          ],
        },
        // message
        {
          className: 'keyword',
          begin: ' <', end: /$/,
          endsParent: true,
          contains: [
            {
              // someone's handle
              // a special symbol, like op/halfop
              className: 'literal',
              begin: /[~@%+]{1}/, end: '.',
              returnBegin: true,
              relevance: 5,
            },
            {
              // their name
              className: 'keyword',
              begin: /[^~@%+\ ]/, end: '>',
            },
            {
              // message
              className: 'built_in',
              begin: ' ', end: /$/,
              relevance: 10,
              endsParent: true,
              contains: [
                // timestamp
                {
                  className: 'meta',
                  begin: /\[/, end: /\]/
                },
                {
                  className: 'link',
                  begin: /(https?|ftp):\/\/[^\s\/$.?#].[^\s]*/,
                  end: '.',
                  returnEnd: true,
                  endsParent: true
                }
              ],
            },

          ],
        },

      ],
    },

  ]}

}
