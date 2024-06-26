import { IPreferencesWorkout } from "../shared/interfaces/IPreferencesWorkout";

export default function findCurrentPreference(preferences: IPreferencesWorkout[], id: string) {
    const indexPreference = preferences.findIndex(preferences => {
        return preferences.id === Number(id)
    })
    return preferences[indexPreference]
}