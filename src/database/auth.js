import { auth, firestore } from "database/firebase";
import errors from "database/errors";
import moment from "moment-timezone";
import { setResearcherClaim } from "./cloud";

const getErrorMessage = ({ code }) => {
  return { email: "", password: "", ...errors[code] };
};

const setLocalUserExists = () => {
  localStorage.setItem("exists", true);
};

const setLocalUserDelete = () => {
  localStorage.setItem("exists", false);
};

const signup = async (name, email, password) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    const timezone = moment.tz.guess();

    await Promise.all([
      setResearcherClaim(),
      user.sendEmailVerification(),
      firestore
        .collection("researchers")
        .doc(user.uid)
        .set({
          name,
          timezone,
          organization: "",
          background: "",
          preferences: {
            timezone: {
              autodetect: true,
            },
            notifications: {
              email: false,
              phone: false,
              categories: {
                account: true,
                studies: true,
                participants: true,
                meetings: true,
                messages: true,
              },
            },
          },
        }),
    ]);

    setLocalUserExists();
    return user;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

const signin = async (email, password) => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    setLocalUserExists();
    return user;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

const signout = async () => {
  return auth.signOut();
};

const deleteAccount = async (email, password) => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    await firestore.collection("researchers").doc(user.uid).delete();
    await user.delete();
    setLocalUserDelete();
  } catch (error) {
    throw getErrorMessage(error);
  }
};

const forgotPassword = async (email) => {
  return auth.sendPasswordResetEmail(email);
};

const resetPassword = async (actionCode, password) => {
  try {
    const [email] = Promise.all([
      await auth.verifyPasswordResetCode(actionCode),
      await auth.confirmPasswordReset(actionCode, password),
    ]);
    return signin(email, password);
  } catch (error) {
    throw getErrorMessage(error);
  }
};

const changePassword = async (password, newPassword) => {
  try {
    const { email } = await auth.currentUser;
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    return user.updatePassword(newPassword);
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export { signin, signup, signout, deleteAccount, forgotPassword, resetPassword, changePassword };
