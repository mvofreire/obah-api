import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Checkbox, Space, Divider, Button, Row, Col } from "antd";
import { LoginError } from "./components";

const StepPassword = ({ onClickBack, email, error }) => {
  return (
    <>
      {error && <LoginError description={error} />}
      <Space size="large">
        <strong>{email}</strong>
        <Button type="link" onClick={onClickBack}>
          Alterar
        </Button>
      </Space>
      <Divider />
      <Form.Item
        label="Senha"
        name="password"
        rules={[{ required: true, message: "Por favor! insira sua senha!" }]}
      >
        <Input.Password placeholder="******" />
      </Form.Item>
      <Row justify="space-between" align="top">
        <Col span={12}>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Mantenha-me conectado</Checkbox>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Row justify="end">
            <Link to="/forgotpassword">Esqueci a senha</Link>
          </Row>
        </Col>
      </Row>
      <Form.Item>
        <Row justify="center" align="middle">
          <Button
            type="primary"
            shape="round"
            size="large"
            htmlType="submit"
            style={{ width: 200 }}
          >
            Fazer Login
          </Button>
        </Row>
      </Form.Item>
    </>
  );
};

export default StepPassword;
