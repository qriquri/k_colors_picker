export const postColors = async (data: {
  imgArray: number[];
  size: { width: number; height: number };
  colorNum: number;
}) => {
  const url = "https://picker_server-1-g4654832.deta.app/postColors";
  console.log("data", data);
  const param: RequestInit = {
    headers: { "content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify(data),
    method: "POST",
  };

  return fetch(url, param)
    .then((data) => data.json())
    .then((res) => res)
    .catch((e) => {
      console.log(e);
    });
};
