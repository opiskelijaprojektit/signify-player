import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import useInterval from '../../utils/useInterval';
import 'swiper/css';
import 'swiper/css/effect-fade';
import './Scene.css';


function Scene(props) {
  const [sceneDuration, setSceneDuration] = useState(props.scenes[0].duration);
  const swiperRef = useRef();

  // Scene change handler
  function handleSceneChange() {
    swiperRef.current.slideNext();
    const currentScene = swiperRef.current.realIndex;
    if (props.scenes[currentScene].duration && sceneDuration !== props.scenes[currentScene].duration) {
      setSceneDuration(props.scenes[currentScene].duration);
    }
  }

  useInterval(handleSceneChange, sceneDuration);

  // Generate the scene deck (Jokes and Images)
  const scenedeck = props.scenes.map((scene) => {
    switch (scene.type) {
      case "joke":
        return (
          <SwiperSlide key={scene.id}>
            <div className="joke-container">
              <div className="joke-text">{scene.data.text}</div>
              <div className="joke-author">{scene.data.author}</div>
            </div>
          </SwiperSlide>
        );
      case "image":
        return (
          <SwiperSlide key={scene.id}>
            <div className="image-container">
              <img
                src={scene.data.url.landscape} // Use landscape image URL for now
                alt={`scene-${scene.id}`}
                className="image"
              />
            </div>
          </SwiperSlide>
        );
      default:
        return null;
    }
  });

  return (
    <div className="scene-container">
      {/* Now use the joke passed from App.jsx */}
      <div className="api-joke-container">
        {props.joke ? (
          <p>{props.joke}</p>
        ) : (
          <p>Loading joke...</p>
        )}
      </div>

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        loop={true}
        effect={'fade'}
        modules={[EffectFade]}
      >
        {scenedeck}
      </Swiper>
    </div>
  );
}

export default Scene;

