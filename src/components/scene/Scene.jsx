import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import useInterval from '../../utils/useInterval';
import 'swiper/css';
import 'swiper/css/effect-fade';
import './Scene.css';
import axios from 'axios';

function Scene(props) {
  const [apiJoke, setApiJoke] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetching joke from API
  const fetchJoke = async () => {
    try {
      const response = await axios.get('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' },
      });
      setApiJoke(response.data.joke);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching joke:', error);
      setLoading(false);
    }
  };

  // Fetch joke when component mounts
  useEffect(() => {
    fetchJoke();
  }, []);

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
      <div className="api-joke-container">
        {loading ? (
          <p>Loading joke...</p>
        ) : (
          <p>{apiJoke}</p>
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
