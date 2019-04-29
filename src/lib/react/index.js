// import { useState, useEffect, useRef } from 'react'

// export default function eventListener(event, handler) { // event: e.g. resize, handler: function, MUST return this in useEffect
//   // handler()
//   window.addEventListener(event, handler)
//   return () => window.removeEventListener(event, handler)
// }

// // const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
// export function useInfiniteScroll(callback) {
//   const [isFetching, setIsFetching] = useState(false);

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   function handleScroll() {
//     console.log(1123)
//     if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight 
//       || isFetching) return;
//     setIsFetching(true);
//   }

//   useEffect(() => {
//     console.log(1123)
//     if (!isFetching) return;
//     callback(() => {
//       console.log('called back');
//     });
//   }, [isFetching]);

//   return [isFetching, setIsFetching];
// }


// export function useAppear(id) {
//   const [didShow, setDidShow] = useState(false);
//   useEffect(() => eventListener('wheel', () => { 
//     const elePosition = document.getElementById(id).getBoundingClientRect().top
//     if(window.innerHeight > elePosition && !didShow) {
//       console.log('show')
//       setDidShow(true)
//     } else {
//       console.log('not-show')
//       setDidShow(false)
//     }
//   }), [])
//   return didShow
// }