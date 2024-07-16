import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { FaCircleNotch } from 'react-icons/fa';

export const Thumbnail = props => {
  const { className, file, url, input } = props;

  const playerRef = useRef(null);
  const [thumbnail, setThumbnail] = useState(null);

  const captureThumbnail = () => {
    const player = playerRef.current.getInternalPlayer();
    const canvas = document.createElement('canvas');
    canvas.width = player.videoWidth;
    canvas.height = player.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(player, 0, 0, canvas.width, canvas.height);
    setThumbnail(canvas.toDataURL('image/jpeg'));
  };

  const format = () => {
    if (file && file.type) {
      const mimeType = file.type;

      if (mimeType.startsWith('image/')) {
        return 'image';
      } else if (mimeType.startsWith('video/')) {
        return 'video';
      } else {
        return 'unknown';
      }
    }
  };

  return (
    <div className={`${className} flex items-center  flex-col `}>
      {format() === 'image' && (
        <a
          href={file.url || url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${className} flex items-center overflow-hidden flex-col `}
        >
          <img
            src={file.url || url}
            alt="Miniatura de la imagen"
            className={`${!input && 'rounded'} ${className} object-cover ${
              !file.url && url ? 'blur' : ''
            }`}
          />
        </a>
      )}
      {format() === 'video' && (
        <>
          <ReactPlayer
            ref={playerRef}
            url={file.url || url}
            width="0"
            height="0"
            onReady={captureThumbnail}
            playing={false}
            config={{
              file: {
                attributes: {
                  crossOrigin: 'true'
                }
              }
            }}
            controls={false}
            style={{ display: 'none' }}
          />
          {thumbnail ? (
            <a
              href={file.url || url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                !input && 'rounded'
              } relative w-fit h-full flex items-center flex-col overflow-hidden`}
            >
              <img
                src={thumbnail || url}
                alt="Miniatura del video"
                className={`${!input && 'rounded'} ${className} object-cover ${
                  !file.url && url ? 'blur' : ''
                }`}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="h-3/4 w-auto text-white bg-black bg-opacity-30 rounded-full p-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </a>
          ) : (
            <p className="text-secondary-900 h-full dark:text-white">
              <FaCircleNotch className="animate-spin h-full" />
            </p>
          )}
        </>
      )}
    </div>
  );
};

Thumbnail.propTypes = {
  className: PropTypes.string,
  file: PropTypes.object,
  url: PropTypes.string,
  input: PropTypes.bool
};
