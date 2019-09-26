import { useState, useEffect, useRef } from 'react'
import { log } from '../util'
// 1. Similar to useInterval, but the delay will start counting when callback response
// 2. We won't update the callback after ini because we use many arrow function as callback, it will create new timeout each time
// 3. We call the callback in timeout as callback(false, true), which false is isLoadMore, true is Polling.
//    When LoadMore is true, new record append to bottom. 
//    When Polling is true, new record append to top.
//    When Both not true, which mean first load, so will clear all data and use new record only.
//    This approach is to clearly separate first load data, polling data or load more data
export function usePolling(callback, delay, dependencies) {
  // const timeoutRef = useRef()
  // async function loop(firstTime) {
  //   await callback(false, !firstTime)
  //   if(firstTime || timeoutRef.current)
  //     timeoutRef.current = setTimeout(loop, delay)
  // }
  // useEffect(() => {
  //   loop(true)
  //   return () => {
  //     log.casual('Clear polling of ' + callback.name)
  //     clearTimeout(timeoutRef.current)
  //     timeoutRef.current = null
  //   }
  // }, dependencies || [delay]) // please refer to 2
}

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

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
  return targetId ? 
    typeof targetId === 'string' ?
    document.getElementById(targetId) 
    : targetId.current
  : window
}

// function getOffset(id) {
//   return document.getElementById(id).scrollTop
// }

function getElementY(element) {
  return element ? element.getBoundingClientRect() : {}
}

export function useScroll(parentId) {
  const [position, setPosition] = useState(0)
  const ref = useRef()
  const prev = usePrevious(ref.current)
  function handle() {
    setPosition(getElementY(ref.current))
  }
  useEffect(() => eventListener('scroll', handle, parentId), [])
  useEffect(() => {
    if(ref.current !== prev) {
      handle()
    }
  })
  return [ref, position, getElementY(parentId && parentId.current)]
  // position includes: y, x, top, bottom, etc
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

export function useScrollDirection() {
  const prevScrollY = useRef(0)
  const [goingUp, setGoingUp] = useState(false);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (prevScrollY.current < currentScrollY && goingUp) {
      setGoingUp(false);
    }
    if (prevScrollY.current > currentScrollY && !goingUp) {
      setGoingUp(true);
    }
    prevScrollY.current = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {passive: true});
    return () => window.removeEventListener("scroll", handleScroll, {passive: true});
  }, [goingUp]); 
  return goingUp
}