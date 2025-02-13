import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DashboardMessage = () => {
  const { seller } = useSelector((state) => state.seller);
  const [conversations, setConversations] = useState([]);
  const [open, setOpen] = useState(0);
  useEffect(() => {
    const messageList = axios
      .get(`${server}/conversation/get-all-conversation-seller/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setConversations(res.data.conversations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [seller]);
  return (
    <div className="w-[90%] bg-white m-3 h-[85vh] overflow-y-scroll rounded">
      <h1 className="text-center text-[30px] py-3 font-Poppins">
        All Messages
      </h1>
      {!open && (
        <>
          {/**all mesage list  */}

          {conversations &&
            conversations.map((item, index) => (
              <MessageList
                data={item}
                key={index}
                setOpen={setOpen}
                index={index}
              />
            ))}
        </>
      )}

      {open && (
        <SellerInbox />     )}
    </div>
  );
};
const MessageList = ({ data, index, setOpen }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };
  const [active, setActive] = useState(0);

  return (
    <div
      className={`w-full flex p-1 px-3 ${
        active === index ? "bg-[#00000010]" : "bg-transparent"
      } bg-[#f5f5f5c7] cursor-pointer`}
      onClick={(e) => setActive(index) || handleClick(data._id)}
    >
      <div className="relative">
        <img
          src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg"
          alt=""
          className="w-[50px] h-[50px] rounded-full"
        />
        <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-1 right-1"></div>
      </div>
      <div className="pl-3">
        <h1 className=" text-[18px]">Muhammed Ramees</h1>
        <p className="text-[16px] text-[#000c]"> hyyy whati ...</p>
      </div>
    </div>
  );
};
const SellerInbox = ({
    setOpen
  }) => {
    return (
      <div className="w-full min-h-full flex flex-col justify-between">
        {/* message header */}
        <div className="w-full flex p-3 items-center justify-between bg-slate-200">
          <div className="flex">
            <img
              src={`${userData?.avatar?.url}`}
              alt=""
              className="w-[60px] h-[60px] rounded-full"
            />
            <div className="pl-3">
              <h1 className="text-[18px] font-[600]">{userData?.name}</h1>
              <h1>{activeStatus ? "Active Now" : ""}</h1>
            </div>
          </div>
          <AiOutlineArrowRight
            size={20}
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>
  
        {/* messages */}
        <div className="px-3 h-[65vh] py-3 overflow-y-scroll">
          {messages &&
            messages.map((item, index) => {
              return (
                <div
                  className={`flex w-full my-2 ${
                    item.sender === sellerId ? "justify-end" : "justify-start"
                  }`}
                  ref={scrollRef}
                >
                  {item.sender !== sellerId && (
                    <img
                      src={`${userData?.avatar?.url}`}
                      className="w-[40px] h-[40px] rounded-full mr-3"
                      alt=""
                    />
                  )}
                  {item.images && (
                    <img
                      src={`${item.images?.url}`}
                      className="w-[300px] h-[300px] object-cover rounded-[10px] mr-2"
                    />
                  )}
                  {item.text !== "" && (
                    <div>
                      <div
                        className={`w-max p-2 rounded ${
                          item.sender === sellerId ? "bg-[#000]" : "bg-[#38c776]"
                        } text-[#fff] h-min`}
                      >
                        <p>{item.text}</p>
                      </div>
  
                      <p className="text-[12px] text-[#000000d3] pt-1">
                        {format(item.createdAt)}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
  
        {/* send message input */}
        <form
          aria-required={true}
          className="p-3 relative w-full flex justify-between items-center"
          onSubmit={sendMessageHandler}
        >
          <div className="w-[30px]">
            <input
              type="file"
              name=""
              id="image"
              className="hidden"
              onChange={handleImageUpload}
            />
            <label htmlFor="image">
              <TfiGallery className="cursor-pointer" size={20} />
            </label>
          </div>
          <div className="w-full">
            <input
              type="text"
              required
              placeholder="Enter your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className={`${styles.input}`}
            />
            <input type="submit" value="Send" className="hidden" id="send" />
            <label htmlFor="send">
              <AiOutlineSend
                size={20}
                className="absolute right-4 top-5 cursor-pointer"
              />
            </label>
          </div>
        </form>
      </div>
    );
  };

export default DashboardMessage;
