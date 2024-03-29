export const downloadAsJsonFile = (data: any, filename: string) => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(data);
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", filename);
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

export const uploadFile = (
  event: Event,
  resultCallback: (result: string) => void, // Az eredmények visszaküldésére szolgáló callback
  errorCallback: (error: string) => void    // Hiba esetén hívandó callback
) => {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) {
    errorCallback('Nincs fájl kiválasztva.');
    return;
  }
  const file = input.files[0];
  if (file.type === 'application/json') {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const content = e.target?.result;
      try {
        const parsedJson = JSON.parse(content as string);
        // A JSON pretty formátumban történő átalakítása
        const prettyJson = JSON.stringify(parsedJson, null, 2);
        // Sikeres beolvasás és feldolgozás után meghívjuk a resultCallback-et
        // a pretty formátumú JSON stringgel
        resultCallback(prettyJson);
      } catch (error) {
        console.error('Hiba a JSON fájl feldolgozása során:', error);
        errorCallback('Hiba a JSON fájl feldolgozása során.');
      }
    };
    reader.readAsText(file);
  } else {
    errorCallback('Kérlek, JSON fájlt tölts fel!');
  }
};


