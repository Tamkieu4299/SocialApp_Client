import "./sidebar.css";
import {
    RssFeed,
    Chat,
    PlayCircleFilledOutlined,
    Group,
    Bookmark,
    HelpOutline,
    WorkOutline,
    Event,
    School,
} from "@material-ui/icons";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import {useState, useEffect} from "react";
import axios from "axios";

export default function Sidebar({currentId, onlineUsers}) {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get("/users/friends/" + currentId);
            setFriends(res.data);
        };
        getFriends();
    }, [currentId]);

    useEffect(() => {
        setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
    }, [friends, onlineUsers]);

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <li className="sidebarListItem">
                    <RssFeed className="sidebarIcon" />
                    <span className="sidebarListItemText">Feed</span>
                </li>
                <li className="sidebarListItem">
                    <Chat className="sidebarIcon" />
                    <span className="sidebarListItemText">Chats</span>
                </li>
                <li className="sidebarListItem">
                    <PlayCircleFilledOutlined className="sidebarIcon" />
                    <span className="sidebarListItemText">Videos</span>
                </li>
                <li className="sidebarListItem">
                    <Group className="sidebarIcon" />
                    <span className="sidebarListItemText">Groups</span>
                </li>
                <button className="sidebarButton">Show More</button>
                <hr className="sidebarHr" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="sidebarFriendList">
                    {onlineFriends.map((u) => (
                        <Online key={u._id} user={u} />
                    ))}
                </ul>
            </div>
        </div>
    );
}
