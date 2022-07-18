import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Modal from "@mui/material/Modal";
import { CircularProgress, Skeleton } from "@mui/material";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { api } from "App";
import { Buttons, ButtonWrapper, ErrorText, FormGroup, Header, Input, Label, ModalContainer, SpinnerWrapper, Textarea } from "GlobalStyles";
import { Button, ButtonGroup, Comment, EmailLink, Name, NameEmail } from "./style";

const PostDetails = () => {
  const { postID } = useParams();
  const { enqueueSnackbar } = useSnackbar(); // bildirishler ucun
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // validation ucun

  const [postDetails, setPostDetails] = useState();
  const [showComment, setShowComment] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [addComment, setAddComment] = useState({ name: "", email: "", body: "" });

  // daxil olunan postun detallarinin yuklenmesi ucun funksiya
  useEffect(() => {
    const getPostDetails = async () => {
      setLoading(true);
      await axios
        .get(`${api}/posts/${postID}`)
        .then((res) => setPostDetails(res.data))
        .catch(() => enqueueSnackbar("An unknown error occurred", { variant: "error" }));
      setLoading(false);
    };
    getPostDetails();
  }, [postID, enqueueSnackbar]);

  // commentlerin acib baglanmasi ucun ve acildiqda yuklenmesi ucun sorgu, funksiya
  const handleComments = async () => {
    setShowComment(!showComment);
    setLoadingComments(true);
    await axios
      .get(`${api}/posts/${postID}/comments`)
      .then((res) => setAllComments(res.data))
      .catch(() => enqueueSnackbar("An unknown error occurred", { variant: "error" }));
    setLoadingComments(false);
  };

  // modallarin acilib baglanmasi ucun funksiya
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  //comment elave etmek ucun funksiya
  const addCommentRequest = async () => {
    setSpinner(true);
    try {
      const response = await axios.post(`${api}/posts/${postID}/comments`, addComment);
      if (response.status === 201) {
        setAllComments([response.data, ...allComments]);
        handleClose();
        enqueueSnackbar("Your comment was added succesfully", { variant: "success" });
        setSpinner(false);
      }
    } catch (error) {
      enqueueSnackbar("An unknown error occurred", { variant: "error" });
      setSpinner(false);
    }
  };

  return (
    <div>
      {loading ? (
        <>
          <Skeleton variant="text" height={70} />
          <Skeleton variant="rectangular" height={300} />
        </>
      ) : (
        <>
          <h1>{postDetails?.title}</h1>
          <p>{postDetails?.body.repeat(10)}</p>
        </>
      )}
      <ButtonGroup>
        <Button onClick={handleComments}>{showComment ? "Hide comments" : "Show comments"}</Button>
        {showComment && <Button onClick={handleOpen}>Add comment</Button>}
      </ButtonGroup>
      {showComment &&
        (loadingComments ? (
          <>
            <Skeleton height={120} variant="rectangular" style={{ marginBottom: 20 }} />
            <Skeleton height={120} variant="rectangular" style={{ marginBottom: 20 }} />
            <Skeleton height={120} variant="rectangular" style={{ marginBottom: 20 }} />
          </>
        ) : (
          allComments.map((comment, key) => (
            <Comment key={key}>
              <NameEmail>
                <Name>{comment?.name}</Name>
                <EmailLink href={`mailto:${comment?.email}`}>{comment?.email}</EmailLink>
              </NameEmail>
              <p>{comment?.body}</p>
            </Comment>
          ))
        ))}
      <Modal open={openModal} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <ModalContainer>
          {spinner ? (
            <SpinnerWrapper>
              <CircularProgress />
            </SpinnerWrapper>
          ) : (
            <>
              <Header>Add comment</Header>
              <form onSubmit={handleSubmit(addCommentRequest)}>
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={addComment.name}
                    {...register("name", {
                      required: true,
                    })}
                    onChange={(e) => setAddComment({ ...addComment, name: e.target.value })}
                  />
                </FormGroup>
                {errors.name && <ErrorText>This field is required</ErrorText>}
                <FormGroup>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your email"
                    value={addComment.email}
                    {...register("email", {
                      required: true,
                    })}
                    onChange={(e) => setAddComment({ ...addComment, email: e.target.value })}
                  />
                </FormGroup>
                {errors.email && <ErrorText>This field is required</ErrorText>}
                <FormGroup>
                  <Label htmlFor="body">Body</Label>
                  <Textarea
                    id="body"
                    name="body"
                    placeholder="Your comment"
                    {...register("body", {
                      required: true,
                    })}
                    value={addComment.body}
                    onChange={(e) => setAddComment({ ...addComment, body: e.target.value })}
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
    </div>
  );
};

export default PostDetails;
