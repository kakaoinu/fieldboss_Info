const bossTemplates = {
  1: "1層 南部  のエリアボス(真ん中上部)     : ",
  2: "2層 北部  のエリアボス(右上真ん中寄り) : ",
  3: "3層 飼育場のエリアボス(真ん中上部)     : "
};

let outputLines = [];

function showFutureTime(buttonId) {
  const now = new Date();
  const future = new Date(now.getTime() + 2 * 60 * 60 * 1000 + 10 * 1000);
  const timeStr = now.toLocaleTimeString('ja-JP', { hour12: false });

  const recordContent = document.querySelector(`#record${buttonId} .record-content`);
  recordContent.textContent = future.toLocaleTimeString('ja-JP', { hour12: false });

  const template = `${bossTemplates[buttonId]} ${timeStr}`;
  outputLines.push(template);
  updateOutputText();
}

function undoLastEntry(buttonId) {
  const recordContent = document.querySelector(`#record${buttonId} .record-content`);
  if (recordContent.lastChild) {
      recordContent.removeChild(recordContent.lastChild);
  }
}

function updateOutputText() {
  let result = outputLines.join('\n');
  if (outputLines.length > 0) {
      const lastTime = new Date();
      lastTime.setHours(lastTime.getHours() + 2, lastTime.getMinutes(), lastTime.getSeconds() + 10);
      const nextStr = lastTime.toLocaleTimeString('ja-JP', { hour12: false });
      result += `\n次回フィールドボス出現時刻  ${nextStr}～`;
  }
  document.getElementById("outputText").value = result;
}

function copyOutput() {
  const textarea = document.getElementById("outputText");
  textarea.select();
  document.execCommand("copy");
  alert("コピーしました！");
}

function updateClock() {
  const now = new Date();
  const clockElement = document.getElementById("clock");
  clockElement.textContent = now.toLocaleTimeString('ja-JP', { hour12: false });
}

// ページロード時に開始
setInterval(updateClock, 1000);
updateClock(); // 最初にすぐ表示
