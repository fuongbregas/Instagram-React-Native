import { USER_STATE_CHANGE } from '../constants/index';
import firebase from 'firebase/compat/app';

export const fetchUser = () => {
    return ((dispatch) => {
        firebase.firestore()
            .collection("user")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    dispatch({
                        type : USER_STATE_CHANGE,
                        currentUser : snapshot.data(),
                    })
                }
                else {
                    console.error("Not exist");
                }
            });
    });
}