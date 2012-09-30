$.support.cors = true;
var ProviderRecordsDisplayed = 0;
var ProviderCategory = null;
LoadPage = function () {
    GetCategoryData();
    GetProviderData()
};
ShowModal = function () {
    $("#myModal").modal()
};
GetCategoryData = function () {
    $.ajax({
        type: "get",
        url: "https://api.mongohq.com/databases/UtahFEAT/collections/categories/documents",
        data: "sort={%22name%22:1}",
        cache: false,
        datatype: "json",
        error: function (a, b, c) {
            alert(b + ": " + c.message)
        },
        success: function (result) {
            if (result[record] = "[") result = eval(result);
            for (var record in result) {
                var category = result[record];
                var menu = $("#categoriesMenu");
                menu.append($("<li>").attr("id", category.id).append($("<a>").attr("href", "javascript:SetCategory(" + category.id + ")").text(category.name)))
            }
        }
    })
};
ComposeRow = function (a) {
    var b = "";
    if (a.url) b = $("<a>").attr({
        href: "javascript:window.open('http://" + a.url + "')",
        "class": "btn btn-success btn-large"
    }).text("Go to Website");
    var c = "";
    if (a.state) c = a.city + ", " + a.state + "  " + a.zip;
    var d = "";
    if (a.image) d = $("<img>").attr({
        src: a.image,
        height: "120",
        width: "120"
    });
    return $("<tr>").append($("<td>").attr("width", "120").append(d)).append($("<td>").append($("<h2>").text(a.name)).append($("<i>").text(a.mission)).append($("<br>")).append($("<br>")).append($("<b>").text(a.street)).append($("<br>")).append($("<b>").text(c)).append($("<br>")).append($("<b>").text(a.phone))).append($("<td>").attr("width", "180").append(b).append($("<br>")).append($("<br>")).append($("<p>").text(a.hours)))
};
GetProviderData = function () {
    var a = "";
    if (ProviderCategory) a = "&q=%7Bcategory_id: " + ProviderCategory + "%7D";
    $.ajax({
        type: "get",
        url: "https://api.mongohq.com/databases/UtahFEAT/collections/providers/documents",
        data: a + "&sort={%22name%22:1}&limit=100&skip=" + ProviderRecordsDisplayed,
        cache: false,
        dataType: "json",
        error: function (a, b, c) {
            alert(b + ": " + c.message)
        },
        success: function (a) {
            if (a.length < 100) $("#EOF").hide();
            for (var b in a) {
                ProviderRecordsDisplayed++;
                $("#providerTable").find("tbody").append(ComposeRow(a[b]))
            }
        }
    })
};
SetCategory = function (a) {
    $("#" + ProviderCategory).attr("class", "");
    ProviderRecordsDisplayed = 0;
    ProviderCategory = a;
    $("#providerTable").find("tbody").empty();
    $("#" + ProviderCategory).attr("class", "active");
    GetProviderData()
}