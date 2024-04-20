import React, { useEffect, useRef, useState } from "react";
import PCModal, { PCModalProps } from ".";
import NameWithAvatar from "../name-with-avatar";
import { useUser } from "@/app/hooks/useUser";
import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import PCTextField from "../textfield";
import Image from "next/image";
import { theme } from "@/app/theme";
import SendIcon from "@mui/icons-material/Send";
import { useAddPost } from "@/app/services/post";
import toast from "react-hot-toast";
import { useUploadImage } from "@/app/hooks/useUploadImage";

const CreatePostModal = (props: Omit<PCModalProps, "children">) => {
  const { user } = useUser();
  const { mutate, isLoading } = useAddPost();
  const [inputValue, setInputValue] = useState<string>("");
  const [images, setImages] = useState<File[] | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [previews, setPreviews] = useState<string[] | null>(null);

  useEffect(() => {
    if (!images) {
      return;
    }
    if (images.length === 0) {
      setPreviews(null);
      return;
    }

    const newPreviews = images?.map((image) => URL.createObjectURL(image));
    setPreviews(newPreviews);

    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const { upload } = useUploadImage();

  const handleAddPost = async () => {
    if (!inputValue) return;
    const imageList = [];

    if (images?.length) {
      for (const image of images) {
        const data = await upload(image);
        imageList.push(data);
      }
    }

    mutate(
      {
        content: inputValue,
        images: imageList,
      },
      {
        onSuccess: () => {
          toast.success("Create post successfully.");
          props.onClose?.({}, "escapeKeyDown");
        },
      }
    );
  };

  if (!user?.name) return null;

  return (
    <PCModal title="Create new post" {...props}>
      <>
        <NameWithAvatar name={user.name} />
        <Box>
          <PCTextField
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            fullWidth
            multiline
            rows={6}
            autoFocus
            placeholder={`${user.name}, what are you thinking...`}
            sx={{ bgcolor: "transparent" }}
          />
          <Box>
            {previews &&
              previews?.length &&
              previews.map((preview) => (
                <Box
                  textAlign="center"
                  mt={1}
                  key={preview}
                  bgcolor={theme.palette.grey[200]}
                >
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    src={preview}
                    alt={preview}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxWidth: 400,
                    }}
                    objectFit="contain"
                  />
                </Box>
              ))}
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box
          display="flex"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography color={theme.palette.grey[400]}>
            Add to your post
          </Typography>
          <Box>
            <IconButton onClick={() => imageInputRef.current?.click()}>
              <TextField
                inputRef={imageInputRef}
                type="file"
                inputProps={{
                  accept: "image/png, image/gif, image/jpeg",
                  multiple: true,
                }}
                onChange={(e) => setImages(Array.from(e.target.files))}
                sx={{ display: "none" }}
              />
              <Image
                src="/icons/camera.svg"
                alt="camera"
                width={24}
                height={24}
              />
            </IconButton>
          </Box>
        </Box>

        <Button
          onClick={handleAddPost}
          disabled={isLoading || !inputValue}
          endIcon={<SendIcon />}
          variant="contained"
          color="primary"
          fullWidth
        >
          Post
        </Button>
      </>
    </PCModal>
  );
};

export default CreatePostModal;
