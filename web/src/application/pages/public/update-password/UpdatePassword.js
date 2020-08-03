import React, { useState } from "react";
import { Form, Divider, Typography, Alert, Row, Input, Button } from "antd";
import { updateMyPassword } from "services/login";
import useStyles from "./styles";

const { Title } = Typography;

const UpdatePassword = ({ match }) => {
  const { token } = match.params;
  const [changed, setChanged] = useState(false);
  const classes = useStyles();

  const onFinish = async (values) => {
    try {
      const { password, confirm } = values;
      await updateMyPassword(token, password, confirm);
      setChanged(true);
    } catch (error) {
      console.log(error);
      setChanged(false);
    }
  };

  return (
    <Form layout="vertical" className={classes.root} onFinish={onFinish}>
      <Title level={2}>Alteração de senha</Title>
      <Divider />
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Por favor insira sua nova senha!",
          },
        ]}
        hasFeedback
      >
        <Input.Password disabled={changed} />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Confirme sua Senha"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Por favor confirme a sua senha!",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                "The two passwords that you entered do not match!"
              );
            },
          }),
        ]}
      >
        <Input.Password disabled={changed} />
      </Form.Item>
      {!!changed && (
        <Alert
          type="success"
          showIcon
          message="Senha Atualizada"
          description="Tudo certo! Agora você precisa realizar seu login"
          style={{ marginBottom: 30 }}
        />
      )}
      <Row justify="center">
        <Form.Item>
          {!changed && (
            <Button shape="round" type="primary" htmlType="submit">
              Atualizar Senha
            </Button>
          )}
          {changed && (
            <Button shape="round" href="/login" type="link">
              Vamos para o Login
            </Button>
          )}
        </Form.Item>
      </Row>
    </Form>
  );
};

export default UpdatePassword;
