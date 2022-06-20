import React from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useState, useEffect, useRef, useContext } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../../context/AuthContext";
import "./home.css";

export default function Home() {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            setOnlineUsers(
                user.followins.filter((f) => users.some((u) => u.userId === f))
            );
        });
    }, [user]);

    return (
        <>
            <Topbar />
            <div className="homeContainer">
                <Sidebar currentId={user._id} onlineUsers={onlineUsers} />
                <Feed />
                <Rightbar />
            </div>
        </>
    );
}
