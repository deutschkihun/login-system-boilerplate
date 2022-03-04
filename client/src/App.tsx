import React, { Suspense } from "react";
import "./App.css";
import { Switch, Route as Router, BrowserRouter } from "react-router-dom";
import Wrapper from "./hoc/auth";
import { LoginPage } from "./components/loginPage";
import { SuccessPage } from "./components/successPage";
import { MenuPage } from "./components/menuPage";
import { SettingPage } from "./components/settingPage";
import { ErrorPage } from "./components/errorPage";
import { RegisterPage } from "./components/registerPage";
import { ForgotPage } from "./components/forgotPage";
import { ForgotEmail } from "./components/forgotEmail";
import { ForgotPassword } from "./components/forgotPassword";
import { ResetPassword } from "./components/resetPassword";
import { SuccessChangePage } from "./components/successChangePage";

/*const RegisterPage = lazy(() =>
  import("./components/RegisterPage/registerPage").then(({ RegisterPage }) => ({
    default: RegisterPage,
  }))
);*/

//null    =>  anyone
//true    =>  only for login user
//false   =>  only for non login user
const App = (): JSX.Element => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Router exact path="/register" component={RegisterPage} />
            <Router exact path="/" component={Wrapper(LoginPage, false)} />
            <Router
              exact
              path="/success"
              component={Wrapper(SuccessPage, false)}
            />
            <Router
              exact
              path="/successchange"
              component={Wrapper(SuccessChangePage, true)}
            />
            <Router exact path="/menu" component={Wrapper(MenuPage, true)} />
            <Router exact path="/forgot" component={ForgotPage} />
            <Router exact path="/forgot/email" component={ForgotEmail} />
            <Router exact path="/forgot/password" component={ForgotPassword} />
            <Router exact path="/reset/password" component={ResetPassword} />
            <Router
              exact
              path="/setting"
              component={Wrapper(SettingPage, true)}
            />
            <Router path="*" component={ErrorPage} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
