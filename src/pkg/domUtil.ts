export async function imageFromURI(
  imageURI: string
): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = function () {
      resolve(img);
    };

    img.src = imageURI;
  });
}

export async function dataURLFromFile(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.addEventListener("load", async () => {
      resolve(reader.result as string);
    });

    try {
      reader.readAsDataURL(file);
    } catch (e) {
      console.log("error during reader.readAsDataURL", e);
    }
  });
}
