import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getRateDB } from "../../redux/modules/analysis";
// 로딩 효과
import { ShimmerTitle } from "react-shimmer-effects";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { ShimmerCircularImage } from "react-shimmer-effects";
import { ShimmerText } from "react-shimmer-effects";
// 컴포넌트
import WorkTimeBarChart from "./WorkTimeBarChart";

const WorkTime = ({ workTimeData }) => {
  const dispatch = useDispatch();
  const rateData = useSelector((state) => state.analysis.rate);
  const [count, setCount] = useState(0);
  const is_loaded = useSelector((state) => state.analysis.worktime_is_loaded);

  const end = rateData.rate && rateData.rate;
  const start = 0;
  const duration = 1000;

  const frameRate = 1000 / 60;
  const totalFrame = Math.round(duration / frameRate);

  const easeOutExpo = (number) => {
    return number === 1 ? 1 : 1 - Math.pow(2, -10 * number);
  };

  useEffect(() => {
    dispatch(getRateDB());
  }, []);
  // 숫자 카운팅 애니메이션
  useEffect(() => {
    let currentNumber = start;
    const counter = setInterval(() => {
      const progress = easeOutExpo(++currentNumber / totalFrame);
      if (rateData.rate) setCount(Math.round(end * progress));

      if (progress === 1) {
        clearInterval(counter);
      }
    }, frameRate);
  }, [end, frameRate, start, totalFrame]);

  console.log(rateData);

  return (
    <>
      <Wrap>
        <TitleWrap>
          <SmileIcon>💪</SmileIcon>
          <Title>
            작년에 비해 올해 작업 시간이 <br />
            {rateData.rate ? count + "%" : "00%"}{" "}
            {rateData.rateText ? rateData.rateText : "감소"}
            했어요
          </Title>
        </TitleWrap>
        {is_loaded ? (
          <WorkTimeBarChart workTimeData={workTimeData} />
        ) : (
          <ShimmerThumbnail className="thumNail-weather" height={160} rounded />
        )}
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 20px;
  grid-column: 7 / 10;
  grid-row: 2 / 3;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const boxFade = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10%);
 
  }
  30% {
    opacity: 0.3;
    transform: translateY(6%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  animation: ${boxFade} 1s;
`;

const SmileIcon = styled.span`
  font-size: 24px;
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: 700;
  margin-left: 10px;
  text-align: left;
`;

export default WorkTime;
