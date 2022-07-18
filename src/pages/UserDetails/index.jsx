import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Skeleton } from "@mui/material";
import { useSnackbar } from "notistack";
import { api } from "App";
import { useRecoilState } from "recoil";
import { UserDetailsAtom } from "store";
import { SpinnerWrapper } from "GlobalStyles";
import PostComponent from "components/PostComponent";

const Details = () => {
  const { enqueueSnackbar } = useSnackbar(); // bildirishler ucun

  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [posts, setPosts] = useRecoilState(UserDetailsAtom); // recoildeki postlar ucun olan statede deyishiklik ucun

  //Userdetailsdeki postlar ucun funksiya
  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      await axios
        .get(`${api}/posts`)
        .then((res) => setPosts(res.data.slice(0, 20)))
        .catch(() => enqueueSnackbar("An unknown error occurred", { variant: "error" }));
      setLoading(false);
    };

    getPosts();
  }, [setPosts, enqueueSnackbar]);

  //Her hansisa postu silmek ucun funksiya
  const deleteRequest = async (id, e) => {
    e.preventDefault();
    setSpinner(true);
    try {
      const response = await axios.delete(`${api}/posts/${id}`);
      if (response.status === 200) {
        setPosts(posts.filter((p) => p.id !== id));
        enqueueSnackbar("Post was deleted", { variant: "success" });
        setSpinner(false);
      }
    } catch (error) {
      setSpinner(false);
      enqueueSnackbar("An unknown error occurred", { variant: "error" });
    }
  };

  return (
    <div className="posts">
      {loading ? (
        <>
          <Skeleton height={140} />
          <Skeleton height={140} />
        </>
      ) : spinner ? (
        <SpinnerWrapper>
          <CircularProgress />
        </SpinnerWrapper>
      ) : (
        posts.map((post, key) => <PostComponent post={post} key={key} deleteRequest={deleteRequest} />)
      )}
    </div>
  );
};

export default Details;
