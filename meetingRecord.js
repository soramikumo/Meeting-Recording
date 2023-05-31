const recognition = new webkitSpeechRecognition();
recognition.lang = "ja";
recognition.continuous = true;
recognition.interimResults = true;

let output = document.querySelector('.output');

recognition.onresult = function(event) {
  let finalTranscript = '';
  let interimTranscript = '';
  
  //前回の処理で処理済みの音声認識結果はスキップして、新しい音声認識結果を処理する
  for (let i = event.resultIndex; i < event.results.length; i++) {
    const result = event.results[i];
    if (result.isFinal) {
      finalTranscript += result[0].transcript + '\n'; // スペースで区切って1文にする
    } else {
      interimTranscript += result[0].transcript;
    }
  }
  
  output.textContent = finalTranscript + interimTranscript;
};
const startButton = document.querySelector(".start");
startButton.addEventListener("click", () => {
  recognition.start();
});
const stopButton = document.querySelector(".stop");
stopButton.addEventListener("click", () => {
  recognition.stop();
});
