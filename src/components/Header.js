import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const styles = theme => ({
    root: {
        width: '100%',
    },
    wrapper: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center"
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});

function ButtonAppBar(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={props.onClick}>
                        <MenuIcon />
                    </IconButton>
                    <div className={classes.wrapper}>
                        <Typography type="title" color="inherit">
                            Scorecard
                        </Typography>
                        <Button color="contrast">Login</Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(ButtonAppBar);