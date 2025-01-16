import { atom } from "jotai";

export interface audio {
    name: string
    date: string
    id: number
    duration: number
    uri: string
    amountOfParticipants: number
}

export const audios = atom<audio[]>([])