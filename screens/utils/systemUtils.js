import { Alert, Platform, ToastAndroid } from "react-native";
const isIos = Platform.OS == "ios"

export const ShowToast = (msg, type, toastFinished) => {
    isIos ?
        Alert.alert(type == 1 ? "Success" : "Error", msg)
        :
        ToastAndroid.showWithGravity(
            msg,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
        );
    toastFinished && toastFinished()
}

export const ShowAlert = (msg, type, alertFinished ) => {
    Alert.alert(type == 1 ? "Success" : "Message", msg, [
        {
            text: 'OK', onPress: () => {
                alertFinished && alertFinished()
            }
        },
    ])

}

export const debugPrint = (data) => {
    console.log(JSON.stringify(data, undefined, 2))
}

export const AddDays = (date=new Date(), days) => new Date(date.getTime() + (days * 24 * 60 * 60 * 1000));