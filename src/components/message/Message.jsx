import "./message.css";
import {format} from "timeago.js";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Message({message,own,user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [other, setOther] = useState();

    useEffect(()=>{
        const fetchConversation = async () => {
            try {
                const conversation = await axios.get("/conversations?convId="+message.conversationId);
                const otherId = await conversation.data.members.filter((i) => i!==user._id)[0];
                const otherUser = await axios.get("/users?userId="+otherId);
                setOther(otherUser.data);
            } catch (err){
                console.log(err);
            }
            console.log(other);
        };
        fetchConversation();
    },[message]);

    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img
                    src={own ? (user?.profilePicture ?PF+user.profilePicture :PF+"person/noAvatar.png"): (other?.profilePicture ?PF+other.profilePicture :PF+"person/noAvatar.png")}
                    alt=""
                    className="messageImg"
                />
                <p className="messageText">
                    {message.text}
                </p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    );
}
