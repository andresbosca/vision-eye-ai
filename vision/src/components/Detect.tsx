import React, { useState, useCallback, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import Selector from './detection/utils/Selector';
import LoadingSpinner from './detection/utils/LoadingSpinner';

const MODEL_URL = '/detection/';
const LABELS_URL = MODEL_URL + 'labels.json';
const MODEL_JSON = MODEL_URL + 'model.json';

const Detect: React.FC = () => {
  const [model, setModel] = useState<tf.GraphModel>(null);
  const [labels, setLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    const handleLoadModel = async () => {
      setLoading(true);

      const newModel = await tf.loadGraphModel(MODEL_JSON);
      setModel(newModel);
      const response = await fetch(LABELS_URL);
      const labels_json = await response.json();
      setLabels(labels_json);

      setLoading(false);
    };

    handleLoadModel();
  }, []);

  return (
    <>
      <div>
        {model ? (
          <div>
            {
              <Selector
                selected={selected}
                selectMode={setSelected}
                model={model}
                labels={labels}
              />
            }
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '5%',
            }}
          >
            {loading ? (
              <div style={{ textAlign: 'center' }}>
                <LoadingSpinner />
                <p
                  style={{
                    color: '#950740',
                    fontWeight: '500',
                  }}
                >
                  Loading Model. Please wait a few seconds...
                </p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
};

export default Detect;
