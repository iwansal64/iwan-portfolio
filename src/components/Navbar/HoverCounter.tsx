import { useEffect, useRef } from "react";
import { useHoverCounterHook } from "../../hooks/useHoverCounter";

export default function HoverCounter() {
  const { counter, addCounter, resetCounter } = useHoverCounterHook();
  const counterTimeout = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    const hover_counter_elements = Array.from(document.getElementsByClassName("hover-counter"));
    
    hover_counter_elements.forEach(element => {
      (element as HTMLLinkElement).addEventListener("mouseenter", addCounter);
    })

    return (() => { hover_counter_elements.forEach(element => (element as HTMLLinkElement).removeEventListener("mouseenter", addCounter)) });
  }, []);

  useEffect(() => {
    //? Hover counter timeout
    if(counter == 0) {
      return;
    }
    
    const hover_counter_elements = Array.from(document.getElementsByClassName("hover-counter"));
    
    if(counterTimeout.current) clearTimeout(counterTimeout.current);

    counterTimeout.current = setTimeout(() => {
      console.log("RESET");
      resetCounter();
      hover_counter_elements.forEach(element => element.classList.remove("over-10"));
    }, 1000);
    
    
    //? Add over-10 class after hoverring more than 10 times
    if(counter < 10) {
      return;
    }

    hover_counter_elements.forEach(element => element.classList.add("over-10"));

  }, [counter]);
  
  return <></>;
}