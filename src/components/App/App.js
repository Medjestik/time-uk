import React from 'react';
import './App.css';
import Carousel from 'react-elastic-carousel';
import steps from '../../utils/steps.js';

function App() {

  const [currentStep, setCurrentStep] = React.useState(steps[0]);

  const containerHeightRef = React.createRef();

  const [videoHeight, setVideoHeight] = React.useState(0);

  const [windowWidth, setWindowWidth] = React.useState(0);

  const videoStyle = {
    height: videoHeight,
  };

  function defineSteps() {
    if (windowWidth > 1600) {
      return 6;
    } else if (windowWidth > 1439) {
      return 5;
    } else {
      return 4;
    }
  }

  React.useEffect(() => {
    if (containerHeightRef.current) {
      setVideoHeight(containerHeightRef.current.clientHeight - 240);
    }
  }, [windowWidth, containerHeightRef]);

  function chooseStep(step) {
    setCurrentStep(step);
  }

  React.useEffect(() => {
    function resizeWindow(evt) {
      setWindowWidth(evt.target.innerWidth);
    }
    window.addEventListener('resize', resizeWindow);
    return () => {
      window.removeEventListener('resize', resizeWindow);
    }
  }, []);

React.useEffect(() => {
  setWindowWidth(window.innerWidth);
}, [windowWidth]);

React.useState(() => {
  setCurrentStep(steps[0]);
  return (() => {
    setCurrentStep({});
  })
}, []);

console.log(videoStyle)

console.log(steps)

  return (
    <div className='page'>
      <div className='container' ref={containerHeightRef}>
        <div className='carousel'>
          <Carousel itemsToShow={defineSteps()}>
            {
              steps.map((item, i) => (
                <div className='carousel-item' key={i}>
                  <div className='carousel-item__step'>
                    <div className='carousel-item__step-round' onClick={() => chooseStep(item)}>
                      {
                        item.id === currentStep.id &&
                        <div className='carousel-item__step-round_type_active'></div>
                      }
                    </div>
                    <div className='carousel-item__step-line'></div>
                  </div>
                  <h3 className='carousel-item__date'>{item.date}</h3>
                  <p className='carousel-item__text'>{item.text}</p>
                </div>
              ))
            }
          </Carousel>
        </div>
        <div className='page__video-container'>
          <div className='page__video-info scroll' style={Object.assign({}, videoStyle)} >
            <h3 className='page__video-title'>{currentStep.date}</h3>
            {
              currentStep.description.map((elem, i) => (
                <p className='page__video-description' key={i}>{elem || ''}</p>
              ))
            }
          </div>
          <video key={currentStep.video} className='page__video' controls autoPlay muted >
            <source src={currentStep.video} type='video/mp4' />
          </video>
        </div>
      </div>
    </div>
  );
}

export default App;
