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
import FourthModuleScreen from "../pages/FourthModuleScreen";
import ModuleScreen from "../pages/ModuleScreen";
import WebMinsaScreen from "../pages/WebMinsaScreen";
import StatisticsScreen from "../pages/StatisticsScreen";

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

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setLoggedIn(false);
      setRole("");

    } catch (error) {

      console.error("Error al cerrar sesión:", error);
    }
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
      <Route path="/modules">
        {role === "minsa" && isLoggedIn ? <ModuleScreen onSignOut={handleSignOut} /> : <LoginScreen />}
      </Route>
      <Route path="/statistics">
        <StatisticsScreen onSignOut={handleSignOut} />
      </Route>
      <Route path="/webminsa">
        <WebMinsaScreen onSignOut={handleSignOut} />
      </Route>
      <Route path="/firstmodule">
        <FirstModuleScreen onSignOut={handleSignOut} />
      </Route>
      <Route path="/secondmodule">
        <SecondModuleScreen onSignOut={handleSignOut} />
      </Route>
      <Route path="/thirdmodule">
        <ThirdModuleScreen onSignOut={handleSignOut} />
      </Route>
      <Route path="/fourthmodule">
        <FourthModuleScreen onSignOut={handleSignOut} />
      </Route>

    </Switch>
  );
};

export default AppRouter;
