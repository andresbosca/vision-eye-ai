import Detection from '../image/Detection';
import Video from '../video/Video';
import './Selector.css';
import { GraphModel } from '@tensorflow/tfjs';

interface SelectorProps {
  selected: string;
  selectMode: (mode: string) => void;
  model: GraphModel;
  labels: string[];
}

const Selector: React.FC<SelectorProps> = ({
  selected,
  selectMode,
  labels,
  model,
}) => {
  return (
    <>
      <div className="top-div">
        <div className="section-div">
          {selected === 'Image' ? (
            <div className="selected-div" onClick={() => selectMode('Image')}>
              <div className="selected-text">Upload Image</div>
            </div>
          ) : (
            <div className="deselected-div" onClick={() => selectMode('Image')}>
              <div className="deselected-text">Upload Image</div>
            </div>
          )}
        </div>

        <div className="section-div">
          {selected === 'Video' ? (
            <div className="selected-div" onClick={() => selectMode('Video')}>
              <div className="selected-text">Upload Video</div>
            </div>
          ) : (
            <div className="deselected-div" onClick={() => selectMode('Video')}>
              <div className="deselected-text">Upload Video</div>
            </div>
          )}
        </div>
      </div>

      {selected === 'Image' && <Detection model={model} labels={labels} />}
      {selected === 'Video' && <Video model={model} labels={labels} />}
    </>
  );
};
export default Selector;
