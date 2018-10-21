var keywords = localStorage.getItem("keywords");
var budget = localStorage.getItem("budget");
var selected = localStorage.getItem("selected");
$("#loadingTitle").text(selected.split(',')[0]);
var results = [];
fetch(`http://localhost:3000/search/catg/${selected.split(',')[0].toLowerCase()}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        $(".loader").hide();
        for (let i = 0; i < myJson.length; i++) {
            var diy = myJson[i];
            if (typeof diy.error != 'string') {
                var im = diy.square2Url;
                var link = "https://www.instructables.com/id" + diy.showUrl;
                var price = "$5";
                results.push(diy);
                $("#response").append(`<li style='margin:5px;'><div class='box element' style='margin-left:20%; border-radius:30px;margin-right:20%;'><div><h2 class='is-size-5' style=' font-weight:bold;'>${myJson[i].title}</h2></div><figure class='image'><img id='image' class='is-rounded' style='height:200px;width:200px;'src='${im}'></img></figure><a class='button'>materials</a></div></li>`);
            }
        }
        $("#content").show();
        $(".button").click(function () {
            var data = results[$(".button").index(this)];
            // Get the modal
            var modal = document.getElementById('myModal');
            $(".modal-header>h2").text(data.title);
            modal.style.display = "block";
            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];
            span.onclick = function () {
                modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        });
    });