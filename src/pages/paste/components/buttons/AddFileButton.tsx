import { Buffer } from "buffer";
import { File as PasteFile, MetaData } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { arrayPush } from "redux-form";
import Button from "semantic-ui-react/dist/es/elements/Button";

import { PasteFileTypes } from "reducers/form";
import { IReducer } from "reducers/index";


export interface IAddFileButtonDispatchProps {
  addFile: (name: string, data: string, meta: MetaData, type: PasteFileTypes) => void;
}

type PropsType = IAddFileButtonDispatchProps;

class AddFileButton extends React.Component<PropsType, {}> {
  private input: HTMLElement;

  constructor(props) {
    super(props);

    this.uploadFile = this.uploadFile.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  public render() {
    return (
      <React.Fragment>
        <input
          type="file"
          hidden={true}
          ref={(input) => this.input = input}
          multiple={true}
          onChange={this.handleClick}
        />
        <Button onClick={this.uploadFile} secondary={true} type="button">
          Upload File
        </Button>
      </React.Fragment>
    );
  }

  private uploadFile() {
    this.input.click();
  }

  private handleClick(event) {
    Array.from(event.target.files).map((file: File) => {
      const reader: FileReader = new FileReader();

      reader.addEventListener("load", () => {
        const data = reader.result;
        let byteString: string;
        if (typeof data === 'string') {
          // base64,...
          byteString = data.split(",")[1];
        } else {
          // array buffer not supported
          return;
        }

        let ty: PasteFileTypes;
        if (PasteFile.isReadable(file.type)) {
          ty = PasteFileTypes.CODE;
          // code files are stored in plaintext
          byteString = Buffer.from(byteString, "base64").toString();
        } else {
          ty = PasteFileTypes.FILE;
          byteString = byteString;
        }

        const meta: MetaData = {
          mime: file.type,
          highlight: "auto",
        };

        this.props.addFile(file.name, byteString, meta, ty);
      })

      reader.readAsDataURL(file);
    });
  }
}

const mapDispatchToProps = (dispatch: Dispatch<IReducer>): IAddFileButtonDispatchProps => ({
  addFile: (name: string, data: string, meta: MetaData, type: PasteFileTypes) => (
    dispatch(arrayPush("createpaste", "files", {
      data,
      meta,
      name,
      type,
    }))
  ),
});

export default connect(() => ({}), mapDispatchToProps)(AddFileButton);
