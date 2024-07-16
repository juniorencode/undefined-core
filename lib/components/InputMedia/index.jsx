import { useEffect, useId, useState } from 'react';
import PropTypes from 'prop-types';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { InputContainer } from '../InputContainer';
import { Thumbnail } from '../Thumbnail';
import { IoIosClose } from 'react-icons/io';

const InputMedia = ({
  className,
  label,
  name,
  accept,
  multiple,
  register,
  postFile,
  removeFile,
  required
  // ...params
}) => {
  const inputFile = register(name, { required });
  const urlFile = register('_' + name);
  const domId = useId();
  const [waiting, setWaiting] = useState([]);
  const [progress, setProgress] = useState();
  const [isOver, setIsOver] = useState(false);
  const postData = async file => {
    const formData = new FormData();
    formData.append('name', file.name);
    formData.append('file', file);
    const response = await postFile(formData, setProgress);
    if (inputFile.value)
      inputFile.handleChange([...inputFile.value, response.data._id]);
    else inputFile.handleChange([response.data._id]);
    if (urlFile.value) urlFile.handleChange([...urlFile.value, response.data]);
    else urlFile.handleChange([response.data]);
    setProgress(null);
  };
  const handleDragOver = e => e.preventDefault();
  const handleDragEnter = () => !isOver && setIsOver(true);
  const handleDragLeave = () => isOver && setIsOver(false);
  const handleDrop = e => {
    e.preventDefault();
    let files = Array.from(e.dataTransfer.files);
    if (!multiple) {
      files = [files[files.length - 1]];
    }
    handleSelect(files);
    setIsOver(false);
  };
  const handleUpload = selectedFiles => {
    if (!selectedFiles) return;
    setWaiting(prev => [...prev, ...selectedFiles]);
  };
  useEffect(() => {
    if (waiting.length === 0 || progress) return;
    const file = waiting[waiting.length - 1];
    setWaiting(waiting.filter((_, index) => waiting.length - 1 !== index));
    setProgress({ name: file.name, progress: 0, loaded: 0, total: file.size });
    postData(file);
    // eslint-disable-next-line
  }, [waiting, progress]);

  const filterExtension = files => {
    return Array.from(files).filter(file => {
      const extension = file.name.split('.').pop().toLowerCase();
      return accept.includes(extension);
    });
  };

  const handleSelect = filesData => {
    const files = filterExtension(filesData);
    if (files?.length > 0) {
      handleUpload(files);
      handleFileChange(files);
    } else {
      //poner toast
    }
  };

  const [urlThumbnail, setUrlThumbnail] = useState(
    urlFile.value?.map(_file => _file.url) || []
  );
  const [fileThumbnail, setFileThumbnail] = useState(urlFile.value || []);

  useEffect(() => {
    if (urlFile && urlFile.value && urlFile.value.length) {
      setFileThumbnail(prevFileThumbnail => [
        ...urlFile.value,
        ...prevFileThumbnail.slice(urlFile.value.length)
      ]);
    }
    //eslint-disable-next-line
  }, [urlFile.value]);

  const handleFileChange = files => {
    if (files.length > 0) {
      const newFileThumbnails = files.map(file => file).reverse();
      setFileThumbnail(prevFileThumbnails => [
        ...prevFileThumbnails,
        ...newFileThumbnails
      ]);

      const newUrlThumbnails = files
        .map(file => URL.createObjectURL(file))
        .reverse();
      setUrlThumbnail(prevUrlThumbnails => [
        ...prevUrlThumbnails,
        ...newUrlThumbnails
      ]);
    }
  };

  const handleRemove = index => {
    inputFile.handleChange(inputFile?.value?.filter((_, i) => i !== index));
    urlFile.handleChange(urlFile?.value?.filter((_, i) => i !== index));
    removeFile(urlFile.value[index]?._id);
    setFileThumbnail(prev => prev.filter((_, i) => i !== index));
    setUrlThumbnail(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <InputContainer
      className={className}
      label={label}
      name={domId}
      error={inputFile.errors[name]?.message}
    >
      {/* para subir */}
      {(multiple || !urlThumbnail?.length) && (
        <label
          className={`flex justify-center w-full mt-2 p-5 text-center border-2 border-dashed cursor-pointer rounded-xl text-secondary-500 border-secondary-300 dark:text-secondary-400 dark:border-secondary-700 ${
            isOver ? 'bg-secondary-100 dark:bg-secondary-900' : ''
          }`}
          htmlFor={domId}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          <div className="flex flex-col items-center pointer-events-none">
            <IoCloudUploadOutline size={32} />
            <h2 className="mt-1 font-medium tracking-wide text-secondary-700 dark:text-secondary-200">
              {isOver
                ? 'Suelta tus archivo aquí'
                : 'Selecciona o arrastra tu archivos aquí'}
            </h2>
            <p className="mt-2 text-xs tracking-wide text-secondary-500 dark:text-secondary-400">
              {accept
                ? [...accept]
                    .slice(0, -1)
                    .map(elem => elem.toUpperCase())
                    .join(', ') +
                  ' o ' +
                  accept[accept.length - 1].toUpperCase()
                : 'Todos los tipos de archivos son aceptados'}
            </p>
          </div>
          <input
            className="hidden"
            id={domId}
            type="file"
            onChange={e => handleSelect(e.target.files)}
            multiple={multiple}
            accept={'.' + accept.join(',.')}
          />
        </label>
      )}
      <div
        className={`${
          multiple
            ? 'flex flex-wrap gap-3 mt-4'
            : 'flex justify-center w-full  flex-wrap gap-3 mt-4'
        } relative `}
      >
        {urlThumbnail?.map((elem, index) => (
          <div
            key={index}
            className={`${
              multiple
                ? 'flex w-[90px] h-[80px] rounded-lg border-2 overflow-hidden border-neutral-700'
                : ' flex flex-col h-[200px] '
            } relative `}
          >
            <Thumbnail
              className={`${multiple ? 'w-[90px] h-[80px] ' : ' h-full '}  `}
              file={fileThumbnail[index]}
              url={urlThumbnail[index]}
              handleRemove={() => handleRemove(index)}
            />
            {!multiple && (
              <div className="w-full ">
                {!fileThumbnail[index].url && (
                  <div className="flex items-center">
                    <div className="w-full  bg-secondary-100 dark:bg-secondary-700">
                      <div
                        className="h-1  bg-blue-500"
                        style={{
                          width: Math.round(progress?.progress * 100) + '%'
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {fileThumbnail[index]?.url && (
              <button
                className="absolute top-0 right-0 text-secondary-400 hover:text-black dark:text-secondary-400 darkhover:text-white"
                type="button"
                onClick={() => handleRemove(index)}
              >
                <IoIosClose size={32} />
              </button>
            )}
          </div>
        ))}
      </div>
    </InputContainer>
  );
};

InputMedia.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  accept: PropTypes.array,
  multiple: PropTypes.bool,
  register: PropTypes.func.isRequired,
  postFile: PropTypes.func.isRequired,
  removeFile: PropTypes.func.isRequired,
  required: PropTypes.bool
};

export { InputMedia };
