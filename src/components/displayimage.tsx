import * as React from 'react'


interface DisplayImageProps {
  data: string,
  mime: string
}

const DisplayImage = (props: DisplayImageProps) => {
  return (
    <img src={`data:${props.mime};base64,${props.data}`} />
  );
};

export default DisplayImage;
