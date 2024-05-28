// @ts-nocheck 
import { create } from 'zustand'
import data from './segmentConfig'

const useMyStore = create((set) => ({
  segmentJson: data,
  setSegmentJson: (newData) => set({ segmentJson: newData }),
  key: 0,
  setKey: (newKey) => set({ key: newKey }),
}))

export default useMyStore