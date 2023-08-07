export const postColors = async (data: {
  imgArray: number[];
  size: { width: number; height: number };
  colorNum: number;
}) => {
  const url = "http://localhost:8000/postColors";
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
