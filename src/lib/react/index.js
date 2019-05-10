import { useState, useEffect } from 'react'

export default function eventListener(event, handler, targetId) { // event: e.g. resize, handler: function, MUST return this in useEffect
  // handler()
  // console.log(targetId)
  const target = targetId ? document.getElementById(targetId) : window
  target.addEventListener(event, handler)
  return () => target.removeEventListener(event, handler)
}

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

// Bug: Cannot get new position when new element loaded
export function useAppear(id, parentId) {
  const [appear, setAppear] = useState(false);
  function handle() {
    const elePosition = document.getElementById(id).getBoundingClientRect().top
    // console.log('size', {elePosition})
    if(window.innerHeight > elePosition) {
      setAppear(true)
    } else {
      setAppear(false)
    }
  }
  useEffect(() => {
    handle()
    return eventListener('scroll', handle, parentId)
  }, [])
  return [appear, () => setAppear(false), handle]
}