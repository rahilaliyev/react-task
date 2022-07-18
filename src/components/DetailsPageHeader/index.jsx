import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import { PageHeader, GoBackButton, AddButton, SkeletonWrapper, HeaderText } from "./style";
import { CircularProgress, Skeleton } from "@mui/material";
import { useForm } from "react-hook-form";
import { api } from "App";
import { UserDetailsAtom } from "store";
import { useRecoilState } from "recoil";
import { useSnackbar } from "notistack";
import { Buttons, ButtonWrapper, FormGroup, ErrorText, Header, Input, Label, ModalContainer, Textarea, SpinnerWrapper } from "GlobalStyles";

const DetailsPageHeader = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); // bildirishler ucun
  const { userID, postID } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // validation ucun

  const [posts, setPosts] = useRecoilState(UserDetailsAtom);

  const [userDetails, setUserDetails] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [addPostDetails, setAddPostDetails] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    // user details datalarini almaq ucun funksiya
    const getName = async () => {
      setLoading(true);
      await axios
        .get(`${api}/users/${userID}`)
        .then((res) => setUserDetails(res.data))
        .catch(() => enqueueSnackbar("An unknown error occurred", { variant: "error" }));
      setLoading(false);
    };
    getName();
  }, [userID, enqueueSnackbar]);

  //Modallarin acib baglanmasi ucun

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  // Post elave etmek ucun funksiya

  const addPostRequest = async () => {
    try {
      setSpinner(true);
      const response = await axios.post(`${api}/posts/`, addPostDetails);
      if (response.status === 201) {
        setPosts([response.data, ...posts]);
        handleClose();
        setSpinner(false);
        enqueueSnackbar("Your post was added succesfully", { variant: "success" });
      }
    } catch (error) {
      setSpinner(false);
      enqueueSnackbar("An unknown error occurred", { variant: "error" });
    }
  };

  return (
    <>
      <PageHeader>
        <GoBackButton onClick={() => navigate(-1)}>
          <ArrowBackIcon fontSize="large" /> Back
        </GoBackButton>
        {loading ? (
          <SkeletonWrapper>
            {" "}
            <Skeleton height={43} width={"30%"} />{" "}
          </SkeletonWrapper>
        ) : (
          <HeaderText>{userDetails?.name}</HeaderText>
        )}
        {!postID && (
          <AddButton onClick={handleOpen}>
            <AddIcon fontSize="large" />
          </AddButton>
        )}
      </PageHeader>
      <Outlet />
      <Modal open={openModal} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <ModalContainer>
          {spinner ? (
            <SpinnerWrapper>
              <CircularProgress />
            </SpinnerWrapper>
          ) : (
            <>
              <Header>Add post</Header>
              <form onSubmit={handleSubmit(addPostRequest)}>
                <FormGroup>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    type="text"
                    id="title"
                    name="title"
                    value={addPostDetails?.title}
                    {...register("title", {
                      required: true,
                    })}
                    onChange={(e) => setAddPostDetails({ ...addPostDetails, title: e.target.value })}
                  />
                </FormGroup>
                {errors.title && <ErrorText>This field is required </ErrorText>}
                <FormGroup>
                  <Label htmlFor="body">Body</Label>
                  <Textarea
                    id="body"
                    name="body"
                    {...register("body", {
                      required: true,
                    })}
                    value={addPostDetails.body}
                    onChange={(e) => setAddPostDetails({ ...addPostDetails, body: e.target.value })}
                  />
                </FormGroup>
                {errors.body && <ErrorText>This field is required</ErrorText>}
                <ButtonWrapper>
                  <Buttons variant="outlined" type="button" onClick={handleClose}>
                    Cancel
                  </Buttons>
                  <Buttons type="submit">Save</Buttons>
                </ButtonWrapper>
              </form>
            </>
          )}
        </ModalContainer>
      </Modal>
    </>
  );
};

export default DetailsPageHeader;
