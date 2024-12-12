/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useContext } from 'react';
import MagicDropzone from 'react-magic-dropzone';
import { useDimension } from '../utils/dimension-hook';
import useBoxRenderer from './useBoxRenderer';
import upload from '../utils/upload.png';
import { GraphModel } from '@tensorflow/tfjs';

interface VideoProps {
  model: GraphModel;
  labels: string[];
}

const Video: React.FC<VideoProps> = ({ labels, model }) => {
  const dimensions = useDimension();
  const [frame, setFrame] = useState<string>();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useBoxRenderer({
    labels,
    model,
    videoRef: videoRef as any,
    canvasRef: canvasRef as any,
    shouldRender: videoLoaded,
  });

  const onDrop = (accepted, rejected, links) => {
    setVideoLoaded(false);
    if (accepted && accepted.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        videoRef.current.src = reader.result;
        setFrame(`${reader.result}#t=0.1`);
        videoRef.current.onloadeddata = () => {
          setVideoLoaded(true);
        };
      });
      reader.readAsDataURL(accepted[0]);
    }
  };

  return (
    <React.Fragment>
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="card">
            <MagicDropzone
              className="dropzone"
              accept="video/mp4, video/x-m4v, video/*"
              multiple={false}
              onDrop={onDrop}
            >
              <div
                style={{
                  display: 'block',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                {frame ? (
                  <video className="dropzone-image" src={frame} width="100" />
                ) : (
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
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
              <video
                autoPlay
                playsInline
                muted
                width={dimensions.width}
                height={dimensions.height}
                style={{
                  position: 'absolute',
                  top: '0px',
                  left: '0px',
                }}
                ref={videoRef}
              />
              <canvas
                width={dimensions.width}
                height={dimensions.height}
                style={{
                  position: 'absolute',
                  top: '0px',
                  left: '0px',
                  zIndex: 1,
                }}
                ref={canvasRef}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Video;
