import React from "react";
import {
  Form,
  Input,
  Checkbox,
  Button,
  Row,
  Col,
  Card,
  Typography,
} from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;
export default ({
  formClassName,
  submitClassName,
  onFinish,
  onFinishFailed,
}) => (
  <Form
    className={formClassName}
    layout="vertical"
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
  >
    <Card style={{ width: "100%", background: "#ffffffb3" }}>
      <Title level={2}>Cadastre seu restaurante</Title>
      <Title level={4}>
        Quem pensa em crescer, tá no Obah. Entre e ganhe 1 mês de mensalidade
        grátis!
      </Title>
      <Form.Item
        label="Nome"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Senha"
        rules={[
          {
            required: true,
            message: "Por favor, insira sua senha!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Por favor, confirma sua senha!",
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
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject("Should accept agreement"),
          },
        ]}
      >
        <Checkbox>
          Eu li e concordo com o <Link to="/agreement">termos de uso</Link>
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Row gutter={[20, 20]} direction="horizontal">
          <Col xs={24} md={24}>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              block={true}
              className={submitClassName}
            >
              Register
            </Button>
          </Col>
          <Col xs={24} md={24}>
            <Row justify="center" align="middle">
              <span>Ou</span>
            </Row>
          </Col>
          <Col xs={24} md={24}>
            <Row justify="center" align="middle">
              <Link to="/login">voltar para Login</Link>
            </Row>
          </Col>
        </Row>
      </Form.Item>
    </Card>
  </Form>
);
