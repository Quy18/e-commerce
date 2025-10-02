import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { useDropzone } from "react-dropzone";
import { Image } from "react-bootstrap";

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

type FileType = {
  name: string;
  size: number;
  type: string;
  preview: string;
};

export type DropFilesRef = {
  openDialog: () => void;
  clearFiles: () => void;
};

export const DropFiles = forwardRef<DropFilesRef>((_, ref) => {
  const [files, setFiles] = useState<FileType[]>([]);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    noClick: true,   // không click vùng dropzone
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    },
  });

  // expose methods ra ngoài
  useImperativeHandle(ref, () => ({
    openDialog: () => open(),
    clearFiles: () => setFiles([]),
  }));

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <Image src={file.preview} style={img} alt={file.name} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, 
    [files]
  );

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p className="text-center">Drag 'n' drop some files here</p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
});
