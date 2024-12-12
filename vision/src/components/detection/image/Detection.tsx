import React, { useState, useRef, useContext } from 'react';
import { ModelContext } from '../context/model-context';
import { useDimension } from '../utils/dimension-hook';
import useDetector from './useDetector';
import MagicDropzone from 'react-magic-dropzone';
import upload from '../utils/upload.png';
import { GraphModel } from '@tensorflow/tfjs';

interface DetectionProps {
  model: GraphModel;
  labels: string[];
}

const Detection: React.FC<DetectionProps> = ({ model, labels }) => {
  const dimensions = useDimension();
  const [loadedImg, setLoadedImg] = useState(null);
  const imageRef = useRef();
  const canvasRef = useRef();

  useDetector(model, labels, loadedImg, imageRef, canvasRef);

  const onDrop = (accepted, rejected, links) => {
    if (accepted && accepted.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setLoadedImg(reader.result);
      });
      reader.readAsDataURL(accepted[0]);
    }
  };

  return (
    <React.Fragment>
      <div>
        <div className="center-div">
          <div className="card">
            <MagicDropzone
              className="dropzone"
              accept="image/jpeg, image/png, .jpg, .jpeg, .png"
              multiple={false}
              onDrop={onDrop}
            >
              <div className="center-div-wrap">
                {loadedImg ? (
                  <img
                    className="dropzone-image"
                    src={loadedImg}
                    width="100"
                    alt="drop"
                  />
                ) : (
                  <div>
                    <div className="center-div">
                      <img src={upload} width="50" height="50" alt="upload" />
                    </div>
                    <div style={{ display: 'block' }}>
                      <p>Drag/drop files over here</p>
                    </div>
                  </div>
                )}
              </div>
            </MagicDropzone>
          </div>
        </div>
        <div className="center-div">
          {loadedImg && (
            <div
              style={{
                width: `${dimensions.width}px`,
                height: `${dimensions.height}px`,
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                }}
              >
                <img
                  src={loadedImg}
                  width={dimensions.width}
                  height={dimensions.height}
                  style={{
                    position: 'absolute',
                    top: '0px',
                    left: '0px',
                  }}
                  ref={imageRef}
                  alt="ok"
                />
                <canvas
                  width={dimensions.width}
                  height={dimensions.height}
                  style={{
                    position: 'absolute',
                    top: '0px',
                    left: '0px',
                  }}
                  ref={canvasRef}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Detection;