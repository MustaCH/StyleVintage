import React, { useEffect, useRef, useState } from "react";
import { Input } from "../../components/shared";
import { RiSendPlane2Line } from "react-icons/ri";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = useRef(null);

  useEffect(() => {
    const messagesContainer = messagesRef.current;

    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (userMessage) => {
    if (userMessage.trim() !== "") {
      const userMessageObj = { text: userMessage, user: "You" };
      setMessages((prevMessages) => [...prevMessages, userMessageObj]);

      switch (userMessage) {
        case "How can I see the measures of the clothes? 🤔📏":
          setTimeout(() => {
            const botMessageObj = {
              text: "To see the measures of the clothes, go to the desired product page and click on the ''See size chart'' button.",
              user: "Bot",
            };
            setMessages((prevMessages) => [...prevMessages, botMessageObj]);
          }, 1000);
          break;
        case "Problem with my shipping 🛥📦":
          setTimeout(() => {
            const botMessageObj = {
              text: "I'm sorry to hear that you're having shipping issues. Please contact our support team at support@nxbo.com for assistance.",
              user: "Bot",
            };
            setMessages((prevMessages) => [...prevMessages, botMessageObj]);
          }, 1000);
          break;
        case "Problem with payment 💵😥":
          setTimeout(() => {
            const botMessageObj = {
              text: "If you're experiencing payment issues, please check your payment method and try again. If the problem persists, contact our support team at support@nxbo.com.",
              user: "Bot",
            };
            setMessages((prevMessages) => [...prevMessages, botMessageObj]);
          }, 1000);
          break;
        case "Chat with a human 🙋‍♂️":
          setTimeout(() => {
            const botMessageObj = {
              text: "Sure! Connecting you to a human agent. Please wait a moment.",
              user: "Bot",
            };
            setMessages((prevMessages) => [...prevMessages, botMessageObj]);
          }, 1000);
          setTimeout(() => {
            const botMessageObj = {
              text: "No one seems to be available at the moment 😥. Please try again later ",
              user: "Bot",
            };
            setMessages((prevMessages) => [...prevMessages, botMessageObj]);
          }, 3000);

          break;
        default:
          setTimeout(() => {
            const botMessageObj = {
              text: "I'm just a chatbot. I don't have answers.",
              user: "Bot",
            };
            setMessages((prevMessages) => [...prevMessages, botMessageObj]);
          }, 1000);
      }
      setNewMessage("");
    }
  };

  const handleOptionClick = (option) => {
    setNewMessage(option);
    sendMessage(option);
  };

  return (
    <div className="lg:ps-28 mb-20 lg:mb-10">
      <h1 className="text-3xl text-gray-300 font-bold border-b-2 border-orange-500 p-8">
        Chat.
      </h1>
      <div className="flex justify-center mt-4 lg:mt-12">
        <div className="w-[90%]  bg-zinc-900 p-4 rounded-lg">
          <div
            className="items-center h-[550px] lg:h-[600px] m-0 lg:m-12 lg:mb-4 p-4 border-2 border-orange-500 rounded-lg overflow-y-auto overflow-hidden"
            ref={messagesRef}
          >
            <div className="flex flex-col gap-2 w-full ">
              <div className="flex flex-col gap-2 mt-4">
                <p className="text-gray-300 text-sm bg-zinc-800 p-2 rounded-lg w-fit mb-1">
                  Welcome to the NXBO chatbot! 🤖❤
                  <br />
                  <br />
                  How can i help you?
                </p>
                <button
                  className="text-start w-fit text-sm bg-zinc-800 border border-orange-500 rounded-lg p-2 text-gray-300"
                  onClick={() =>
                    handleOptionClick(
                      "How can I see the measures of the clothes? 🤔📏"
                    )
                  }
                >
                  How can I see the measures of the clothes? 🤔📏
                </button>
                <button
                  className="text-start w-fit text-sm bg-zinc-800 border border-orange-500 rounded-lg p-2 text-gray-300"
                  onClick={() =>
                    handleOptionClick("Problem with my shipping 🛥📦")
                  }
                >
                  Problem with my shipping 🛥📦
                </button>
                <button
                  className="text-start w-fit text-sm bg-zinc-800 border border-orange-500 rounded-lg p-2 text-gray-300"
                  onClick={() => handleOptionClick("Problem with payment 💵😥")}
                >
                  Problem with payment 💵😥
                </button>
                <button
                  className="text-start w-fit text-sm bg-zinc-800 border border-orange-500 rounded-lg p-2 text-gray-300"
                  onClick={() => handleOptionClick("Chat with a human 🙋‍♂️")}
                >
                  Chat with a human 🙋‍♂️
                </button>
              </div>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${
                    message.user === "You"
                      ? "flex justify-end text-right"
                      : "flex justify-start text-left"
                  }`}
                >
                  <p
                    className={`${
                      message.user === "You"
                        ? "text-black text-sm w-64 p-2 bg-orange-500 rounded-lg"
                        : "text-gray-300 text-sm w-64 p-2 bg-zinc-800 rounded-lg"
                    }`}
                  >
                    {message.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex gap-4 justify-center items-center mt-4 lg:mt-0">
              <Input
                type={"text"}
                placeholder={"Write your message"}
                customStyle={"w-[250px] lg:w-[800px]"}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                className="bg-orange-500 rounded-full p-2"
                onClick={() => sendMessage(newMessage)}
              >
                <RiSendPlane2Line className=" text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
