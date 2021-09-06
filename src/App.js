import { useState } from "react";
import "./styles/theme.scss";
import UsersPerPage from "./components/UsersPerPage";
import { findNames, usersPerPage } from "./utils";
import Data from "./data/Data.json";
import Pagination from "./components/Pagination";
import { IoCloseCircle, IoSearch } from "react-icons/io5";
import PopUp from "./components/PopUp";

function App() {
  const [popUp, setPopUp] = useState({ show: false, id: null });
  const [getData, setGetData] = useState(Data);
  const [showSearch, setShowSearch] = useState(false);

  const [searchName, setSearchName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const addUser = (e) => {
    if (!newUserName) {
    } else {
      if (e.keyCode === 13) {
        const newUserDetails = {
          id: new Date().getTime(),
          full_name: newUserName,
          is_favourite: false,
        };
        setGetData([newUserDetails, ...getData]);
        setNewUserName("");
      }
    }
  };

  // show popup
  const deleteUser = (id) => {
    setPopUp({
      show: true,
      id,
    });
  };

  const deleteConfirm = () => {
    if (popUp.show && popUp.id) {
      const filteredUsers = getData.filter((data) => {
        return data.id !== popUp.id;
      });
      setGetData(filteredUsers);
      setPopUp({
        show: false,
        id: null,
      });
    }
  };

  // hide popup
  const deleteCancel = () => {
    setPopUp({
      show: false,
      id: null,
    });
  };

  // Get current post
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentPosts = getData
    .sort((a, b) => b.is_favourite - a.is_favourite)
    .slice(indexOfFirstUser, indexOfLastUser);

  // add or remove friends from favorites
  const addOrRemovefavourites = (id) => {
    setGetData(
      getData.map((user) =>
        user.id === id ? { ...user, is_favourite: !user.is_favourite } : user
      )
    );
  };

  // change Page
  const paginateTo = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSearchName("");
  };

  return (
    <div className="App">
      <PopUp
        popUp={popUp}
        deleteConfirm={deleteConfirm}
        deleteCancel={deleteCancel}
      />
      <div className="friend-list-container">
        <div className="friend-list">
          <div className="friend-list-head">
            <div>Friends List</div>
            <IoSearch
              className="search-icon"
              title="Click to search friends"
              onClick={() => setShowSearch(!showSearch)}
            />
          </div>
          <div className={`search-container ${showSearch ? "" : "hide-div"}`}>
            <input
              type="text"
              placeholder="Enter your friends name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="input-field"
            />
            {searchName !== "" ? (
              <IoCloseCircle
                class="close-icon"
                title="clear all"
                onClick={() => setSearchName("")}
              />
            ) : (
              ""
            )}
          </div>
          <div className="add-user">
            <input
              type="text"
              placeholder="Add Name"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              onKeyUp={addUser}
              className="input-field"
            />
            {newUserName !== "" ? (
              <IoCloseCircle
                class="close-icon"
                title="clear all"
                onClick={() => setNewUserName("")}
              />
            ) : (
              ""
            )}
          </div>
          <div className="list-container">
            {searchName === "" ? (
              <UsersPerPage
                data={currentPosts}
                deleteUser={deleteUser}
                addOrRemovefavourites={addOrRemovefavourites}
              />
            ) : (
              <UsersPerPage
                data={findNames(searchName, getData)}
                deleteUser={deleteUser}
                addOrRemovefavourites={addOrRemovefavourites}
              />
            )}
          </div>
        </div>
        <div className="pagination-container">
          {!searchName && (
            <Pagination
              usersPerPage={usersPerPage}
              currentPage={currentPage}
              totalUsers={getData.length}
              paginateTo={paginateTo}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
