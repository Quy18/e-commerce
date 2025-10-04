import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { useDropzone } from "react-dropzone";
import { Image } from "react-bootstrap";
import { FileType } from "../../types";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row" as "row",
  flexWrap: "wrap" as "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};


export type DropFilesRef = {
  getFile: () => FileType | null;
  openDialog: () => void;
  clearFile: () => void;
};

export const DropFiles = forwardRef<DropFilesRef>((_, ref) => {
  const [file, setFile] = useState<FileType | null>(null);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    noClick: true,   // không click vùng dropzone
    multiple: false,
    onDrop: (acceptedFiles) => {
      const selectedFile: FileType = {
        file: acceptedFiles[0],                          // giữ file gốc
        preview: URL.createObjectURL(acceptedFiles[0]),  // tạo preview
      };
      setFile(selectedFile);
    },
  });

  // expose methods ra ngoài
  useImperativeHandle(ref, () => ({
    getFile: () => file,
    openDialog: () => open(),
    clearFile: () => setFile(null),
  }));

  useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p className="text-center">Drag 'n' drop some files here</p>
      </div>
      <aside style={thumbsContainer}>
        {file && (
          <div style={thumb} key={file.file.name}>
            <div style={thumbInner}>
              <Image src={file.preview} style={img} alt={file.file.name} />
            </div>
          </div>
        )}
      </aside>
    </section>
  );
});
