import React, { useState } from "react";
import { Form } from "antd";
import { Loading } from "components";
import { doLogin } from "services/login";
import { checkIfEmailExists } from "services/client";
import { useAppContext } from "contexts/app";
import useStyles from "./styles";

import StepUsername from "./StepUsername";
import StepPassword from "./StepPassword";

const Steps = {
  username: "username",
  password: "password",
};

const Login = ({ history }) => {
  const [form] = Form.useForm();
  const { setUserSession } = useAppContext();

  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(Steps.username);
  const [showLoading, setShowLoading] = useState(false);

  const classes = useStyles();

  const onFinish = (credentials) => {
    setShowLoading(true);
    setTimeout(async () => {
      try {
        const data = await doLogin({
          ...credentials,
          email,
        });
        setUserSession(data);
        history.push("/admin/dashboard");
      } catch (error) {
        setErrors({
          password: "Sua senha está incorreta",
        });
      } finally {
        setShowLoading(false);
      }
    }, 1000);
  };

  const onFinishFailed = (errors) => {
    console.log(errors);
  };

  const validateEmailAndGoToPassword = () => {
    setShowLoading(true);

    setTimeout(async () => {
      try {
        setErrors({});
        //validate if email is set
        const { email } = await form.validateFields();
        // check if email exists in db
        await checkIfEmailExists(email);
        setEmail(email);
        changeStep(Steps.password);
      } catch (error) {
        setShowLoading(false);
        setErrors({
          email:
            "Não encontramos uma conta associada a este endereço de e-mail",
        });
      }
    }, 300);
  };

  const changeStep = (step) => {
    setShowLoading(true);
    setTimeout(() => {
      setStep(step);
      setShowLoading(false);
    }, 500);
  };

  return (
    <Form
      form={form}
      className={classes.root}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Loading show={showLoading}>
        {step === Steps.username && (
          <StepUsername
            error={errors.email}
            validateEmailAndGoToPassword={validateEmailAndGoToPassword}
          />
        )}
        {step === Steps.password && (
          <StepPassword
            onClickBack={(_) => changeStep(Steps.username)}
            email={email}
            error={errors.password}
          />
        )}
      </Loading>
    </Form>
  );
};

export default Login;
