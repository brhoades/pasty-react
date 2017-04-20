import $ from "jquery"

// https://jsfiddle.net/Guffa/DDn6W/
function randomPassword(length) {
  let chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
  let pass = "";

  for (var x = 0; x < length; x++) {
    var i = Math.floor(Math.random() * chars.length);
    pass += chars.charAt(i);
  }
  return pass;
}

function getConfig(cb) {
  console.log("Get Configuration");

  $.ajax({
    type: "GET",
    url: "config/client.json",
    success: (response) => cb(response),
    error: (err) => console.log(err)
  });
}

export { getConfig, randomPassword };
