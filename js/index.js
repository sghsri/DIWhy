$("#getDIY").click(function () {
    var keywords = $("#keywords").text();
    var budget = $("#budget").val();
    var selected = [];
    $(".tag").each(function (i, element) {
        if ($(element).css("background-color") == "rgb(255, 102, 0)") {
            selected.push($(element).text());
        }
    });
    localStorage.setItem("keywords", keywords);
    localStorage.setItem("selected", selected);
    localStorage.setItem("budget", budget);
    $("#inputBox").fadeOut();
    window.location.href = `/find/`;

});

$(".tag").click(function () {
    if ($(this).css("background-color") == "rgb(255, 102, 0)") {
        $(this).css("background-color", "#f5f5f5");
        $(this).css("color", "#4a4a4a");
    } else {
        $(this).css("background-color", "#FF6600");
        $(this).css("color", "white");
    }
})