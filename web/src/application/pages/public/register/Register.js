import React from "react";
import { doRegister } from "services/register";
import { useAppContext } from "contexts/app";
import useStyles from "./styles";
import RegisterForm from "./RegisterForm";
import { Parallax, Background } from "react-parallax";
import imgPeopleHavingFun from "assets/images/people-having-fun-big.jpg";

const RegistrationPage = ({ history }) => {
  const { setUserSession } = useAppContext();
  const classes = useStyles();

  const onFinish = async (user) => {
    try {
      const session = await doRegister(user);
      setUserSession(session);
      history.push("/admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = async (err) => {
    console.log(err);
  };

  return (
    <Parallax strength={400} style={{ maxWidth: 1200, margin: "auto" }}>
      <RegisterForm
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        formClassName={classes.root}
        submitClassName={classes.btnRegister}
      />
      <Background className={classes.image}>
        <img src={imgPeopleHavingFun} alt="people having fun" />
      </Background>
    </Parallax>
  );
};

export default RegistrationPage;
