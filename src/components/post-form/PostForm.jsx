import React, { useCallback, useEffect } from "react"; 
import { useForm, Controller } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    let file = null;
    if (data.image?.[0]) {
      file = await appwriteService.uploadFile(data.image[0]);
      if (file && post) {
        await appwriteService.deleteFile(post.featuredImage);
      }
    }

    const payload = {
      ...data,
      ...(file ? { featuredImage: file.$id } : {}),
      ...(post ? {} : { userId: userData.$id })
    };

    const dbPost = post
      ? await appwriteService.updatePost(post.$id, payload)
      : await appwriteService.createPost(payload);

    if (dbPost) navigate(`/post/${dbPost.$id}`);
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");

    return "";
}, []);

  useEffect(() => {
    const sub = watch((vals, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(vals.title), { shouldValidate: true });
      }
    });
    return () => sub.unsubscribe();
  }, [watch, setValue, slugTransform]);

  const styles = {
    form: {
      display: "flex",
      flexWrap: "wrap",
      margin: "-0.5rem",           // to counter child horizontal padding
    },
    left: {
      width: "66.6667%",           // 2/3
      padding: "0.5rem",
      boxSizing: "border-box",
    },
    right: {
      width: "33.3333%",           // 1/3
      padding: "0.5rem",
      boxSizing: "border-box",
    },
    mb4: {
      marginBottom: "1rem",
    },
    fullWidth: {
      width: "100%",
      boxSizing: "border-box",
    },
    imagePreview: {
      width: "100%",
      marginBottom: "1rem",
      borderRadius: "0.5rem",
      display: "block",
    },
    submitBtn: {
      width: "100%",
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} style={styles.form}>
      <div style={styles.left}>
        <div style={styles.mb4}>
          <Input
            label="Title:"
            placeholder="Title"
            style={styles.fullWidth}
            {...register("title", { required: true })}
          />
        </div>
        <div style={styles.mb4}>
          <Input
            label="Slug:"
            placeholder="Slug"
            style={styles.fullWidth}
            /*{...register("slug", { required: true })}
            onInput={(e) => setValue("slug", slugTransform(e.target.value), { shouldValidate: true })} */
            {...register("slug", { required: true })}
          />
        </div>
        <div style={styles.mb4}>
          <RTE
            label="Content:"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
      </div>
      <div style={styles.right}>
        <div style={styles.mb4}>
          <Input
            label="Featured Image:"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            style={styles.fullWidth}
            {...register("image", { required: !post })}
          />
        </div>
        {post && (
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            style={styles.imagePreview}
          />
        )}
        <div style={styles.mb4}>
          <Select
            options={["active", "inactive"]}
            label="Status"
            style={styles.fullWidth}
            {...register("status", { required: true })}
          />
        </div>
        <Button
          type="submit"
          style={{ 
            ...styles.submitBtn,
            backgroundColor: post ? "#22C55E" : undefined,
            color: post ? "#fff" : undefined
          }}
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
