import { create } from "zustand";

export const useSideBar=create((set)=>({
    collapsed:false,
    onExpanded:()=>set(()=> ({collapsed:false})),
    onCollapsed:()=>set(()=> ({collapsed:true})),
}))