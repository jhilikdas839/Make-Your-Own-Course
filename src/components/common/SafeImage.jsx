import { useState } from "react";

// Shows a soft gradient with an icon if the image fails to load.
function SafeImage({ src, alt, className = "", icon = "ri-image-line" }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary/80 to-primary/25 ${className}`}>
        <i className={`${icon} text-4xl text-white/90`}></i>
      </div>
    );
  }

  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={className} />;
}

export default SafeImage;
