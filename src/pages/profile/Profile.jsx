import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { io } from "socket.io-client";
import axios from "axios";

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [viewUser, setUser] = useState({});
    const username = useParams().username;
    const socket = useRef();
    const { user } = useContext(AuthContext);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            setOnlineUsers(
                user.followins.filter((f) => users.some((u) => u.userId === f))
            );
        });
    }, [user]);
    
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`);
            setUser(res.data);
        };
        fetchUser();
    }, [username]);

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar currentId={user._id} onlineUsers={onlineUsers}/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src={
                                    viewUser.coverPicture
                                        ? PF + viewUser.coverPicture
                                        : PF + "person/noCover.png"
                                }
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={
                                    viewUser.profilePicture
                                        ? PF + viewUser.profilePicture
                                        : PF + "person/noAvatar.png"
                                }
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{viewUser.username}</h4>
                            <span className="profileInfoDesc">{viewUser.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} />
                        <Rightbar user={viewUser} />
                    </div>
                </div>
            </div>
        </>
    );
}
