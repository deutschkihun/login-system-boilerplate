import React, { Suspense, lazy } from "react";
import "./App.css";
import { Switch, Route as Router, BrowserRouter } from "react-router-dom";
import Wrapper from "./hoc/auth";
import { LoginPage } from "./components/LoginPage/loginPage";
import { SuccessPage } from "./components/SuccessPage/successPage";
import { MenuPage } from "./components/MenuPage/menuPage";
import { SettingPage } from "./components/SettingPage/settingPage";
import { SuccessChangePage } from "./components/SuccessPage/successChnagePage";

const RegisterPage = lazy(() =>
  import("./components/RegisterPage/registerPage").then(({ RegisterPage }) => ({
    default: RegisterPage,
  }))
);

const ErrorPage = lazy(() =>
  import("./components/ErrorPage/errorPage").then(({ ErrorPage }) => ({
    default: ErrorPage,
  }))
);

const ForgotPage = lazy(() =>
  import("./components/ForgotPage/forgotPage").then(({ ForgotPage }) => ({
    default: ForgotPage,
  }))
);

const ForgotEmail = lazy(() =>
  import("./components/ForgotPage/forgotEmail").then(({ ForgotEmail }) => ({
    default: ForgotEmail,
  }))
);

const ForgotPassword = lazy(() =>
  import("./components/ForgotPage/forgotPassword").then(
    ({ ForgotPassword }) => ({
      default: ForgotPassword,
    })
  )
);

const ResetPassword = lazy(() =>
  import("./components/ResetPage/resetPassword").then(({ ResetPassword }) => ({
    default: ResetPassword,
  }))
);

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
