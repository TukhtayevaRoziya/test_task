import { useEffect } from "react";
import { Button, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../redux/actions/authAction";
import { FieldHelpers } from "./../../utility/Helpers";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
    console.log(isAuthenticated)
  }, [isAuthenticated, navigate]);

  const onFinish = (values) => {
    dispatch(login(values));
    dispatch()
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{height:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>

    <Form style={{width:'600px'}}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <FieldHelpers
        label="Username"
        name="username"
        message="Iltimos Username qatorini yo'ldiring!"
      />
      <FieldHelpers
        label="Parol"
        name="password"
        message="Iltimos parol nomi qatorini yo'ldiring!"
        inp={false}
      />

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Kirish
        </Button>
      </Form.Item>
    </Form>
    </div>

  );
};

export default Login;
