import React, { useState, useRef, useEffect } from "react";
import { BiCloudUpload } from "react-icons/bi";

const CustomFileInputNew = ({ onDataChange, onBase64Change, defaultFile, isHeight = false }) => {
    const [selectedImage, setSelectedImage] = useState(defaultFile || null);
    const fileInputRef = useRef(null);
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64Data = event.target.result;
                setSelectedImage(base64Data);
                onBase64Change(base64Data); // Callback to handle base64 data
                onDataChange(selectedFile); // Callback to handle file data
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleImageClick = () => {
        // if (isView === false) {
        fileInputRef.current.click();
        // }
    };
    const handleImageOpen = () => {
        // Open the image in a new tab when it's clicked
        if (selectedImage) {
            window.open(selectedImage);
        }
    };

    useEffect(() => {
        if (defaultFile) {
            setSelectedImage(defaultFile);
        }
    }, [defaultFile]);

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
            />

            <div
                style={{
                    width: "100%",
                    // height: isHeight ? "150px" : "250px",
                    height: "100%",
                    height: isHeight ? "150px" : "",
                    border: "1px solid #ccc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    padding: "40px",
                }}
                onClick={handleImageClick}
            >
                {selectedImage ? (
                    <img
                        src={selectedImage}
                        alt="Selected"
                        style={{
                            width: "50%",
                            //  height: "250px",
                            // height: isHeight ? "130px" : "230px",
                            height: isHeight ? "130px" : "",
                            // imageRendering: "-webkit-optimize-contrast",
                        }}
                    // onClick={handleImageOpen} // Add click event handler to open the image
                    />
                ) : (
                    <div style={{ textAlign: "center" }}>
                        <BiCloudUpload size={30} color="gray" />
                        <p style={{ color: "gray", fontSize: "21px", fontWeight: 700 }}>
                            Click Here To Upload Image
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomFileInputNew;