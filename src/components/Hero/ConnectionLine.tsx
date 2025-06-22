import { animate, createScope, type Scope } from "animejs";
import { useEffect, useRef, useState } from "react";
import { useAnimeHook } from "../../hooks/useAnime";
import { useUniqueIDHook } from "../../hooks/useUniqueID";
import { interval_between_workflows } from "../../others/autoSystemDesignConf";

interface Props {
  fromPos: [number, number],
  toPos: [number, number],
  lineWidth?: string,
  lineColor?: string,
  delay?: number,
  className?: string
}

export default function ConnectionLine(props: Props) {
  const animeScope = useRef<Scope | null>(null);
  
  const [elementClass, setElementClass] = useState("");
  const { animeScopeRoot } = useAnimeHook();
  const { getUniqueID } = useUniqueIDHook();


  // Detailed Value Informations
  const left_values: string[] = [
    props.fromPos[0] + "%",
    (props.fromPos[0] + ((props.toPos[0] - props.fromPos[0]) / 2)) + "%"
  ];

  const top_values: string[] = [
    (props.fromPos[1] + ((props.toPos[1] - props.fromPos[1]) / 2)) + "%",
    props.toPos[1] + "%",
  ];

  const width_values: string[] = [
    Math.abs(props.fromPos[0] - props.toPos[0]) + "%",
    Math.abs(props.fromPos[1] - props.toPos[1]) + "%",
  ]

  // Use effects
  useEffect(() => {
    setElementClass(getUniqueID());
  }, []);
  
  useEffect(() => {
    if(!animeScopeRoot || !elementClass) return;

    animeScope.current = createScope({ root: animeScopeRoot }).add(self => {
      animate(`.${elementClass}-1`, {
        height: [
          {
            from: "0%",
            to: width_values[1],
            duration: 500,
            ease: "linear",
            delay: props.delay,
          },
          {
            to: 0,
            duration: 2000,
            delay: (interval_between_workflows-(props.delay ?? 0))
          }
        ]
      });
      animate(`.${elementClass}-2`, {
        width: [
          {
            from: "0%",
            to: width_values[0],
            duration: 500,
            ease: "linear",
            delay: 500 + (props.delay ?? 0),
          },
          {
            to: 0,
            duration: 2000,
            delay: (interval_between_workflows-(props.delay ?? 0))
          }
        ]
      });
      
    })
    
    return (() => { animeScope.current?.revert(); })
  }, [animeScopeRoot, elementClass, width_values]);
  
  return <>
    <div className={`${props.className} ${elementClass}-1 -z-2 absolute -translate-x-1/2 -translate-y-1/2`} style={{ backgroundColor: props.lineColor ?? "white", top: top_values[0], left: left_values[0], width: props.lineWidth ?? "4px" }}></div>
    <div className={`${props.className} ${elementClass}-2 -z-2 absolute -translate-x-1/2 -translate-y-1/2`} style={{ backgroundColor: props.lineColor ?? "white", top: top_values[1], left: left_values[1], height: props.lineWidth ?? "4px" }}></div>
  </>
}