"use client";
import "@uploadthing/react/styles.css";
import { UploadButton } from "@/app/utils/uploadthings";
import { Spinner } from "@nextui-org/react";
import React from "react";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { EyeSlashFilledIcon } from "../components/ui/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../components/ui/EyeFilledIcon";
export default function Signin() {
  const [selected, setSelected] = React.useState("login");
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
    image: "",
    location: "",
    occupation: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signin", user);
      console.log(response.data.message, response.data);
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleGuest = async () => {
    const guest = {
      email: "one@gmail.com",
      password: "one",
    };
    setUser({ ...user, email: guest.email, password: guest.password });
    await onLogin();
  };
  //register logic
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signup success", response.data);
      setSelected("login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full  items-center min-w-full bg-black">
      <Card className="max-w-full w-[340px] ">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={(newKey: any) => setSelected(newKey)}
          >
            <Tab key="login" title="Login">
              <form className="flex flex-col gap-4" onSubmit={onLogin}>
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <Input
                  label="Password"
                  isRequired
                  placeholder="Enter your password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  className="max-w-xs"
                />
                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                    Sign up
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" onClick={onLogin}>
                    {loading ? <Spinner color="warning" /> : "Login"}
                  </Button>
                  <Button fullWidth color="primary" onClick={handleGuest}>
                    Guest Login
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form className="flex flex-col gap-4 ">
                <Input
                  isRequired
                  label="Name"
                  placeholder="Enter your name"
                  type="text"
                  required
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                />
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <Input
                  label="Password"
                  isRequired
                  placeholder="Enter your password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  className="max-w-xs"
                />
                <Input
                  isRequired
                  label="Occupation"
                  placeholder="Enter your Occupation"
                  type="text"
                  value={user.occupation}
                  onChange={(e) =>
                    setUser({ ...user, occupation: e.target.value })
                  }
                />
                <Input
                  isRequired
                  label="Location"
                  placeholder="Enter your Location"
                  type="text"
                  value={user.location}
                  onChange={(e) =>
                    setUser({ ...user, location: e.target.value })
                  }
                />
                <Input
                  type="button"
                  label="Profile"
                  placeholder="Choose"
                  id="upload-btn"
                ></Input>
                <div id="upload-btn">
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res: any) => {
                      // Do something with the response below console is useful
                      console.log("Files: ", res[0].url);
                      //we have response we can store the url in mongodb
                      toast.success("Upload Completed");
                      setUser({ ...user, image: res[0].url });
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      toast.error(`ERROR! ${error.message}`);
                    }}
                  />
                </div>

                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}></Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" onClick={onSignup}>
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
