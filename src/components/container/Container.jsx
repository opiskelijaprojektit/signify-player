import './Container.css'
import clsx from 'clsx'

/**
 * A container component that serves as a wrapper for the scene 
 * content. Helps to attach background image to scene.
 *
 * @component
 * @author Pekka Tapio Aalto
 */
function Container({backgroundImage, children, className, ...props}) {

  // Create inline style for background image if url of the
  // image is defined. 
  let style
  if (backgroundImage) {
    style = { backgroundImage: `url(${backgroundImage})` }
  }

  return (
    <div style={style} className={clsx("swiperslide_container", className)}>
      {children}
    </div>
  )
}

export default Container