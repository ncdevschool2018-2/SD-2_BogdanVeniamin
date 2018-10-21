window.onload  = function() {
  var modal = document.getElementById("myModal")
  var btnOne = document.getElementById("myBtn-1")
  var btnTwo = document.getElementById("myBtn-2")
  var span = document.getElementsByClassName("end")[0]

  btnOne.onclick = function() {
    modal.style.display = "block"
  }

  btnTwo.onclick = function() {
    modal.style.display = "block"
  }

  span.onclick = function() {
    modal.style.display = "none"
  }

  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

}
