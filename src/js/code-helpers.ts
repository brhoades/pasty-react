declare var $: any;
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

export function registerClickHandlers(fileid: number, code: any): void {
  $(code).find('.cv--line-number').on("click", (e) => {
    // shift highlights code between this line and the last-clicked
    if(e.shiftKey && $(".cv--last-clicked").length) {
      let last = $(".cv--last-clicked");
      $(".cv--last-clicked").removeClass("cv--last-clicked");

      if(!e.ctrlKey) {
        // remove all other highlights
        $(".cv--highlighted").removeClass("cv--highlighted");
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

      // unhighlight other lines unless control is held
    } else if(!e.ctrlKey) {
      // remove all other highlights
      $(".cv--highlighted").removeClass("cv--highlighted");
    }

    // highlight this line
    let tr = $(e.target).parent('tr');

    $(".cv--last-clicked").removeClass("cv--last-clicked");
    if(tr.hasClass("cv--highlighted")) {
      tr.removeClass("cv--highlighted");
    } else {
      tr.addClass("cv--highlighted");
    }

    tr.addClass("cv--last-clicked");
  });
}
