import { VideoModel } from './videoModel'

export interface WorkoutModel {
  name: string
  force: string
  level: string
  mechanic: string
  equipment: string
  primaryMuscles: string[]
  secondaryMuscles: string[]
  instructions: string[]
  category: string
  video?: VideoModel
}
