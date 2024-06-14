import React from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate= useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center ">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your Information to create an account"} />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            label={"First Name"}
            placeholder="John"
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            label={"Last Name"}
            placeholder="Doe"
          />
          <InputBox
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            label={"Email"}
            placeholder="tavish@gmail.com"
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password"}
            placeholder="123456"
          />
          <div className="pt-4">
            <Button
              onClick={async() => {
             const response=  await axios.post("http://localhost:3002/api/v1/user/signup", {
                  userName: userName,
                  firstName: firstName,
                  lastName: lastName,
                  password: password,
                });
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }}
              label="Sign Up"
            />
          </div>

          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign In"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
