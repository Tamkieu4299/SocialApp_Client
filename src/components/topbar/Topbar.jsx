import "./topbar.css";
import {
    Search,
    Person,
    Chat,
    Notifications,
    ExitToApp,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Topbar() {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [users, setUsers] = useState([]);
    const [text, setText] = useState("");
    const input = useRef();

    const onChange = (e) => {
        e.preventDefault();
        setText(e.target.value);
    };

    useEffect(() => {
        users.length = 0;
        const getUsers = async () => {
            try {
                const res = await axios.get(`/users?username=${text}`);
                setUsers([...users, res.data]);
            } catch (err) {
                console.log(err);
            }
        };
        getUsers();
    }, [text]);

    const handleLogout = async () => {
        localStorage.removeItem("user");
        window.location.reload();
    };

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">Tamnotsocial</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon" />
                    <input
                        placeholder="Search for friend, post or video"
                        className="searchInput"
                        onChange={onChange}
                        ref={input}
                    />
                </div>
                <div className="searchBarResultDisplay">
                    {users.length !== 0 && (
                        <div className="searchResults">
                            {users.map((u) => (
                                <Link
                                    to={`/profile/${u.username}`}
                                    style={{
                                        textDecoration: "none",
                                        color: "black",
                                    }}
                                >
                                    <div className="result">
                                        <img
                                            className="resultImg"
                                            src={
                                                u.profilePicture
                                                    ? PF + u.profilePicture
                                                    : PF + "person/noAvatar.png"
                                            }
                                            alt=""
                                        />
                                        <span className="resultUsername">
                                            {u.username}
                                        </span>
                                        <span className="resultUsername">
                                            {u.email}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <Link to="/messenger" style={{ textDecoration: "none" }}>
                        <div className="topbarIconItem">
                            <Chat />
                            <span className="topbarIconBadge">2</span>
                        </div>
                    </Link>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <div className="topbarLogoutContainer">
                                        
                        <button
                            className="topbarLogoutButton"
                            onClick={handleLogout}
                        ><ExitToApp /></button>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img
                        src={
                            user.profilePicture
                                ? PF + user.profilePicture
                                : PF + "person/noAvatar.png"
                        }
                        alt=""
                        className="topbarImg"
                    />
                </Link>
            </div>
        </div>
    );
}
