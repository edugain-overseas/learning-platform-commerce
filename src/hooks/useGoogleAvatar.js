import { useEffect, useState } from "react";
import fallbackUrl from '../images/noAvatar.webp';

export const useGoogleAvatar = (avatarUrl) => {
  const [avatarDataUrl, setAvatarDataUrl] = useState(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await fetch(avatarUrl);
        if (!response.ok) {
          console.warn(`Failed to fetch avatar. Status: ${response.status}, ${response.statusText}`);
          setAvatarDataUrl(fallbackUrl);
          return;
        }
        const blob = await response.blob();
        const dataUrl = URL.createObjectURL(blob);
        setAvatarDataUrl(dataUrl);
      } catch {
        // console.error("Error fetching the avatar:", error);
        setAvatarDataUrl(fallbackUrl);
      }
    };

    fetchAvatar();
  }, [avatarUrl]);

  return avatarDataUrl;
};
