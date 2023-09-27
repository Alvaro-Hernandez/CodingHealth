import { useState, useEffect } from "react";
import { Route, Switch } from "wouter";
import SplashScreen from "../pages/SplashScreen";
import LoginScreen from "../pages/LoginScreen";
import HomeScreen from "../pages/HomeScreen";
import AdminScreen from "../pages/AdminScreen";
import FirstModuleScreen from "../pages/FirstModuleScreen";
import { auth, db } from "../services/FirebaseServices";
import SecondModuleScreen from "../pages/SecondModuleScreen";
import ThirdModuleScreen from "../pages/ThirdModuleScreen";
import FourthModule from "../pages/FourthModule";

const AppRouter = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const userDoc = await db.collection("usuarios").doc(currentUser.uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setRole(userData.role);
          setLoggedIn(true);
        }
      } else {
        setRole("");
        setLoggedIn(false);
      }
      setInitialCheckDone(true);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    setLoggedIn(false);
    setRole("");
    // Aquí también puedes agregar lógica para cerrar sesión en Firebase si lo deseas
  }

  if (!initialCheckDone) {
    return null;
  }

  return (
    <Switch>
      <Route path="/" component={() => <SplashScreen />} />
      <Route path="/login">
        {!isLoggedIn ? <LoginScreen /> : role === "admin" ? <AdminScreen onSignOut={handleSignOut} /> : <LoginScreen />}
      </Route>
      <Route path="/home">
        {role === "minsa" && isLoggedIn ? <HomeScreen onSignOut={handleSignOut} /> : <LoginScreen />}
      </Route>
      <Route path="/admin">
        {role === "admin" && isLoggedIn ? <AdminScreen onSignOut={handleSignOut} /> : <LoginScreen />}
      </Route>
      <Route path="/firstmodule" component={FirstModuleScreen} />
      <Route path="/secondmodule" component={SecondModuleScreen} />
      <Route path="/thirdmodule" component={ThirdModuleScreen} />
      <Route path="/fourthmodule" component={FourthModule} />

    </Switch>
  );
};

export default AppRouter;
