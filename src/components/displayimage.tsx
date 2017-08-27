import * as React from "react";
import { Image } from "semantic-ui-react";


interface IDisplayImageProps {
  data: string;
  mime: string;
}

const DisplayImage = (props: IDisplayImageProps) => {
  return (
    <Image
      src={`data:${props.mime};base64,${props.data}`}
      centered={true}
      style={{
        maxWidth: "100%",
      }}
    />
  );
};

export default DisplayImage;
