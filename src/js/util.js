// https://jsfiddle.net/Guffa/DDn6W/
function randomPassword(length) {
    var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
    var pass = "";
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

module.exports = {
  getConfig: getConfig,
  randomPassword: randomPassword
};
