import { Skeleton } from "@mui/material";
import { api } from "App";
import axios from "axios";
import CardComponent from "components/CardComponent";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Cards } from "./style";

const Home = () => {
  const { enqueueSnackbar } = useSnackbar(); // bildirishler ucun

  const [userData, setuserData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // User datalarini almaq ucun funksiya
    const getData = async () => {
      setLoading(true);
      await axios
        .get(`${api}/users`)
        .then((res) => setuserData(res.data))
        .catch(() => enqueueSnackbar("An unknown error occurred", { variant: "error" }));
      setLoading(false);
    };
    getData();
  }, [enqueueSnackbar]);

  // Apiden gelen nomrelerin bezileri nomreden elave sozler de getirir. Onlari silmek ucun funksiya.

  console.log(userData);
  const removeLastNumberOnPhone = (phone) => {
    let number = phone;
    let lastIndexNumber = number.lastIndexOf(" ");
    if (lastIndexNumber > 0) {
      number = number.substring(0, lastIndexNumber);
    }

    // nomreleri seliqeli formaya salmaq ucun kod. Backendden gelen nomreler ya moterize, ya noqte, ya da defisle gelir. Hamisini standart formaya salmaq ucun kod

    const regexForCharacters = /[+-/()]*/g;
    number = number.replaceAll(regexForCharacters, "");
    if (number.length === 10) {
      number = `(${number.slice(0, 3)}) ${number.slice(3, 6)} ${number.slice(6, 8)} ${number.slice(8, 10)}`;
    } else if (number.length === 11) {
      number = `+${number.slice(0, 1)} (${number.slice(1, 4)}) ${number.slice(4, 7)} ${number.slice(7, 9)} ${number.slice(9, 11)}`;
    }
    return number;
  };

  return (
    <div>
      <Cards>
        {loading ? (
          <>
            <Skeleton width={290} height={315} variant="rectangular" />
            <Skeleton width={290} height={315} variant="rectangular" />
            <Skeleton width={290} height={315} variant="rectangular" />
            <Skeleton width={290} height={315} variant="rectangular" />
          </>
        ) : (
          userData.map((user, key) => <CardComponent user={user} key={key} removeLastNumberOnPhone={removeLastNumberOnPhone} />)
        )}
      </Cards>
    </div>
  );
};

export default Home;
