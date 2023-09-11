/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unknown-property */
import Image from "next/image";

const LoadingImage: React.FC = () => {
  return (
    <>
      <img
        src="/images/logo_icon.svg"
        alt="Logo For IconSpinner"
        width={160}
        height={160}
        className="image"
      />
      <h1 className="loading">Loading</h1>
      <style jsx>
        {`
          .image {
            animation: spin 10s linear infinite;
          }
          .loading {
            color: white;
          }
          @keyframes spin {
            0% {
              transform: rotateZ(0);
            }
            100% {
              transform: rotateZ(360deg);
            }
          }
        `}
      </style>
    </>
  );
};
export default LoadingImage;
