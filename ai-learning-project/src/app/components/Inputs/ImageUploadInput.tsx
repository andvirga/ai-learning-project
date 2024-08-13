import React, { useState } from "react";
import { Button } from "@mui/material";

type Props = {
  onImageUpload: (base64String: string | ArrayBuffer | null) => void;
};

const ImageUploadInput = ({ onImageUpload }: Props) => {
  const [path, setPath] = useState<string>();

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        if (onImageUpload) {
          onImageUpload(base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="contained-button-file"
        type="file"
        onChange={handleImageUpload}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload Image
        </Button>
      </label>
    </div>
  );
};

export default ImageUploadInput;
