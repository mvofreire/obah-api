import React, { useState, useEffect } from "react";
import { Row, Form, Modal, Input, DatePicker, Col, Button } from "antd";
import { Icon } from "components";
import moment from "moment";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const OfferCreate = ({
  handleCreate,
  handleUpdate,
  model = {},
  handleClose,
}) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [dates, setDates] = useState([]);

  const onFinish = (values) => {
    const { period, ...rest } = values;
    const [start, end] = period;

    const _model = {
      ...rest,
      start_date: start.toDate(),
      end_date: end.toDate(),
    };

    if (!!model.id) {
      !!handleUpdate && handleUpdate(model.id, _model);
    } else {
      !!handleCreate && handleCreate(_model);
    }

    hideModal();
  };

  useEffect(() => {
    if (model.id) {
      form.setFieldsValue({
        title: model.title,
        subtitle: model.subtitle,
        period: [moment(model.start_date), moment(model.end_date)],
      });
      showModal();
    }
  }, [model]);

  const showModal = () => setVisible(true);
  const hideModal = () => {
    form.resetFields();
    handleClose();
    setVisible(false);
  };

  const disabledDate = (current) => {
    if (!dates || dates.length === 0) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") > 7;
    const tooEarly = dates[1] && dates[1].diff(current, "days") > 7;
    return tooEarly || tooLate;
  };

  return (
    <>
      <Row type="flex" style={{ marginBottom: 20 }} justify="end">
        <Col xs>
          <Button
            size="large"
            type="primary"
            icon={<Icon name="TagsOutlined" />}
            onClick={showModal}
          >
            Criar Promoção
          </Button>
        </Col>
      </Row>
      <Modal
        title="Criar Nova Promoção"
        okText="Salvar"
        cancelText="Fechar"
        visible={visible}
        width={965}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onFinish(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
        onCancel={hideModal}
      >
        <Form form={form} layout="vertical" initialValues={{}}>
          <Form.Item
            label="Titulo"
            name="title"
            rules={[{ required: true, message: "Por favor! Insira um titulo" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Sub titulo" name="subtitle">
            <Input />
          </Form.Item>
          <Form.Item label="Descrição" name="description">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Período de validade"
            name="period"
            rules={[
              {
                required: true,
                message: "Por favor! Insira o período de validade.",
              },
            ]}
          >
            <RangePicker
              disabled={[!!model.id, !!model.id]}
              style={{ width: "100%" }}
              disabledDate={disabledDate}
              placeholder={["Início", "Fim"]}
              onCalendarChange={(value) => {
                setDates(value);
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default OfferCreate;
