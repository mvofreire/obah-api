import React, { useState } from "react";
import {
  Form,
  Divider,
  Typography,
  Alert,
  Row,
  Col,
  Input,
  Button,
} from "antd";
import { recoveryMyPassword } from "services/login";
import useStyles from "./styles";

const { Title } = Typography;

const ForgotPassword = ({}) => {
  const classes = useStyles();
  const [emailSent, setEmailSent] = useState(false);

  const onFinish = async ({ email }) => {
    try {
      await recoveryMyPassword(email);
      setEmailSent(true);
    } catch (error) {
      setEmailSent(false);
    }
  };

  return (
    <Form className={classes.root} onFinish={onFinish}>
      <Title level={2}>Auxílio de senha</Title>
      <Divider />
      <Row>
        <span className={classes.info}>
          Auxílio de senha Insira o endereço de e-mail ou o número do telefone
          celular associado à sua conta Obah.
        </span>
      </Row>
      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          { required: true, message: "Por favor! insira seu E-mail." },
          { type: "email" },
        ]}
      >
        <Input disabled={emailSent} placeholder="joao@gmail.com" />
      </Form.Item>
      {!!emailSent && (
        <Alert
          type="success"
          showIcon
          message="Email enviado com sucesso"
          description="Abra seu email e recupere sua senha!"
          style={{ marginBottom: 30 }}
        />
      )}
      <Row justify="center">
        <Form.Item>
          <Button
            disabled={emailSent}
            shape="round"
            type="primary"
            htmlType="submit"
          >
            Continuar
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default ForgotPassword;
