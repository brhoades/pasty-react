import { ajax } from 'jquery/src/ajax'

// https://jsfiddle.net/Guffa/DDn6W/
function randomPassword(length): string {
  let chars: string = "abcdefghijklmnopqrstuvwxyz-_.ABCDEFGHIJKLMNOP1234567890";
  let pass: string = "";

  for (var x = 0; x < length; x++) {
    let i: number = Math.floor(Math.random() * chars.length);
    pass += chars.charAt(i);
  }

  return pass;
}

export { randomPassword };
