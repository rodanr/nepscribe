var dots_animation = $(".animate");
var button = $(".btn");
var mic_icon = $("i");
var rec = $(".recording");
var is_button_color_blue = true;
let recStatus = false;
let recorder, audioBlobGlobal, fileName;
let audioPlayer = $("#audioPlayer");

function toggleRecordStatus() {
  if (recStatus == false) {
    recStatus = true;
  } else {
    recStatus = false;
  }
}
function recordAudio(audioBlob) {
  audioBlobGlobal = audioBlob;
  audioPlayer.attr("src", URL.createObjectURL(audioBlobGlobal.data));
  var audioURL = window.URL.createObjectURL(audioBlobGlobal.data);
  $("#downloadButton").attr("href", audioURL);
  $("#downloadButton").attr("download", "hello.wav");
  audioPlayer[0].play();
}

dots_animation.hide();
rec.hide();
function toggleRecordingAnimation() {
  dots_animation.toggle();
  //toggle for recording button
  mic_icon.toggle(0, () => {
    rec.toggle(0);
  });
  //toggle for recording colors
  if (is_button_color_blue) {
    button.css({ "background-color": "#be1f1f" });
  } else {
    button.css({ "background-color": "#4DD3F2" });
  }
  is_button_color_blue = !is_button_color_blue;
}
function startRecording() {
  toggleRecordingAnimation();
  recorder.start();
  toggleRecordStatus();
}
function stopRecording() {
  toggleRecordingAnimation();
  recorder.stop();
  toggleRecordStatus();
}
// function submitAudio() {
//     ws.send(audioBlobGlobal.data);
//     //toggling buttons
//     toggleButtons(false, false, false, true, true);
//   }

function onClickRecordButton() {
  //Recording functionality
  if (recStatus == false) {
    //Starts recording here
    startRecording();
  } else {
    stopRecording();
  }
}

if (navigator.mediaDevices) {
  //Getting mic access
  navigator.mediaDevices
    .getUserMedia({
      audio: true,
    }) //Mic input is passed through stream
    .then((stream) => {
      //Setting MediaRecorder to record the Mic input Stream
      recorder = new MediaRecorder(stream);
      //when data is available it calls playAudio function passing the audio blob as a parameter
      recorder.ondataavailable = recordAudio;
    });
  button.click(onClickRecordButton);
}
