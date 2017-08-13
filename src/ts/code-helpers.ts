declare var $: any;
import _ from "lodash/util"
import irchljs from '../hljs/irc'

// helpers to use when displaying code
//
// todo: modularize and cleanup
export function registerClickHandlers(scope: any, lineclass: string, highlightclass: string): void {
  scope.find(lineclass).on("click", (e) => {
    // shift highlights code between this line and the last-clicked
    if(e.shiftKey && $(".last-clicked").length) {
      let last = $(".last-clicked");
      scope.find(".last-clicked").removeClass("last-clicked");

      if(!e.ctrlKey) {
        // remove all other highlights
        scope.find().removeClass(highlightclass);
        last.addClass(highlightclass);
        $(e.target).addClass(highlightclass);
      }

      let lastLine: number = parseInt(last.attr("data-line"));
      let currentLine: number = parseInt($(e.target).attr("data-line"));

      last.parent('tbody').children().forEach((e) => {
        let eLine: number = parseInt($(e).attr("data-line"));
        // highlight top-down, then try bottom-up
        if(currentLine < lastLine && eLine > currentLine && eLine <= lastLine) {
          $(e).addClass(highlightclass);
        } else if(currentLine >= lastLine && eLine < currentLine && eLine >= lastLine) {
          $(e).addClass(highlightclass);
        }

      });
    } else {
      // If shift isn't held, handle individual lines.
      let tr = $(e.target);

      scope.find(".last-clicked").removeClass("last-clicked");
      if(tr.hasClass(highlightclass)) {
        tr.removeClass(highlightclass);

        if(!e.ctrlKey) {
          scope.find(highlightclass).removeClass(highlightclass);
        }
      } else {
        if(!e.ctrlKey) {
          scope.find(highlightclass).removeClass(highlightclass);
        }

        tr.addClass(highlightclass);
        tr.addClass("last-clicked");
      }
    }

    scope.trigger($.Event("highlight-update"));
  });
}

// return comma-separated string of ranges... ie:
// 21-30, 10-16, 3, 4
// for all highlighted line number
export function serializeLineNumbers(lines: number[]): string {
  return lines.sort().reduce((acc: number[][], e: number) => {
    // start
    if(acc.length == 0) {
      return [[e]];
    }

    let lastArray: number[] = acc[acc.length - 1];
    let lastArrayE: number = lastArray[lastArray.length - 1];

    if(lastArrayE + 1 == e) {
      return [...acc.slice(0, -1), [...lastArray, e]];
    }

    return [...acc, [e]];
  }, []).reduce((acc: string[], e: number[]) => {
    if(e.length > 1) {
      return [...acc, `${e[0]}-${e[e.length - 1]}`];
    }

    return [...acc, `${e[0]}`];
  }, []).join(",");
}

export function unserializeLineNumbers(lines: string): number[] {
  return lines.split(",").reduce((acc: number[], e: string) => {
    if(/-/.test(e)) {
      const [lower, upper] = e.split("-");

      return [...acc, ..._.range(lower, upper)];
    }

    return [...acc, parseInt(e)];
  }, []);
}

export function highlightLines(scope, highlighted) {
  scope.find('tr').filter((i) => {
    return highlighted.indexOf(i + 1) >= 0;
  }).addClass('viewcode-highlighted');
}

export function registerLanguage(hljs) {
  hljs.registerLanguage('irc', irchljs);
}
