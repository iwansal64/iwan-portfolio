import { useEffect } from "react";

let initiated = false;

/**
 * 
 * @description 
 * This element is used to observe an element if its already in the user viewport or not.
 * 
 * @function
 * After the element is in user view it will gets 'observed-intersected' in their class
 * 
 * @requires
 * the elements should have 'observed' in their class
 */
export default function Observer() {
  function something_just_got_observed(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    entries.forEach((entry) => {
      if(entry.isIntersecting) {
        console.log("IN");
        entry.target.classList.add("observed-intersected");
        return;
      }
      console.log("OUT");
      entry.target.classList.remove("observed-intersected");
    })
  }
  
  useEffect(() => {
    // Prevent double observe
    if(initiated) return;
    initiated = true;
    console.log("WOI");
    
    const observer = new IntersectionObserver(something_just_got_observed, {
      threshold: 1
    });
    
    const observed_elements = Array.from(document.getElementsByClassName("observed"));
    observed_elements.forEach((element) => {
      observer.observe(element);
    });
  }, []);

  return <></>;
}