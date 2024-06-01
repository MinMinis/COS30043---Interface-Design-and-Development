function myDoP() {
  var checkBox = document.getElementById("DoPC");
  var text = document.getElementById("DoP");
  if (checkBox.checked == true){
    text.style.display = "block";
  } else {
     text.style.display = "none";
  }
}
function myPoP() {
  var checkBox = document.getElementById("PoPC");
  var text = document.getElementById("PoP");
  if (checkBox.checked == true){
    text.style.display = "block";
  } else {
     text.style.display = "none";
  }
}
function copy(e) {
    var daddress = document.getElementById("dadd");
    var baddress = document.getElementById("badd");
    var dpost = document.getElementById("dpost");
    var bpost = document.getElementById("bpost");
    var checked = document.getElementById("duplicate").checked;

  /* Just makes sense to not duplicate it on uncheck, but you can remove this if statement */
    if (checked) {
        if (daddress.value && dpost.value) {
            baddress.value = daddress.value;
            bpost.value = dpost.value;
        } else {
            alert('Please enter your delivery address first!');
            e.preventDefault(); // Stops checkbox from becoming checked.
        }
    }
}
