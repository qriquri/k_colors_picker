export const download = (url: string, fileName: string) => {
  //ダウンロード用にリンクを作成する
  const download = document.createElement("a");
  //リンク先に上記で生成したURLを指定する
  download.href = url;
  //download属性にファイル名を指定する
  download.download = fileName;
  //作成したリンクをクリックしてダウンロードを実行する
  download.click();
  //createObjectURLで作成したオブジェクトURLを開放する
  (window.URL || window.webkitURL).revokeObjectURL(url);
};
