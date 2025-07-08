interface Props {
  blockName: string,
  blockValue: string,
  y_pos: number,
  x_pos: number,
}

export default function WorkflowBlock(props: Props) {
  return <div
          className={`${props.blockName} block-${props.blockName} absolute opacity-0 -translate-x-1/2 -translate-y-1/2 bg-black w-40 text-center flex justify-center items-center h-20`}
          style={{ top: props.y_pos + "%", left: props.x_pos + "%" }}
        >
          {props.blockValue}
        </div>;
}