import { useEffect } from "react";

let initiated = false;

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
    console.log("TEST");
    
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