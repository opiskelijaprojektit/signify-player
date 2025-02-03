// Define values for the device states.
//  1 = the device is registered, but not linked
//  2 = the device linked, but no content in attached
// These values are returned by the API call, so don't
// change them without also changing the API interface.
const devicestate = {
  registered: "1",
  linked: "2"
}

// Define values for the display orietations
//  landscape = horizontal (16:9)
//  portrait = vertical (16:9)
const orientations = {
  landscape: "landscape",
  portrait: "portrait"
}

// Define values for the display modes
//  splash = splash screen
//  registered = the device is registered, the code for the connection is displayed
//  linked = the device is linked, but no content is attached to the device
//  scenes = presentation mode
const screens =  {
  splash: "splash",
  registered: "registered",
  linked: "linked",
  scene: "scene"
}

export { devicestate, orientations, screens }