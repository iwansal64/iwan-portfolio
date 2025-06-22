import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, createScope, Scope } from "animejs";
import ConnectionLine from "./ConnectionLine";
import { useAnimeHook } from "../../hooks/useAnime";
import { get_random_from_array } from "../../others/util";
import { interval_between_workflows, Workflow, workflow_creation_time, workflow_data, workflow_options, WorkflowBlocks } from '../../others/autoSystemDesignConf';


type WorkflowChoosenBlocksType = {
  [key: string]: string|null;
};

type WorkflowBlocksPositionType = {
  [key: string]: [number, number];
};

type WorkflowData = {
  workflow_block_positions: WorkflowBlocksPositionType;
  workflow_choosen_blocks: WorkflowChoosenBlocksType;
  workflow_connections: WorkflowBlocks[];
};

export default function AutomaticSystemDesign() {
  const canvas = useRef<HTMLDivElement | null>(null);
  const anime_scope = useRef<Scope | null>(null);
  const workflow_interval = useRef<NodeJS.Timeout | null>(null);

  const { setAnimeScopeRoot } = useAnimeHook();

  const [workflowData, setWorkflowData] = useState<WorkflowData | null>(null);

  function generate_blocks() {
    //? Check if the current canvas is ready or not.
    if (!canvas.current) return;

    //? Choose Workflow to Show
    const choosen_workflow = Object.values(Workflow)[Math.floor(Math.random() * Object.keys(Workflow).length)];
    const choosen_workflow_data = workflow_data[choosen_workflow];

    //? Generate random positions
    const anchor_position: number[] = [
      [40, 40],
      [50, 50],
      [55, 65],
    ][Math.floor(Math.random() * 3)];
    const available_positions_x: number[] = [-30, -20, -10, 0, 10, 20, 30, 40];
    const available_positions_y: number[] = [-30, -20, -10, 0, 10, 20, 30, 40];
    const positions: [number, number][] = Object.keys(WorkflowBlocks).map(() => [
      available_positions_x.splice(Math.floor(Math.random() * available_positions_x.length), 1)[0] + anchor_position[1],
      available_positions_y.splice(Math.floor(Math.random() * available_positions_y.length), 1)[0] + anchor_position[1],
    ]);
    const workflow_block_position: WorkflowBlocksPositionType = {};
    Object.keys(WorkflowBlocks).forEach((block, index) => {
      workflow_block_position[block] = positions[index];
    })

    //? Generate random workflow blocks
    const workflow_block: WorkflowChoosenBlocksType = {};
    Object.keys(WorkflowBlocks).forEach((block) => {
      workflow_block[block] = choosen_workflow_data.includes(block as WorkflowBlocks) ? get_random_from_array(workflow_options[block as WorkflowBlocks]) : null;
    });

    //? Update workflow data
    setWorkflowData({
      workflow_block_positions: workflow_block_position,
      workflow_choosen_blocks: workflow_block,
      workflow_connections: choosen_workflow_data,
    });
  }

  useEffect(() => {
    if (workflow_interval.current || !canvas.current) {
      return;
    }

    setAnimeScopeRoot(canvas.current);

    (async () => {
      await new Promise((res, rej) => {
        setTimeout(() => {
          res(true);
        }, 2000);
      });

      generate_blocks();

      workflow_interval.current = setInterval(() => {
        generate_blocks();
      }, interval_between_workflows + 5000);
    })();
  }, [canvas]);

  useEffect(() => {
    if (!workflowData) return;

    anime_scope.current = createScope({ root: canvas }).add((self) => {
      Object.entries(workflowData.workflow_block_positions).forEach(([key, value], index) => {
        if(!workflowData.workflow_choosen_blocks[key as WorkflowBlocks]) return;
        
        animate(`.block-${key}`, {
          opacity: [
            {
              from: 0,
              to: 1,
              duration: 2000,
              delay: index * 100,
            },
            {
              to: 0,
              duration: 2000,
              delay: ((interval_between_workflows - (Object.entries(workflowData.workflow_block_positions).length * 100)) + (index*100))
            }
          ],
        });
      });
    });

    return () => {
      anime_scope.current?.revert();
    };
  }, [workflowData]);

  return (
    <>
      <div ref={canvas} id="system-design-canvas" className="w-[100vw] h-[100vh] absolute top-0 left-0 overflow-hidden -z-100">
        {(() => {
          if (!workflowData) return <></>;

          // Track connection side cost (used to prevent overlapping lines)
          const connection_sides_cost: {
            [key: string]: {
              cost: [number, number, number, number],
              used: [number, number, number, number],
              start_pos: [number, number, number, number]
            };
          } = {};
          const spread_value = 2;

          workflowData.workflow_connections.map((currConnection, index) => {
            if (index === 0) return;

            const prevConnection: WorkflowBlocks = workflowData.workflow_connections[index - 1];
            const prevPos: [number, number] = workflowData.workflow_block_positions[prevConnection];
            const currPos: [number, number] = workflowData.workflow_block_positions[currConnection];

            //? Calculate previous block side cost
            {
              //? Figure out which side the prev blocks used to connect
              let prevSide: number = 1;
              if (prevPos[1] < currPos[1]) prevSide = 3;

              //? Check if the prev blocks not tracked yet
              if (!(prevConnection in connection_sides_cost)) {
                connection_sides_cost[prevConnection] = {
                  cost: [0, 0, 0, 0],
                  used: [0, 0, 0, 0],
                  start_pos: [0, 0, 0, 0]
                };
              }

              //? Increase the use of connection side
              connection_sides_cost[prevConnection]["cost"][prevSide] += 1;
              connection_sides_cost[prevConnection]["start_pos"][prevSide] += (spread_value/4);
            }

            //? Calculate current block side cost
            {
              //? Figure out which side the prev blocks used to connect
              let currSide: number = 0;
              if (currPos[0] < prevPos[0]) currSide = 2;

              //? Check if the prev blocks not tracked yet
              if (!(currConnection in connection_sides_cost)) {
                connection_sides_cost[currConnection] = {
                  cost: [0, 0, 0, 0],
                  used: [0, 0, 0, 0],
                  start_pos: [0, 0, 0, 0]
                };
              }

              //? Increase the use of connection side
              connection_sides_cost[currConnection]["cost"][currSide] += 1;
              connection_sides_cost[currConnection]["start_pos"][currSide] += (spread_value/4);
            }
          });

          return Object.entries(workflowData.workflow_block_positions)
            .map(([key, [x_pos, y_pos]], index) => {
              const workflowBlockName = key as WorkflowBlocks;
              if(!workflowData.workflow_choosen_blocks[workflowBlockName]) return <></>;

              return (
                <div
                  key={index}
                  className={`${workflowBlockName} block-${key} absolute opacity-0 -translate-x-1/2 -translate-y-1/2 bg-black w-40 text-center flex justify-center items-center h-20`}
                  style={{ top: y_pos + "%", left: x_pos + "%" }}
                >
                  {workflowData.workflow_choosen_blocks[workflowBlockName]}
                </div>
              );
            })
            .concat(
              workflowData.workflow_connections.map((currConnection, index) => {
                if (index == 0) return <></>;

                const prevConnection: WorkflowBlocks = workflowData.workflow_connections[index - 1];
                let prevPos: [number, number] = workflowData.workflow_block_positions[prevConnection];
                let currPos: [number, number] = (workflowData.workflow_block_positions[currConnection]);
                let add = "";

                //? Modify the previous position in order to prevent lines overlap (left and right sides)
                {
                  let prevSide: number = 1;
                  if (prevPos[1] < currPos[1]) prevSide = 3;
  
                  const offsetPrevPos = -connection_sides_cost[prevConnection]["start_pos"][prevSide] + (spread_value * (connection_sides_cost[prevConnection]["used"][prevSide]));
                  prevPos[0] += offsetPrevPos;
                  connection_sides_cost[prevConnection]["used"][prevSide] += 1;
                  currPos[0] -= offsetPrevPos;

                }

                //? Modify the current position in order to prevent lines overlap (top and bottom sides)
                {
                  let currSide: number = 0;
                  if (currPos[0] < prevPos[0]) currSide = 2;
  
                  const offsetCurrPos = -connection_sides_cost[currConnection]["start_pos"][currSide] + (spread_value * (connection_sides_cost[currConnection]["used"][currSide]));
                  currPos[1] += offsetCurrPos;
                  connection_sides_cost[currConnection]["used"][currSide] += 1;
                  prevPos[1] -= offsetCurrPos;

                  add = `conn-${currConnection} side-${currSide} cost-${connection_sides_cost[currConnection]["used"][currSide]} offset-${offsetCurrPos}`;
                }
                
                
                return (
                  <ConnectionLine className={add} key={index + 100} delay={index * (workflow_creation_time / (Object.keys(workflowData.workflow_connections).length - 1))} fromPos={[prevPos[0], prevPos[1]]} toPos={[currPos[0], currPos[1]]} />
                );
              })
            );
        })()}
        <div className="bg-black/90 w-[100vw] h-[100vh] absolute top-0 left-0"></div>
      </div>
    </>
  );
}
