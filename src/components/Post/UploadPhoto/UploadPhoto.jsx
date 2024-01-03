import React from "react";

import { useState } from 'react';
import './UploadPhoto.scss';

const UploadPhoto = ({ onInputChange }) => {
    const [fileName, setFileName] = useState('Upload your photo');
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [isPhotoValid, setIsPhotoValid] = useState(true);
    const [bottomLabelText, setBottomLabelText] = useState('');

    const checkImageResolution = (photo) => {
        return new Promise((res, rej) => {
            const reader = new FileReader();
            reader.onload = function (event) {
                const img = new Image();

                img.src = event.target.result;

                img.onload = function () {
                    if (img.width >= 70 && img.height >= 70) {
                        if (photo.size <= 5 * 1024 * 1024) {
                            res(true);
                            setIsPhotoValid(true)
                        } else {
                            setBottomLabelText('Image size is more than 5MB')
                            setIsPhotoValid(false);
                            rej('Image size is more than 5MB');
                        }
                    } else {
                        setBottomLabelText('Image resolution is less than 70x70')
                        setIsPhotoValid(false);
                        rej('Image resolution is less than 70x70');
                    }
                };
            };
            photo ? reader.readAsDataURL(photo) : rej(false);
        });
    };

    const handleImageUpload = async (event) => {
        const photo = event.target.files[0];
        try {
            const isResolutionValid = await checkImageResolution(photo);
            if (isResolutionValid) {
                onInputChange(photo);
                setFileName(photo.name);
                setIsFileUploaded(true);
            } else {
                setFileName('Upload your photo');
                setIsFileUploaded(false);
            }
        } catch (error) {
            console.error('Error checking image resolution:', error);
        }
    };

    const labelClass = `post-block__label ${isFileUploaded ? 'active' : ''}`;
    const photoClass = `post-block__uploader ${isPhotoValid ? '' : 'not-valid'}`;
    return (
        <div className={photoClass}>
            <label htmlFor="photo" className="post-block__label">
                Upload
            </label>
            <label htmlFor="photo" className={labelClass}>
                {fileName}
            </label>
            <input
                type="file"
                id="photo"
                name="photo"
                accept="image/jpeg, image/jpg"
                className="input-file"
                required
                onChange={handleImageUpload}
            />
            <div className="post-block__cover">
                {setIsPhotoValid
                    ? <label className="post-block__bottom-label" htmlFor='photo'>
                        {bottomLabelText}
                    </label>
                    : null}
            </div>
        </div>
    )
};

export default UploadPhoto;
