function reorder() {
  if ($(window).width() < 768) {
    $("#top-story").appendTo("#sm-col");
    $("#featured").appendTo("#sm-col");
    $("#debate").appendTo("#sm-col");
    $("#opinion").appendTo("#sm-col");
    $("#sponsors-left").appendTo("#sm-col");
    $("#more-stories").appendTo("#sm-col");
    $("#latest-stories").appendTo("#sm-col");
    $("#my-turn").appendTo("#sm-col");
    $("#culture-travel").appendTo("#sm-col");
    $("#sponsors-right").appendTo("#sm-col");
  } else {
    $("#top-story").appendTo("#col2");
    $("#featured").appendTo("#col1");
    $("#debate").appendTo("#col3");
    $("#opinion").appendTo("#col3");
    $("#sponsors-left").appendTo("#col1");
    $("#my-turn").appendTo("#col2");
    $("#culture-travel").appendTo("#col2");
    $("#more-stories").appendTo("#col2");
    $("#latest-stories").appendTo("#col2");
    $("#sponsors-right").appendTo("#col3");
  }
}

$(window).resize(reorder);
$(document).ready(reorder);

