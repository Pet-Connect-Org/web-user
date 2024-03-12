"use client";
import { theme } from "@/app/theme";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { memo, useCallback, useRef, useState } from "react";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { useUser } from "@/app/hooks/useUser";
import Comment from "../comment";
import { ExtendedPostType } from "@/app/api/post";
import { formatDistance } from "date-fns";
import EditIcon from "@mui/icons-material/Edit";
import { useUpdatePostModal } from "@/app/hooks/useUpdatePostModal";
import { useDeletePost } from "@/app/services/post";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";
import { CommentType, ExtendedCommentType } from "@/app/api/comment";
import CommentInput from "./comment-input";
import Actions from "./actions";

const NUMBER_OF_COMMENTS_WILL_LOAD_MORE = 5;

const Post = (props: ExtendedPostType) => {
  const inputCommentRef = useRef<HTMLInputElement | null>(null);

  const { user } = useUser();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  const updatePost = useUpdatePostModal();
  const { mutate: deletePost } = useDeletePost();

  const numberOfComment = useRef<number>(4);

  const [comments, setComments] = useState<ExtendedCommentType[]>(
    props.comments?.slice(props.comments.length - numberOfComment.current)
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFocusInputComment = () => {
    inputCommentRef.current?.focus();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = () => {
    deletePost(props.id, {
      onSuccess: () => {
        toast.success("Delete successfully.");
        window.location.reload();
      },
    });
  };

  const handleRefreshCommentList = useCallback(
    (comment: CommentType) => {
      numberOfComment.current = numberOfComment.current + 1;
      setComments((prev) => [
        ...prev,
        {
          ...comment,
          user,
        } as ExtendedCommentType,
      ]);
    },
    [user?.id]
  );

  const handleLoadMoreComment = useCallback(() => {
    if (numberOfComment.current >= props.comments.length) return;
    const numberCommentCanIncrease =
      props.comments.length - numberOfComment.current;

    if (numberCommentCanIncrease <= 0) return;

    setComments(
      props.comments?.slice(
        props.comments.length -
          numberOfComment.current -
          (NUMBER_OF_COMMENTS_WILL_LOAD_MORE < numberCommentCanIncrease
            ? NUMBER_OF_COMMENTS_WILL_LOAD_MORE
            : numberCommentCanIncrease)
      )
    );
    numberOfComment.current =
      numberOfComment.current + NUMBER_OF_COMMENTS_WILL_LOAD_MORE;
  }, [props.comments.length]);

  if (!user) return;

  const isAuthor = +user.id === +props.user.id;

  return (
    <Box
      p={3}
      mt={5}
      boxShadow="0 1px 1px 0 rgba(0,0,0,0.25)"
      borderRadius={1.2}
      bgcolor={theme.palette.common.white}
    >
      <Box display="flex" alignItems="center">
        <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
          {props.user.name.charAt(0)}
        </Avatar>
        <Box ml={2} flex={1}>
          <Typography fontWeight={600}>{props.user.name}</Typography>
          <Typography color={theme.palette.grey[600]}>
            {formatDistance(new Date(props.created_at), new Date(), {
              addSuffix: true,
            })}
          </Typography>
        </Box>
        <Box>
          <IconButton onClick={handleClick}>
            <MoreHorizRoundedIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {isAuthor && (
              <Box>
                <MenuItem
                  onClick={() => {
                    updatePost.onOpen({ data: props });
                  }}
                >
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <Typography>Update</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleDeletePost();
                  }}
                >
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <Typography>Delete</Typography>
                </MenuItem>
              </Box>
            )}
          </Menu>
        </Box>
      </Box>
      <Typography mt={1}>{props.content}</Typography>
      {/* <Box position="relative" height={400} mt={1.5}>
        <Image
          src="/demoPost.png"
          fill
          alt="Post"
          style={{
            objectFit: "cover",
          }}
        />
      </Box> */}

      {/* <Box
        mt={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <PetsOutlinedIcon />
          <Typography ml={1} variant="footnote">
            7,2k likes
          </Typography>
        </Box>

        <Typography variant="footnote">4,2k comments</Typography>
      </Box> */}

      <Divider sx={{ my: 1.5 }} />

      <Actions
        id={props.id}
        userId={user.id}
        likes={props.likes}
        handleFocusInputComment={handleFocusInputComment}
      />

      <Divider sx={{ my: 1.5 }} />

      <Box>
        <Box display="flex" alignItems="center" justifyContent="end">
          {props.comments.length - numberOfComment.current > 0 && (
            <Box flex={1} onClick={handleLoadMoreComment}>
              <Typography
                variant="footnote"
                color={theme.palette.grey[600]}
                sx={{
                  transition: "0.2s",
                  cursor: "pointer",
                  ":hover": {
                    fontWeight: 600,
                    color: theme.palette.common.black,
                    textDecoration: "underline",
                  },
                }}
              >
                See more {NUMBER_OF_COMMENTS_WILL_LOAD_MORE} comments
              </Typography>
            </Box>
          )}
          <Box>
            <IconButton>
              <TuneRoundedIcon />
            </IconButton>
          </Box>
        </Box>
        <Box>
          {comments?.map((comment) => (
            <Comment key={comment.id} id={user.id} data={comment} />
          ))}
        </Box>
      </Box>

      <CommentInput
        ref={inputCommentRef}
        handleRefreshCommentList={handleRefreshCommentList}
        name={user.name}
        postId={props.id}
      />
    </Box>
  );
};

export default memo(Post);
