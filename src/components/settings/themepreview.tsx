import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { Field, reduxForm, WrappedFieldProps } from "redux-form";


const ThemePreview = () => {
  const code = hljs.highlight(
    "python",
    // tslint:disable-next-line:max-line-length
    "def helloworld(words):\n    return \" \".join(words)\n\nif __name__ == \"__main__\":\n    print(helloworld([\"Hello\", \"World\"]))",
  );

  return (
    <div>
      <pre>
        <code className="hljs python" dangerouslySetInnerHTML={{__html: code.value}} />
      </pre>
    </div>
  );
};

export default ThemePreview;
