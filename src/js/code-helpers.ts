// helpers to use when displaying code

// Take some the contents of pre > code with line endings
//
// Return contents for a div with a table for displaying code
// with line numbers.
export default function splitWithLineNumbers(code: string): string {
  let inner: string[] = code.split("\n").map((e, i) => {
    return `<tr><td class="cv--line-number" line="${i}">${i}</td><td class="cv--code">${e}</td></tr>`;
  });

  return `<table><tbody>${inner.join("\n")}</tbody></table>`;
}
