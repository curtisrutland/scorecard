import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
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

function Score(props) {
    let { score, par } = props;
    let text = `Par: ${par} Score: ${score}`;
    return (
        <Typography color="inherit">{text}</Typography>
    );
}

function ButtonAppBar(props) {
    const { classes, score, par } = props;
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
                        <Score score={score} par={par} />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(ButtonAppBar);