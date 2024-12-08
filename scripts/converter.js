document.getElementById('uploadForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent form submission

  const fileInput = document.getElementById('fileInput');
  if (fileInput.files.length === 0) {
    alert("Please select a file.");
    return;
  }

  const file = fileInput.files[0];

  // Validate file type
  if (
    (conversionType === 'jpg-to-png' && !file.type.startsWith('image/jpeg')) ||
    (conversionType === 'png-to-jpg' && !file.type.startsWith('image/png'))
  ) {
    alert(`Please select a valid ${conversionType === 'jpg-to-png' ? 'JPG' : 'PNG'} file.`);
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      let outputDataUrl, outputFilename;
      if (conversionType === 'jpg-to-png') {
        outputDataUrl = canvas.toDataURL('image/png');
        outputFilename = 'converted-image.png';
      } else if (conversionType === 'png-to-jpg') {
        outputDataUrl = canvas.toDataURL('image/jpeg', 0.9);
        outputFilename = 'converted-image.jpg';
      }

      const downloadLink = document.getElementById('downloadLink');
      downloadLink.href = outputDataUrl;
      downloadLink.download = outputFilename;
      downloadLink.style.display = 'block';
      downloadLink.textContent = `Download ${conversionType === 'jpg-to-png' ? 'PNG' : 'JPG'} File`;
    };

    img.src = e.target.result;
  };

  reader.readAsDataURL(file);
});