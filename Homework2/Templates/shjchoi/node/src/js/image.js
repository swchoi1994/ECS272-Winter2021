function myFunction() {
    var file = document.getElementById('file').files[0];
    var reader = new FileReader();

    reader.onloadend = function {
        var image = document.createElement("img");
        image.src = "sf_locations"
        image.height = 200;
        image.width = 200;

        document.body.appendChild(image);
    }
}