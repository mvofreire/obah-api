import React from "react";
import { Space, Tag, Popconfirm } from "antd";
import { DataTable, Icon } from "components";
import { formatToPTBR } from "util/date";

const OfferTable = ({ data, handleDelete, handleEdit }) => {
  return (
    <DataTable
      data={data}
      columns={[
        {
          title: "Title",
          dataIndex: "title",
          key: "title",
        },
        {
          title: "SubTitle",
          dataIndex: "subtitle",
          key: "subtitle",
        },
        {
          key: "date",
          title: "Data",
          render: (record) => {
            return (
              <Space>
                <Tag icon={<Icon name="CalendarOutlined" />}>
                  {formatToPTBR(record.start_date)}
                </Tag>
                <Tag icon={<Icon name="CalendarOutlined" />}>
                  {formatToPTBR(record.end_date)}
                </Tag>
              </Space>
            );
          },
        },
        {
          key: "actions",
          title: "Ações",
          width: 100,
          fixed: "right",
          render: (offer) => (
            <Space direction="horizontal">
              <Icon
                name="ShareAltOutlined"
                style={{ cursor: "pointer" }}
                size={20}
              />
              <Popconfirm
                title="Deseja realmente deletar esse?"
                onConfirm={handleDelete.bind(null, offer)}
              >
                <Icon
                  name="DeleteFilled"
                  style={{ cursor: "pointer" }}
                  size={20}
                />
              </Popconfirm>
              <Icon
                name="EditOutlined"
                style={{ cursor: "pointer" }}
                size={20}
                onClick={handleEdit.bind(null, offer)}
              />
            </Space>
          ),
        },
      ]}
    />
  );
};

export default OfferTable;
