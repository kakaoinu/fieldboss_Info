// ここにApps Scriptから発行されたWebアプリのURLを設定してください
const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbxmt3mUkYzGdR043iQ1x5BvVpNyaT0D2i99iv03Qr6da5Nq1CsjKSksb-oiWhQq3AiZ/exec";

/**
 * 各ボタン押下時に実行され、時刻情報をApps Script経由でシートに記録します。
 * @param {number} id - ボタンID（1～3）
 * @param {string} layerName - 層の名称（例: "南部(1層)"）
 */
async function recordTime(id, layerName) {
  const now = new Date();
  // 例として、2時間10秒後の時刻を算出
  now.setHours(now.getHours() + 2);
  now.setSeconds(now.getSeconds() + 10);
  const timeString = now.toLocaleString();

  const data = {
    layer: layerName,
    timestamp: timeString
  };

  try {
    await fetch(WEBAPP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    updateDisplay();
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

/**
 * 取り消し処理（シートから最後のエントリーを削除するための実装例）
 * ※ 実際の削除はApps Script側で対応する処理を実装する必要があります。
 */
async function undoLastEntry(id) {
  alert("取り消し機能はApps Script側の実装が必要です。");
  // 取り消し後に表示を更新する場合は updateDisplay() を呼び出す
  // updateDisplay();
}

/**
 * GETリクエストでシートから全データを取得し、各層ごとに表示します。
 */
async function updateDisplay() {
  try {
    const response = await fetch(WEBAPP_URL);
    const data = await response.json();
    // dataはシートの全データの配列 [ [layer, timestamp], ... ]
    // 各層でフィルタリングするための定義
    const layers = {
      1: "南部(1層)",
      2: "北部(2層)",
      3: "飼育場(3層)"
    };
    for (let id = 1; id <= 3; id++) {
      const recordBox = document.getElementById(`record${id}`).querySelector('.record-content');
      // 該当層のレコードをフィルタ
      const filtered = data.filter(row => row[0] === layers[id]).map(row => row[1]);
      recordBox.innerHTML = filtered.length > 0 ? filtered.join('<br>') : '';
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

document.addEventListener('DOMContentLoaded', updateDisplay);
