import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getCropsListDB } from "../../redux/modules/users";
import Select from "react-select";
import { isDayjs } from "dayjs";
import { toBeChecked } from "@testing-library/jest-dom/dist/matchers";

const MyCrops = (props) => {
  const dispatch = useDispatch();
  const [selectedCrops, setSelectedCrops] = useState([]);
  const cropsData = useSelector((state) => state.users.crops);
  useEffect(() => {
    dispatch(getCropsListDB());
  }, []);

  const crops = [];
  selectedCrops.filter((v) => crops.push(v.value));
  console.log(crops);

  return (
    <Container>
      <Select
        className="react-select"
        defaultValue={[]} //db에서 유저data 불러올 때 다시 수정 필요함
        isMulti
        name="crops"
        options={
          cropsData !== undefined
            ? cropsData.map((crops) => {
                return { label: crops.name, value: crops.id };
              })
            : null
        }
        onChange={(value) => {
          setSelectedCrops(value);
        }}
        classNamePrefix="select"
      />
    </Container>
  );
};

const Container = styled.div`
  .react-select {
    width: 60%;
  }
`;
const Selec = styled.select`
  margin-left: 20px;
  width: 170px;
  background-color: white;
  height: 30px;
  border-radius: 10px;
  border: 1px solid black;
  padding-left: 10px;
`;
export default MyCrops;