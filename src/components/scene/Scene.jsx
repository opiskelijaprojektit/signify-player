import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade } from 'swiper/modules'
import useInterval from '../../utils/useInterval'
import 'swiper/css'
import 'swiper/css/effect-fade'
import './Scene.css'

// Import vulnerability components
import Vulnerability from '../../scenes/vulnerability/'

// Import scene components
import Image from '../../scenes/image'


/**
 * Scene component, which handles the rendering and switching of scenes.
 *
 * @component
 * @author Pekka Tapio Aalto
 */
function Scene(props) {    

  // Create deck of scenes. Each scene component must be located
  // inside a SwiperSlide component. If you add new scenes, the
  // implementation of the Image component will serve as an example.
  const scenedeck = props.scenes.map(scene => {
    switch (scene.type) {
      case "image":
        return (
          <SwiperSlide key={scene.id}>
            <Image orientation={props.orientation} url={scene.data.url} />
          </SwiperSlide>
        );
      case "vulnerability":
        return (
          <SwiperSlide key={scene.id}>
            <Vulnerability 
              orientation={props.orientation} 
              url={scene.data.url} 
              rssUrl={scene.data.rssUrl} 
              fields={scene.data.fields} 
            />
          </SwiperSlide>
        );
      default:
        return null;
    }
  });
  

  // State variable to contain change interval time in millisecons.
  // Start with tge duration of the first scene.
  const [sceneDuration, setSceneDuration] = useState(props.scenes[0].duration)

  // Create a reference handle for Swiper.
  const swiperRef = useRef();

  // Performs a change of scene and updates the duration if necessary.
  //  - Change to the next scene.
  //  - Find out the index number of the new scene in the scenes array.
  //  - Update change duration if necessary.
  function handleSceneChange() {
    swiperRef.current.slideNext()
    const currentScene = swiperRef.current.realIndex
    if (props.scenes[currentScene].duration && sceneDuration != props.scenes[currentScene].duration) {
      setSceneDuration(props.scenes[currentScene].duration)
    }
  }

  // Start a timer, which takes care of the scene change.
  // Timer uses custom React Hooks function.
  useInterval(handleSceneChange, sceneDuration)

  // Return the Swiper-component.
  return (
    <Swiper
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      loop={true}
      effect={'fade'}
      modules={[EffectFade]}>
      {scenedeck}
    </Swiper>
  )
}

export default Scene