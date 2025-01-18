import {create} from 'zustand'
const useMapStore = create((set,get)=>({
   location:null,
   destination:null,
   setLocation:(location)=>{
      set({location:location})
   },
   setDestination:(destination)=>{
      set({destination:destination})
   }
}))
export default useMapStore