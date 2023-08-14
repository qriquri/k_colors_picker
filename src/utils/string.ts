export const toCsvText = (data: any[], header: string = "") => {
  let csvStr = header + "\r\n";

  data.map((d) => {
    if (d instanceof Array) {
      csvStr += `${d.join(",")}`;
    } else {
      csvStr += `${d}`;
    }
    csvStr += "\r\n";
  });

  return csvStr;
};

export const toCsv = (data: any[], header: string = "") => {
  const csvStr = toCsvText(data, header);

  // BOMを付与（Excelで開いた際のの文字化け対策）
  const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
  // CSVのバイナリデータを作成
  const blob = new Blob([bom, csvStr], { type: "text/csv" });
  // blobからオブジェクトURLを作成
  const objectUrl = URL.createObjectURL(blob);

  return objectUrl;
};
