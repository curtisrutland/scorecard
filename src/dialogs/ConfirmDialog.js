import React, { PureComponent } from "react";
import { withStyles } from "material-ui/styles";

export class ConfirmDialog extends PureComponent {
    handleRequestClose = () => {
        this.props.onRequestClose(this.props.selectedValue);
    }

    render() {
        return (
            <div></div>
        );
    }
}