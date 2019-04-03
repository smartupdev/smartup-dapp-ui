import React from 'react'
import { SVG } from './index'
export default ({ color, checked, ...rest }) => 
  checked ?
  <SVG {...rest} primary color={color} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 56.9 56.9" xmlSpace="preserve">
    <path d="M52,6.3c0-3.3-2.7-6.1-6-6.1v0H9.1C5.7,0.1,3,2.9,3,6.2V57l19-12.7L41,57V25.1h11V6.3z M50,23.1h-9v-16
      c0-0.3,0-0.7,0.1-1c0.4-1.9,1.9-3.4,3.7-3.9c0,0,0.1,0,0.1,0c0.2-0.1,0.5-0.1,0.8-0.1c0.1,0,0.2,0,0.2,0C48.2,2.2,50,4,50,6.3
      L50,23.1z"/>
  </SVG>
  :
  <SVG {...rest} color={'#fff'} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 56.9 56.9" xmlSpace="preserve">
    <path d="M52.9,6.1c0-3.3-2.7-6.1-6-6.1v0H10C6.7,0,3.9,2.7,3.9,6.1v50.8l19-12.7l19,12.7V25h11V6.1z M39.9,53.1
      l-17-11.3l-17,11.3v-47C5.9,3.8,7.8,2,10,2h32c-1,1-1.7,2.2-2,3.6l0,0C40,5.8,40,6.1,40,6.3c0,0.2,0,0.5,0,0.7v18V53.1z M50.9,23h-9
      V7c0-0.3,0-0.7,0.1-1c0.4-1.9,1.9-3.4,3.7-3.9c0,0,0.1,0,0.1,0C46.1,2.1,46.4,2,46.6,2c0.1,0,0.2,0,0.2,0c2.2,0,4.1,1.9,4.1,4.1V23z
      "/>
  </SVG>
