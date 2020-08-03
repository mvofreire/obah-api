import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Divider, Button, Row, Col } from "antd";
import { LoginError } from "./components";

const StepUsername = ({ validateEmailAndGoToPassword, error }) => {
  return (
    <>
      {error && <LoginError description={error} />}
      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          { required: true, message: "Por favor! insira seu E-mail." },
          { type: "email" },
        ]}
      >
        <Input placeholder="joao@gmail.com" />
      </Form.Item>
      <Row justify="center">
        <Button
          type="primary"
          shape="round"
          onClick={validateEmailAndGoToPassword}
          style={{ width: 200 }}
        >
          Continuar
        </Button>
      </Row>
      <Divider />
      <span>
        Ao continuar, você concorda com os Condições de Uso e com a Política de
        Privacidade do Obah.
      </span>
      <Divider />
      <Row justify="center">
        <Link to="/register">
          <Button type="link" style={{ width: 200 }}>
            Criar sua conta no Obah
          </Button>
        </Link>
      </Row>
    </>
  );
};

export default StepUsername;
