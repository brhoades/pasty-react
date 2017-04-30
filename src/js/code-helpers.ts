declare var $: any;
import _ from "lodash/util"

// helpers to use when displaying code

// Take some the contents of pre > code with line endings
//
// Return contents for a div with a table for displaying code
// with line numbers.
export function splitWithLineNumbers(code: string): string {
  let inner: string[] = code.split("\n").map((e, i) => {
    return `<tr class="cv--row" line="${i+1}"><td class="cv--line-number">${i+1}</td><td class="cv--code">${e}</td></tr>`;
  });

  return `<table class="cv--table"><tbody class="cv--tbody">${inner.join("\n")}</tbody></table>`;
}

// todo: modularize and cleanup
export function registerClickHandlers(fileid: number, code: any): void {
  let $s = $(code);

  $s.find('.cv--line-number').on("click", (e) => {
    // shift highlights code between this line and the last-clicked
    if(e.shiftKey && $(".cv--last-clicked").length) {
      let last = $(".cv--last-clicked");
      $s.find(".cv--last-clicked").removeClass("cv--last-clicked");

      if(!e.ctrlKey) {
        // remove all other highlights
        $s.find(".cv--highlighted").removeClass("cv--highlighted");
        last.addClass("cv--highlighted");
        $(e.target).parent('tr').addClass("cv--highlighted");
      }

      let lastLine: number = parseInt(last.attr("line"));
      let currentLine: number = parseInt($(e.target).parent('tr').attr("line"));

      last.parent('tbody').children().forEach((e) => {
        let eLine: number = parseInt($(e).attr("line"));
        // highlight top-down, then try bottom-up
        if(currentLine < lastLine && eLine > currentLine && eLine <= lastLine) {
          $(e).addClass("cv--highlighted");
        } else if(currentLine >= lastLine && eLine < currentLine && eLine >= lastLine) {
          $(e).addClass("cv--highlighted");
        }

      });
    } else {
      // If shift isn't held, handle individual lines.
      let tr = $(e.target).parent('tr');

      $s.find(".cv--last-clicked").removeClass("cv--last-clicked");
      if(tr.hasClass("cv--highlighted")) {
        tr.removeClass("cv--highlighted");

        if(!e.ctrlKey) {
          $s.find(".cv--highlighted").removeClass("cv--highlighted");
        }
      } else {
        if(!e.ctrlKey) {
          $s.find(".cv--highlighted").removeClass("cv--highlighted");
        }

        tr.addClass("cv--highlighted");
        tr.addClass("cv--last-clicked");
      }
    }

    $s.trigger($.Event("highlight-update"));
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
  }).addClass('cv--highlighted');
}
