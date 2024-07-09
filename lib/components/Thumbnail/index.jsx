import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { FaCircleNotch } from 'react-icons/fa';

const Thumbnail = ({ children, className, file, url, input }) => {
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
          className="w-fit h-full flex items-center flex-col"
        >
          <div
            className={`${
              !input && 'rounded'
            } w-fit h-full flex items-center flex-col overflow-hidden bg-white`}
          >
            <img
              src={file.url || url}
              alt="Miniatura de la imagen"
              className={`${!input && 'rounded'} h-full ${url ? 'blur' : ''}`}
            />
          </div>
          {children}
        </a>
      )}
      {format() === 'video' && (
        <div
          className={`${
            !input && 'rounded'
          } flex items-center flex-col w-full h-full`}
        >
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
              className="relative flex flex-col h-full w-fit"
            >
              <img
                src={thumbnail}
                alt="Miniatura del video"
                className={`${!input && 'rounded'} h-full ${url ? 'blur' : ''}`}
              />
              {children}
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
        </div>
      )}
    </div>
  );
};

Thumbnail.propTypes = {
  children: PropTypes.node,
  file: PropTypes.object,
  input: PropTypes.bool,
  url: PropTypes.string,
  className: PropTypes.string
};

export default Thumbnail;
