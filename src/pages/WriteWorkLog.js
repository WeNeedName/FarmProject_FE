import { React, useState, useEffect } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from 'axios'
import {addWorkLogDB} from '../redux/modules/workLog'

import Work from "../components/workLog/Work";
import WorkPhoto from "../components/workLog/WorkPhoto";
import SubMaterial from "../components/workLog/SubMaterial";
import Record from "../components/workLog/Record";


const WriteWorkLog =() => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = sessionStorage.getItem("jwtToken");
    const myCropsList = useSelector((state) => state.users.user?.crops)

    const [title, setTitle] = useState("")
    const [crop, setCrop] = useState("")
    const [date, setDate] = useState("")
    const [endTime, setEndTime] = useState("")
    const [memo, setMemo] = useState("")
    const [subMaterial, setSubMaterial] = useState([])
    
    const [type, setType] = useState(0);
    const [product, setProduct] = useState("");
    const [use, setUse] = useState("");
    const [unit, setUnit] = useState("");
    const usage = use+unit
    
    const subMaterialData = {
      type: type,
      product : product,
      use : usage
    }

    const [type1, setType1] = useState(0);
    const [product1, setProduct1] = useState("");
    const [use1, setUse1] = useState("");
    const [unit1, setUnit1] = useState("");
    const usage1 = use1+unit1
    
    const subMaterialData1 = {
      type: type1,
      product : product1,
      use : usage1
    }


    const [harvest, setHarvest] = useState("")
    const [images, setImages] = useState("")
    
    const dateFormat = moment(date).format("YYYY-MM-DD")
    
    const numberCrop = Number(crop)
    const addWorkLog = async () => {
      const data = {
              crop : numberCrop,
              date : dateFormat,
              memo : memo,
              subMaterial : subMaterialData,
              harvest : harvest
      }
      let frm = new FormData();
      frm.append("data", JSON.stringify(data));
      frm.append("Images",images)
      await axios({
        method: "post",
        url: "http://idontcare.shop/worklog",
        data : frm,
        headers : {
          "Content-Type": "multipart / form-data",
          Autorization :  `Bearer ${token}`,
        }
      })
      dispatch(
        addWorkLogDB(data) 
      )
        .then(
          navigate("/worklog")
      );
      
      }
    console.log(title, numberCrop, dateFormat, memo, subMaterialData, harvest, images)
    console.log(type, product, use, unit)
    
    return(
        <Container>
          <Header />
            <Wrap>
              <TotalTitle>
                작업일지등록하기
              </TotalTitle>
              <ContentWrap>
                <Work setTitle={setTitle} setCrop={setCrop} setDate={setDate} setMemo={setMemo} />
                <SubMaterial setType={setType} setProduct={setProduct} setUse={setUse} setUnit={setUnit}/>
                <Record setHarvest={setHarvest}/>
                <WorkPhoto setImages={setImages}/>
              </ContentWrap>
              <DoneBtn
              onClick={()=>{
                addWorkLog()
              }}>작성완료</DoneBtn>
            </Wrap> 
        </Container>
    )
}

const Container = styled.div`
  backgroun-color: #ddd;
`;

const Wrap = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: white;
  border-radius: 20px;
  position: relative;
  padding: 30px;
  margin-top: 100px;
`;
const TotalTitle = styled.label`
  font-size: 2rem;
  font-weight: bold;
`;
const ContentWrap = styled.div`

padding: 10px; 
width: 80%;
height: 80vh;
background-color: #fff;
`
const Submit = styled.button`
  margin-top: 20px;
`;
const Button = styled.button``


const DoneBtn = styled.button`
  margin-top: 200px;
  
  width: 300px;
  height: 40px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 8px;
  &:hover {
    opacity: 0.7;
  }

`;

export default WriteWorkLog;
