import { useState, useEffect, useRef } from 'react'

export function usePrevious(value) {
  const ref = useRef(value)
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

export default function eventListener(event, handler, targetId) { // event: e.g. resize, handler: function, MUST return this in useEffect
  // handler()
  // console.log(targetId)
  const target = getElementById(targetId)
  target.addEventListener(event, handler)
  return () => target.removeEventListener(event, handler)
}

export function useClickOutside(id, handle) {
  function handleClick(e) {
    if(id && id.current && !id.current.contains(e.target)) handle(e)
  }
  useEffect( () => eventListener('mousedown', handleClick), [id])
}

export function getElementById(targetId) {
  return targetId ? document.getElementById(targetId) : window
}

// function getOffset(id) {
//   return document.getElementById(id).scrollTop
// }

function getElementY(id) {
  return document.getElementById(id).getBoundingClientRect().top
}

export function useScroll(id, parentId) {
  const [y, setY] = useState(0);
  function handle() {
    const elePosition = getElementY(id)
    // console.log(getOffset(parentId))
    setY(elePosition)
  }
  useEffect(() => {
    return eventListener('scroll', handle, parentId)
  }, [])
  return [y]
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