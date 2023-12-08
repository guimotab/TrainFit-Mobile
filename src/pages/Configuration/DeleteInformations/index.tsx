import { StyleSheet, Text, View, Pressable, ScrollView, Alert } from "react-native"
import { font, cor } from "../../../utils/presetStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useUpdatePreferences } from "../../../state/hooks/useUpdatePreferences";
import { useUpdateTables } from "../../../state/hooks/useUpdateTables";
import { IPreferencesWorkout } from "../../../shared/interfaces/IPreferencesWorkout";

const DeleteInformations = () => {
    const navigation = useNavigation()
    const setPreferences = useUpdatePreferences()
    const setTables = useUpdateTables()

    async function deleteAll() {
        try {
            await AsyncStorage.clear();
            Alert.alert('Dados Limpos', 'Todos os dados armazenados foram removidos.');
            navigation.navigate("Welcome")
        } catch (error) {
            console.error('Erro ao limpar dados:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao limpar os dados armazenados.');
        }
        setPreferences({initializer: false, preferencesWorkout: [] as IPreferencesWorkout[]})
        setTables([])
    }
    return (
        <View>
            < View style={styles.sectionView} >
                <View>
                    <Text style={styles.textTrain}>Delete Todas Informações</Text>
                    <Text style={{ color: cor.gray200 }}>Não há volta! Salve suas informações antes de excluir!</Text>
                </View>
                <View style={styles.viewSave}>
                    <Text style={styles.buttonDelete}
                        onPress={event => deleteAll()}>
                        Apagar Tudo
                    </Text>
                </View>
            </View >
        </View>
    )
}
const styles = StyleSheet.create({
    sectionView: {
        display: "flex",
        paddingTop: 15,
        gap: 15,
    },
    textTrain: {
        fontWeight: font.bold,
        fontSize: 20,
        color: cor.gray200
    },
    viewSave: {
        display: "flex",
        flexDirection: "row",
        color: cor.gray200,
        fontWeight: font.medium,
        fontSize: 16,
        borderRadius: 8
    },
    buttonDelete: {
        fontWeight: font.semibold,
        fontSize: 15,
        borderColor: cor.gray600,
        borderWidth: 1,
        paddingHorizontal: 13,
        paddingVertical: 6,
        color: cor.erro,
        borderRadius: 6,
        backgroundColor: cor.gray800
    },

});
export default DeleteInformations