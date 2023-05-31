const recognition = new webkitSpeechRecognition();
recognition.lang = "ja";
recognition.continuous = true;
recognition.interimResults = true;

const output = document.querySelector('.output');
const output2 = document.querySelector('.output2');
let recordedTranscript = ''; // 記録した結果を保持する変数

recognition.onresult = function(event) {
  let finalTranscript = '';
  let interimTranscript = '';

  // 前回の処理で処理済みの音声認識結果はスキップして、新しい音声認識結果を処理する
  for (let i = event.resultIndex; i < event.results.length; i++) {
    const result = event.results[i];
    if (result.isFinal) {
      finalTranscript += result[0].transcript + '\n'; // スペースで区切って1文にする
    } else {
      interimTranscript += result[0].transcript;
    }
  }
  
  output.textContent = finalTranscript + interimTranscript;
  output2.textContent = recordedTranscript + finalTranscript;
  
  // 記録した結果を更新する
  recordedTranscript = output2.textContent;
};

const startButton = document.querySelector(".start");
startButton.addEventListener("click", () => {
  recognition.start();
});

const stopButton = document.querySelector(".stop");
stopButton.addEventListener("click", () => {
  recognition.stop();
});

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", () => {
  output.textContent = '';
  output2.textContent = '';
  recordedTranscript = '';
});
