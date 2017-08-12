import * as React from "react";


interface IDisplayImageProps {
  data: string;
  mime: string;
}

const DisplayImage = (props: IDisplayImageProps) => {
  return (
    <img src={`data:${props.mime};base64,${props.data}`} />
  );
};

export default DisplayImage;
