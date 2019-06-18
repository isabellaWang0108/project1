$(document).ready(function() {
    $("#siteSearch").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#container-for-content").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});