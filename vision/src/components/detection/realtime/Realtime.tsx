import React, { useRef, useContext } from 'react';
import { ModelContext } from '../context/model-context';
import { useDimension } from '../utils/dimension-hook';
import useWebcam from './useWebcam';
import useBoxRenderer from '../video/useBoxRenderer';
import { GraphModel } from '@tensorflow/tfjs';

interface RealtimeProps {
  labels: string[];
  model: GraphModel;
}

const Realtime = ({ model, labels }) => {
  const dimensions = useDimension();
  const videoRef = useRef();
  const canvasRef = useRef();

  const cameraLoaded = useWebcam(model, videoRef);
  useBoxRenderer({
    model,
    videoRef,
    canvasRef,
    shouldRender: cameraLoaded,
    labels,
  });

  return (
    <div>
      <div className="center-div">
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
              ref={videoRef}
              width={dimensions.width}
              height={dimensions.height}
              style={{
                position: 'absolute',
                top: '0px',
                left: '0px',
              }}
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
      </div>
    </div>
  );
};

export default Realtime;
