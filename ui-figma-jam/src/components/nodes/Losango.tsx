import { Handle, NodeProps, Position } from "@xyflow/react";

export function Losango(props: NodeProps) {
    return (
        <div className="bg-violet-500 rounded size-[200px] rotate-45  flex items-center  justify-center" >
            <p className="text-white -rotate-45">ACT Digital</p>
            <Handle
                id="right"
                type="source" 
                position={Position.Bottom}
                className="-right-3 size-3 bg-blue-500/80"
            />

            <Handle
                id="left"
                type="source" 
                position={Position.Left}
                className="-left-3 size-3 bg-blue-500/80"
            />

            <Handle
                id="top"
                type="source" 
                position={Position.Top}
                className="-top-3 size-3 bg-blue-500/80"
            />

            <Handle
                id="bottom"
                type="source" 
                position={Position.Bottom}
                className="-bottom-3 size-3 bg-blue-500/80"
            />
        </div>
    )
}