document.getElementById('uploadForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission

  const fileInput = document.getElementById('fileInput');
  if (fileInput.files.length === 0) {
    alert("Please select a JPG file.");
    return;
  }

  const file = fileInput.files[0];

  // Check if the file is a JPEG
  if (!file.type.startsWith('image/jpeg')) {
    alert("Only JPG images are supported.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      // Create a canvas and set its dimensions to match the image resolution
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width; // Set canvas width to image width
      canvas.height = img.height; // Set canvas height to image height

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0);

      // Convert canvas to PNG
      const pngDataUrl = canvas.toDataURL('image/png');

      // Set the download link
      const downloadLink = document.getElementById('downloadLink');
      downloadLink.href = pngDataUrl;
      downloadLink.download = 'converted-image.png';
      downloadLink.style.display = 'block';
      downloadLink.textContent = 'Download Converted PNG';
    };

    img.src = e.target.result; // Set image source to file's data URL
  };

  reader.readAsDataURL(file); // Read the file as a data URL
});