import { serverName } from "../http/server";

export const downloadCertificate = (certificateLink, courseName) => {
  if (!certificateLink) return;

  const downloadUrl = `${serverName}/${certificateLink}`;

  fetch(downloadUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Certificate_${courseName}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => console.error("Download failed", error));
};
