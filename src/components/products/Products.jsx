import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, MedicineBoxOutlined } from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons";

import {
  CREATE_PRODUCT,
  GET_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../../redux/actions/types";
import { deleteAction } from "./../../redux/actions/deleteAction";
import { getAction } from "../../redux/actions/readAction";
import { createAction } from "../../redux/actions/createAction";
import { updateAction } from "./../../redux/actions/updateAction";
import { BreadcrumbHelpers, FieldHelpers } from "../../utility/Helpers";

export const Products = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { data } = useSelector((state) => state.productReducer);

  const [createVisible, setCreateVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [selectedEditID, setselectedEditID] = useState(null);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const onChange = async (e) => {
    setTitle(e.target.form[1].value);
    setPrice(e.target.form[2].value);
    setDescription(e.target.form[3].value);
    setCategory(e.target.form[4].value);
  };

  useEffect(() => {
    dispatch(getAction("products", GET_PRODUCT));
  }, [dispatch]);

  const showModal = (id) => {
    setOpen(true);
    setSelectedID(id);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    dispatch(deleteAction("products", DELETE_PRODUCT, selectedID));
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      dispatch(getAction("products", GET_PRODUCT));
    }, 1000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const showEditModal = (data) => {
    setEditVisible(true);
    setselectedEditID(data);
    setTitle(data.title);
    setPrice(data.price);
    setDescription(data.description);
    setCategory(data.category.name);
  };

  const editHandleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setEditVisible(false);
        dispatch(
          updateAction("products", UPDATE_PRODUCT, selectedEditID.id, {
            ...values,
            images: ["https://i.imgur.com/keVCVIa.jpeg"],
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editHandleCancel = () => {
    setEditVisible(false);
  };

  const showCreateModal = () => {
    setPrice("");
    setCategory("");
    setTitle("");
    setDescription("");
    setCreateVisible(true);
  };

  const createHandleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setCreateVisible(false);
        dispatch(
          createAction("products", CREATE_PRODUCT, {
            title: values.title,
            price: values.price,
            description: values.description,
            categoryId: values.category,
            images: ["https://i.imgur.com/keVCVIa.jpeg"],
          })
        );
        dispatch(getAction("products", GET_PRODUCT));
        setTitle("");
        setPrice("");
        setDescription("");
        setCategory("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createHandleCancel = () => {
    setCreateVisible(false);
  };

  const columns = [
    { title: "Name", dataIndex: "title", key: "title" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text, record) => {
        return <h4>{text.name}</h4>;
      },
    },
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (text, record) => {
        let removed = text[0].replace('["', "");
        let removed2 = removed.slice(0, removed.length - 2);
        return (
          <div>
            <img
              style={{ width: "100px" }}
              className="tableImg"
              src={removed2}
              alt={"rasm yo"}
            />
          </div>
        );
      },
    },
    {
      title: (
        <>
          <Button type="primary" onClick={showCreateModal}>
            <MedicineBoxOutlined />
          </Button>
          <Modal
            title={"Yaratish"}
            visible={createVisible}
            onOk={createHandleOk}
            onCancel={createHandleCancel}
            okText={"yaratish"}
            cancelText={"bekor qilish"}
            htmlType="submit"
          >
            <Form
              form={form}
              layout="vertical"
              name="form_in_modal"
              initialValues={{
                modifier: "public",
              }}
              fields={[
                {
                  name: ["title"],
                  value: title,
                },
                {
                  name: ["price"],
                  value: price,
                },
                {
                  name: ["description"],
                  value: description,
                },
                {
                  name: ["category"],
                  value: category,
                },
                {
                  name: ["images"],
                  value: "",
                },
              ]}
            >
              <input type="file" name="attachment" onChange={onChange} />
              <FieldHelpers
                label="Name"
                name="title"
                message="Iltimos Name qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Price"
                name="price"
                message="Iltimos Price qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Description"
                name="description"
                message="Iltimos Description qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Category ID"
                name="category"
                message="Iltimos Category qatorini yo'ldiring!"
              />
            </Form>
          </Modal>
        </>
      ),
      dataIndex: "",
      key: "x",
      render: (text) => (
        <>
          <Button type="danger" onClick={(e) => showModal(text.id)}>
            <DeleteOutlined />
          </Button>
          <Button type="primary" onClick={(e) => showEditModal(text)}>
            <EditOutlined />
          </Button>
          <Modal
            title={"O'chirish"}
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText={"o'chirish"}
            okType={"danger"}
            cancelText={"bekor qilish"}
          >
            <h2>Haqiqatan ham bu ma'lumotni o'chirib tashlamoqchimisiz?</h2>
            <p>
              Agar siz ushbu ma'lumotlarni o'chirib tashlasangiz, qayta
              tiklanmaydi
            </p>
          </Modal>
          <Modal
            title={"Tahrirlash"}
            visible={editVisible}
            onOk={editHandleOk}
            onCancel={editHandleCancel}
            okText={"tahrirlash"}
            cancelText={"bekor qilish"}
          >
            <Form
              form={form}
              layout="vertical"
              name="name"
              initialValues={{
                modifier: "public",
              }}
              fields={[
                {
                  name: ["title"],
                  value: title,
                },
                {
                  name: ["price"],
                  value: price,
                },
                {
                  name: ["description"],
                  value: description,
                },
                {
                  name: ["category"],
                  value: category,
                },
              ]}
            >
              <input type="file" value={""} name="images" onChange={onChange} />
              <FieldHelpers
                label="Name"
                name="title"
                message="Iltimos Nom qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Price"
                name="price"
                message="Iltimos price qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Description"
                name="description"
                message="Iltimos Description qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Category ID"
                name="category"
                message="Iltimos Category ID qatorini yo'ldiring!"
              />
            </Form>
          </Modal>
        </>
      ),
    },
  ];

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <BreadcrumbHelpers to={"product"} from={"home"} />

        <Table columns={columns} dataSource={data} />
      </Content>
    </>
  );
};
