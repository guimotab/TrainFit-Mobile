import { IMuscleGroup } from "../shared/interfaces/IMuscleGroup"
import { IPreferences } from "../shared/interfaces/IPreferences"
import { IPreferencesWorkout } from "../shared/interfaces/IPreferencesWorkout"
import AsyncStorage from "@react-native-async-storage/async-storage"

export abstract class AsyncStorager {
    static async deleteInformation() {
        await AsyncStorage.clear();
    }
    static async getInformations() {
        // this.deleteInformation()
        let localStorageWorkout: IMuscleGroup[]
        if (await AsyncStorage.getItem("Workout") != null) {
            localStorageWorkout = JSON.parse(await AsyncStorage.getItem("Workout") as string)
        } else {
            const preferences = await this.getPreferences()
            localStorageWorkout = [] as IMuscleGroup[]
            let idCounter = 1
            if (preferences != null) {
                preferences.preferencesWorkout.forEach(preference => {
                    localStorageWorkout.push({
                        id: idCounter,
                        name: preference.nameMuscleGroup,
                        logo: "iconHalter",
                        information: [
                        ]
                    } as IMuscleGroup)
                    idCounter++
                })
            }
        }
        return localStorageWorkout
    }
    static async getPreferences() {
        let localStorageWorkout: IPreferences
        if (await AsyncStorage.getItem("PreferencesWorkout") != null) {
            localStorageWorkout = JSON.parse(await AsyncStorage.getItem("PreferencesWorkout") as string)
        } else {
            localStorageWorkout = {
                initializer: false,
                preferencesWorkout: [] as IPreferencesWorkout[]
            } as IPreferences
        }
        return localStorageWorkout
    }
    static async saveTables(tables: IMuscleGroup[]) {
        return await AsyncStorage.setItem("Workout", JSON.stringify(tables))
    }
    static async savePreferences(tables: IPreferences) {
        return await AsyncStorage.setItem("PreferencesWorkout", JSON.stringify(tables))
    }
}