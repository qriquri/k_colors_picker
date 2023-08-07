export const getNormalizedSize = (
  size: { width: number; height: number },
  max_size: number
) => {
  const aspect_ratio = size.width / size.height;
  if (size.width < size.height) {
    size.height = max_size;
    size.width = Math.floor(max_size * aspect_ratio);
  } else {
    size.width = max_size;
    size.height = Math.floor(max_size / aspect_ratio);
  }

  return size;
};

export const img2Array = (img: HTMLImageElement, max_size: number = 256) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (context === null) {
    return;
  }

  const size = getNormalizedSize(
    { width: img.width, height: img.height },
    max_size
  );

  canvas.width = size.width;
  canvas.height = size.height;

  context.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    0,
    0,
    size.width,
    size.height
  );

  const imageData = context.getImageData(0, 0, size.width, size.height);

  return imageData.data;
};
