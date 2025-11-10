import './Webpage.css'

/**
 * Embeds full screen view of given url.
 * 
 * @component
 * @author Pekka Tapio Aalto
 */
function Webpage(props) {

  return (
    <div className='webpage'>
      <iframe
        src={props.url}
        className='webpage-frame'
        title="Webpage content of signify screen">
      </iframe>
    </div>
  )

}

export default Webpage