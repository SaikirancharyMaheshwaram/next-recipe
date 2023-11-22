"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Textarea,
} from "@nextui-org/react";
import { AiOutlineDelete } from "react-icons/ai";
import { MdAddShoppingCart } from "react-icons/md";
import { Code } from "@nextui-org/react";
import { Label } from "@radix-ui/react-dropdown-menu";
import "@uploadthing/react/styles.css";
import { UploadButton } from "@/app/utils/uploadthings";
import toast from "react-hot-toast";
import axios from "axios";
import { useAppSelector, AppDispatch } from "../redux/store";
import { setPosts } from "../redux/features/recipe-slice";
import { useDispatch } from "react-redux";

interface Todo {
  id: number;
  text: string;
}

export default function SharingRecipe() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isFollowed, setIsFollowed] = React.useState(false);
  const [inputText, setInputText] = React.useState<string>("");
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const currentUser = useAppSelector((state) => state.userSlice.user);
  const dispatch = useDispatch<AppDispatch>();
  const [recipe, setRecipe] = React.useState({
    name: "",
    ingredients: [{ id: 3, text: "" }],
    des: "",
    instructions: "",
    imageUrl: "",
    cookingTime: "",
    isTweet: false,
    userOwner: currentUser._id,
  });
  const handleDeleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };
  const addToIngredients = () => {
    toast.success("added");
    if (inputText.trim() !== "") {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputText.trim(),
      };

      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInputText("");
    }
  };
  //create the recipe
  const handleCreateRecipe = async (e: any) => {
    e.preventDefault();
    const response = await axios.post("/api/recipes/create-recipe", {
      name: recipe.name,
      ingredients: todos,
      des: recipe.des,
      instructions: recipe.instructions,
      imageUrl: recipe.imageUrl,
      cookingTime: recipe.cookingTime,
      isTweet: false,
      userOwner: currentUser._id,
    });
    console.log(response);
    dispatch(setPosts(response.data.posts));
  };

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        radius="full"
        size="sm"
        variant={isFollowed ? "bordered" : "solid"}
      >
        Add Recipe
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Recipe Creation
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Name"
                  placeholder="Enter Recipe Name"
                  value={recipe.name}
                  onChange={(e) =>
                    setRecipe({ ...recipe, name: e.target.value })
                  }
                />
                <Input
                  autoFocus
                  label="Description"
                  placeholder="Enter Recipe Name"
                  value={recipe.des}
                  onChange={(e) =>
                    setRecipe({ ...recipe, des: e.target.value })
                  }
                />
                <Input
                  type="number"
                  label="Cooking Time"
                  placeholder="Enter Preparation Time"
                  value={recipe.cookingTime}
                  onChange={(e) =>
                    setRecipe({ ...recipe, cookingTime: e.target.value })
                  }
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">
                        minutes
                      </span>
                    </div>
                  }
                />
                <Textarea
                  placeholder="Enter the Procedure"
                  label="Instructions"
                  value={recipe.instructions}
                  onChange={(e) =>
                    setRecipe({ ...recipe, instructions: e.target.value })
                  }
                />
                <Input
                  label="Add Ingredients"
                  placeholder="Enter Ingredient"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={addToIngredients}
                    >
                      <MdAddShoppingCart className="text-2xl text-default-400 pointer-events-none" />
                    </button>
                  }
                />
                <div className="w-full">
                  {todos.map((todo) => (
                    <div key={todo.id} className="inline-block">
                      <Code className="mr-2 mb-2 flex justify-center w-fit items-center">
                        {todo.text}
                        <div
                          className=" ml-2 cursor-pointer  shadow-lg"
                          onClick={() => handleDeleteTodo(todo.id)}
                        >
                          <AiOutlineDelete />
                        </div>
                      </Code>
                    </div>
                  ))}
                </div>

                <Code id="upload-btn" className="w-full">
                  <Label className="text-default-400 text-small ">
                    Upload Image
                  </Label>
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res: any) => {
                      // Do something with the response below console is useful
                      console.log("Files: ", res[0].url);
                      //we have response we can store the url in mongodb
                      toast.success("Upload Completed");
                      setRecipe({ ...recipe, imageUrl: res[0].url });
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      toast.error(`ERROR! ${error.message}`);
                    }}
                  />
                </Code>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={handleCreateRecipe}
                >
                  Share
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
