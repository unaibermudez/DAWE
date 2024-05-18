var boton = document.getElementById("boton");
var combo = document.getElementById("opciones");

boton.onclick = function () {
  var url =
    "https://openlibrary.org/api/books?bibkeys="+combo.value+"&jscmd=details&format=json";

  fetch(url)
    .then((r1) => r1.json())
    .then(function (r1) {
      var elemento = r1[combo.value];
      var titulo = elemento["details"]["title"];
      document.getElementById("titulo").innerHTML = "<p>" + titulo + "</p>";
      var autor = elemento["details"]["authors"][0]["name"];
      document.getElementById("autor").innerHTML = "<p>" + autor + "</p>";
      var imagen = elemento["thumbnail_url"].replace("-S", "-L");
      document.getElementById("imagen").innerHTML = '<img src="' + imagen + '">';
    });
};
