var dots_animation = $(".animate");
var button = $(".btn");
var mic_icon = $("i");
var rec = $(".recording");
var is_button_color_blue = true;

dots_animation.hide();
rec.hide();

button.click(() => {
    dots_animation.toggle();
    //toggle for recording button
    mic_icon.toggle(0, () => {
        rec.toggle(0);
    });
    //toggle for recording colors
    if(is_button_color_blue) {
        button.css({"background-color": "#be1f1f"});
    }
    else {
        button.css({"background-color": "#4DD3F2"});
    }
    is_button_color_blue = !is_button_color_blue;
});



