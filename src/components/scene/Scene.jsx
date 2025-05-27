import { useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectFade } from "swiper/modules"
import useInterval from "../../utils/useInterval"
import "swiper/css"
import "swiper/css/effect-fade"
import "./Scene.css"

// Import scene components
import Anniversary from '../../scenes/anniversary'
import Book from '../../scenes/book'
import Calendar from '../../scenes/calendar'
import Electricity from '../../scenes/electricity'
import Fact from "../../scenes/fact"
import Image from '../../scenes/image'
import Movie from '../../scenes/movie';
import NameDay from '../../scenes/nameday'
import '../../scenes/nameday/Nameday.css'
import News from '../../scenes/news/News'
import Quote from '../../scenes/quote'
import Status from '../../scenes/status'
import Stock from '../../scenes/stock'
import TarotCard from '../../scenes/tarot/TarotCard'
import TimeLeft from '../../scenes/timeleft'
import Today from '../../scenes/today'
import Weather from '../../scenes/weather'
import Vulnerability from '../../scenes/vulnerability/'

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
      case "anniversary":
        return (<SwiperSlide key={scene.id}><Anniversary orientation={props.orientation} data={scene.data} /></SwiperSlide>)
        break;
      case "book":
        return (<SwiperSlide key={scene.id}><Book orientation={props.orientation} url={scene.data.url} /></SwiperSlide>)
        break;
      case "calendar":
        return (<SwiperSlide key={scene.id}><Calendar orientation={props.orientation} url={scene.data.url} /></SwiperSlide>)
        break;
      case "electricity":
        return (<SwiperSlide key={scene.id}><Electricity /></SwiperSlide>)
        break;
      case "fact":
        return (<SwiperSlide key={scene.id}><Fact orientation={props.orientation} url={scene.data.url} /></SwiperSlide>)
        break;
      case "image":
        return (<SwiperSlide key={scene.id}><Image orientation={props.orientation} url={scene.data.url} /></SwiperSlide>)
        break;
      case "movie":
        return (<SwiperSlide key={scene.id}><Movie data={scene.data} /></SwiperSlide>)
        break;
      case "nameday":
        return (<SwiperSlide key={scene.id} className="nameday_slide">
            <div className="nameday_wrapper">
              <Image className="nameday_picture" orientation={props.orientation} url={scene.data.url} />
              <NameDay className="nameday_text" header={scene.data.header} />
            </div>
          </SwiperSlide>)
        break;
      case "news": 
        return (<SwiperSlide key={scene.id}><News apikey={scene.data.key} /></SwiperSlide>)
        break;
      case "quote":
        return (<SwiperSlide key={scene.id}><Quote orientation={props.orientation} /></SwiperSlide>)
        break;
      case "status":
        return (<SwiperSlide key={scene.id}><Status orientation={props.orientation} startTime={props.startTime} version={props.version} /></SwiperSlide>)
        break;
      case "stock":
        return (<SwiperSlide key={scene.id}><Stock orientation={props.orientation} apikey={scene.data.apikey} symbol={scene.data.symbol} /></SwiperSlide>)
        break;
      case "tarot":
        return (<SwiperSlide key={scene.id}><TarotCard /></SwiperSlide>)
        break;
	   case "timeleft":
        return (<SwiperSlide key={scene.id}><TimeLeft data={scene.data} /></SwiperSlide>)
		    break;
      case "today":
        return (<SwiperSlide key={scene.id}><Today orientation={props.orientation} url={scene.data.url} /></SwiperSlide>)
        break;
      case "weather":
        return (<SwiperSlide key={scene.id}><Weather orientation={props.orientation} url={scene.data.url} location={scene.data.location} locale={scene.data.locale} timezone={scene.data.timezone} /></SwiperSlide>)
        break;
      case "vulnerability":
        return (<SwiperSlide key={scene.id}><Vulnerability orientation={props.orientation} url={scene.data.url} /></SwiperSlide>)
        break;
      default:
        return null;
    }
  });
  
  // State variable to contain change interval time in millisecons.
  // Start with tge duration of the first scene.
  const [sceneDuration, setSceneDuration] = useState(props.scenes[0].duration)

  // Create a reference handle for Swiper.
  const swiperRef = useRef()

  // Performs a change of scene and updates the duration if necessary.
  //  - Change to the next scene.
  //  - Find out the index number of the new scene in the scenes array.
  //  - Update change duration if necessary.
  function handleSceneChange() {
    swiperRef.current.slideNext()
    const currentScene = swiperRef.current.realIndex
    if (
      props.scenes[currentScene].duration &&
      sceneDuration != props.scenes[currentScene].duration
    ) {
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
        swiperRef.current = swiper
      }}
      loop={true}
      effect={"fade"}
      modules={[EffectFade]}
    >
      {scenedeck}
    </Swiper>
  )
}

export default Scene
