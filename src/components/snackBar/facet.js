export default function showAlert(item) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = item.text;
    x.style.backgroundColor = item.bgColor;
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
}