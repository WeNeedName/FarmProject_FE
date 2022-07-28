import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentAccountListDB } from "../redux/modules/account";
import { getAccountListDB } from "../redux/modules/account";

// 컴포넌트
import Header from "../components/Header";
import AccountWeek from "../components/accountbook/AccountWeek";
import AccountCalendar from "../components/accountbook/AccountCalendar";
import AccountWrite from "../components/accountbook/AccountWrite";
import FooterNav from "../components/FooterNav";

// 이미지
import chickenIcon from "../images/chickenIcon.png";
import presentIcon from "../images/presentIcon.png";

const AccountBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accountList = useSelector((state) => state.account.accountList);
  const yearMonth = useSelector((state) => state.account.yearMonth);
  const currentAccount_list = useSelector(
    (state) => state.account.currentAccount
  );
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    dispatch(getCurrentAccountListDB());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAccountListDB(yearMonth));
  }, [yearMonth, currentAccount_list]);

  const isLogin = sessionStorage.getItem("jwtToken");

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, []);

  // 장부내역 상세 모달 열기
  const [isOpen, setOpen] = useState(false);

  function toggleModal(id) {
    setOpen(!isOpen);
  }

  return (
    <Wrap>
      <Header currentPage="accountbook" />
      <CalendarWrap>
        <AccountCalendar accountList={accountList} />
        <AddAccountBtn
          onClick={() => {
            toggleModal();
          }}
        >
          + 기록하기
        </AddAccountBtn>
      </CalendarWrap>
      <CuurentListWrap>
        <AccountWeek
          currentAccount_list={currentAccount_list}
          accountList={accountList}
          yearMonth={yearMonth}
        />
      </CuurentListWrap>

      {isOpen && <AccountWrite isOpen={isOpen} toggleModal={toggleModal} />}
      <Icon
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
        Image={presentIcon}
        chickenIcon={chickenIcon}
        onClick={() => {
          const openNewWindow = window.open("about:blank");
          openNewWindow.location.href =
            "https://docs.google.com/forms/d/e/1FAIpQLSfdZk0LhMOcp8FVaChB2mvIvixRKmY4A_iErl-UsoI0qPJVLg/viewform?usp=sf_link";
        }}
      />
      {isHovering ? (
        <Info>
          <Emoji>🥳 </Emoji> 설문조사 참여하고 치킨받기
        </Info>
      ) : null}
      <FooterNav currentPage="accountbook" />
    </Wrap>
  );
};

const boxFadeB = keyframes`
  0% {
  opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const boxFadeC = keyframes`
  0% {
    transform: scale(1, 1);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);

  }
  100% {
    transform: scale(1.2, 1.2);
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.15);
  }
`;

const Wrap = styled.div`
  width: 100vw;
  /* max-width: 1920px; */
  height: 100vh;
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: 1fr minmax(600px, 780px) 25% 1fr;
  grid-template-rows: 80px minmax(640px, 740px) 1fr;
  justify-content: center;
  flex-flow: wrap;
  row-gap: 16px;
  column-gap: 26px;
  @media only screen and (max-width: 1220px) {
    grid-template-columns: 1fr minmax(600px, 720px) 24% 1fr;
  }
  @media only screen and (max-width: 760px) {
    grid-template-columns: 1fr 95% 1fr;
    grid-template-rows: 70px minmax(520px, 700px) auto 1fr;
  }
`;

const CalendarWrap = styled.div`
  padding: 30px 30px 36px 30px;
  background: #ffffff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  grid-column: 2 / 3;
  grid-row: 2 / 3;
  position: relative;
  @media only screen and (max-width: 760px) {
    padding: 20px 10px 20px 10px;
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    margin-top: 10px;
    border-radius: 0px;
    width: 100%;
    margin-left: -10px;
  }
`;

const CuurentListWrap = styled.div`
  grid-column: 3 / 4;
  grid-row: 2 / 3;
  border-left: 1px solid #dddddd;
  @media only screen and (max-width: 760px) {
    grid-column: 2 / 3;
    grid-row: 3 / 4;
    border-left: none;
  }
`;

const AddAccountBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 15px;
  width: auto;
  height: 26px;
  background: #318f27;
  border: none;
  border-radius: 50px;
  color: white;
  font-size: 12px;
  position: absolute;
  top: 36px;
  right: 30px;
  cursor: pointer;
  &:hover {
    background-color: #22631c;
  }
`;

const Info = styled.div`
  width: 240px;
  height: 60px;
  border-radius: 8px;
  position: absolute;
  position: fixed;
  right: 190px;
  bottom: 100px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  animation: ${boxFadeB} 1s;
  z-index: 10;
  @media only screen and (max-width: 760px) {
    bottom: 120px;
    right: 150px;
  }
`;

const Icon = styled.div`
  width: 80px;
  height: 80px;
  background-image: url(${(props) => props.Image});
  background-position: center 30%;
  background-size: cover;
  position: fixed;
  bottom: 90px;
  right: 70px;
  z-index: 10;
  border-radius: 100px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);

  cursor: pointer;
  &:hover {
    animation: ${boxFadeC} 2s;
    background-image: url(${(props) => props.chickenIcon});
  }
  @media only screen and (max-width: 760px) {
    width: 60px;
    height: 60px;
    bottom: 120px;
    right: 50px;
  }
`;

const Emoji = styled.div`
  font-size: 20px;
  margin-right: 4px;
`;

export default AccountBook;
