import React, { Suspense } from "react";
import { Switch, Route as Router, BrowserRouter } from "react-router-dom";
import Wrapper from "./hoc/auth";
import { LoginPage } from "./pages/loginPage";
import { SuccessPage } from "./pages/successPage";
import { MenuPage } from "./pages/menuPage";
import { SettingPage } from "./pages/settingPage";
import { ErrorPage } from "./pages/errorPage";
import { RegisterPage } from "./pages/registerPage";
import { ForgotPage } from "./pages/forgotPage";
import { ForgotEmail } from "./pages/forgotEmailPage";
import { ForgotPassword } from "./pages/forgotPasswordPage";
import { ResetPassword } from "./pages/resetPassword";

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
              component={SuccessPage}
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
