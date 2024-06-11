import React, { useState } from "react";
import { Search, Section } from "../styles/main";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
const SearchAddress = ({
  searchData,
  handlerRemove,
  moveToPoint,
  activeIndex,
}) => {
  const [users, setUsers] = useState([]);
  const [userEdit, setUserEdit] = useState(
    Array(searchData.length).fill(false)
  );
  const [inputUsers, setInputUsers] = useState(
    Array(searchData.length).fill("")
  );

  const inputUserHandler = (e, idx) => {
    e.preventDefault();
    setInputUsers((prev) => {
      const newUsers = [...prev];
      newUsers[idx] = e.target.value;
      return newUsers;
    });
  };

  const addUserHandler = (e, idx) => {
    if (e.key === "Enter") {
      // 값을 저장하는 로직을 여기에 추가합니다.
      console.log("입력된 값:", inputUsers);
      // 예를 들어, 상태를 초기화할 수도 있습니다.
      // setInputUsers('');
      setUsers((prev) => {
        const newUsers = [...prev];
        newUsers[idx] = e.target.value;
        return newUsers;
      });
      setUserEdit((prev) => {
        const newPrev = [...prev];

        newPrev[idx] = !newPrev[idx];
        return newPrev;
      });
    }
  };

  const editHandle = (idx) => {
    setUserEdit((prev) => {
      const newPrev = [...prev];
      newPrev[idx] = !newPrev[idx];
      return newPrev;
    });
  };

  return (
    <>
      <Section>
        {searchData?.map((data, idx) => {
          const addressData = data.result;
          return (
            <Search
              key={idx}
              className={`search-card ${activeIndex === idx ? "active" : ""}`}
            >
              <div
                className='click-box'
                onClick={(e) => moveToPoint(data.coords, idx)}
              >
                <div className='addr-name'>
                  <div>{idx + 1}</div>
                  <div>{addressData.address_name}</div>
                </div>
                <div className='user-name'>
                  {!userEdit[idx] ? (
                    <>
                      <span>
                        사원명:
                        {userEdit ? (
                          <input
                            type='text'
                            name='users'
                            value={inputUsers[idx]}
                            onChange={(e) => inputUserHandler(e, idx)}
                            onKeyDown={(e) => addUserHandler(e, idx)}
                          />
                        ) : (
                          users[idx]
                        )}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>사원명:</span>
                      <span>{users[idx]}</span>
                      {/* <input
                        type='text'
                        name='users'
                        value={inputUsers[idx]}
                        onChange={(e) => inputUserHandler(e, idx)}
                        onKeyDown={(e) => addUserHandler(e, idx)}
                      /> */}
                    </>
                  )}
                  <div onClick={() => editHandle(idx)}>
                    <MdEdit />
                  </div>
                </div>
              </div>
              <div
                className='delete'
                onClick={() => handlerRemove(idx)}
                style={{ width: 20, height: 20 }}
              >
                <AiFillCloseCircle size={16} />
              </div>
            </Search>
          );
        })}
      </Section>
    </>
  );
};

export default SearchAddress;
