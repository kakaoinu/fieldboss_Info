const bossTemplates = {
  1: "1層 南部　のエリアボス(真ん中上部)　　 　:　",
  2: "2層 北部　のエリアボス(右上真ん中寄り)　:　",
  3: "3層 飼育場のエリアボス(真ん中上部)　　　:　"
};

let outputLines = [];
let lastBossId = null; // 最後に押されたボタンIDを記録
let pressTimes = {}; // ボタンごとの押下時間を記録

function showFutureTime(buttonId) {
  const now = new Date();
  let future;
  // 2時間10秒後
  future = new Date(now.getTime() + 2 * 60 * 60 * 1000 + 10 * 1000);
  
  const timeStr = now.toLocaleTimeString('ja-JP', { hour12: false });
  const futureStr = future.toLocaleTimeString('ja-JP', { hour12: false });

  const defeatTimeElement = document.querySelector(`#record${buttonId} .defeat-time`);
  const respawnTimeElement = document.querySelector(`#record${buttonId} .respawn-time`);

  if (defeatTimeElement) {
    defeatTimeElement.textContent = `討伐時刻：${timeStr}`;
  }
  if (respawnTimeElement) {
    respawnTimeElement.textContent = `リポップ予定：${futureStr}`;
  }
  pressTimes[buttonId] = timeStr; // 押した時間を記録

  const template = `${bossTemplates[buttonId]}  ${timeStr}`;
  outputLines.push(template);
  lastBossId = buttonId;
  updateOutputText(futureStr);
}

function undoLastEntry(buttonId) {
  const defeatTimeElement = document.querySelector(`#record${buttonId} .defeat-time`);
  const respawnTimeElement = document.querySelector(`#record${buttonId} .respawn-time`);

  if (defeatTimeElement) {
      defeatTimeElement.textContent = "";
  }
  if (respawnTimeElement) {
      respawnTimeElement.textContent = "";
  }
  delete pressTimes[buttonId];

  // 対応する行もoutputLinesから削除する
  const bossName = bossTemplates[buttonId];
  outputLines = outputLines.filter(line => !line.startsWith(bossName));

  updateOutputText(); // テキストエリアも更新する
}


function updateOutputText(future) {
    let result = outputLines.join('\n');
    if (outputLines.length > 0) {
        if (lastBossId === 1) {
          nextRepop = future
        }
        result += `\n次回フィールドボス出現時刻　　　　　　  :　${nextRepop}～`;
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

setInterval(updateClock, 1000);
updateClock();
