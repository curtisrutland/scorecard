import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import { FormControl } from "material-ui/Form";
import { MenuItem } from "material-ui/Menu";
import Input, { InputLabel } from "material-ui/Input";
import Select from "material-ui/Select";
import TextField from 'material-ui/TextField';

const limits = {
    stroke: {
        min: -5,
        max: 5
    }, par: {
        min: 0,
        max: 5
    }
};
const styles = theme => ({
    root: theme
        .mixins
        .gutters({ paddingTop: 16, paddingBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }),
    headline: {
        flexGrow: 0,
        flexShrink: 1
    },
    wrapper: {
        display: "flex"
    },
    pad: {
        marginLeft: theme.spacing.unit * 4
    }
});

export class ScorecardItem extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            editing: false
        };
    }

    static defaultProps = {
        id: 0,
        name: "Test",
        score: 0,
        par: 3,
        onChange: ({ id, field, value }) => console.log(`Id: ${id}, new ${field}: ${value}`)
    };

    handleParChanged(value) {
        let id = this.props.id, field = "par";
        this.props.onChange({ id, field, value });
    }

    handleScoreChanged(value) {
        let id = this.props.id, field = "score";
        this.props.onChange({ id, field, value });
    }

    handleNameChanged(value) {
        let id = this.props.id, field = "name";
        this.props.onChange({ id, field, value });
    }

    toggleEditing() {
        let newEditingState = !this.state.editing;
        console.log(newEditingState);
        this.setState({ editing: newEditingState });
    }

    getMenuItems(limit) {
        let items = [];
        for (let i = limit.min; i <= limit.max; i++) {
            items.push(
                <MenuItem key={i} value={i}>{i}</MenuItem>
            );
        }
        return items;
    }

    renderStaticName() {
        return <Typography onClick={() => this.toggleEditing()} type="headline" className={this.props.classes.headline}>{this.props.name}</Typography>;
    }

    renderEditableName() {
        return <TextField label="Hole" value={this.props.name} onChange={e => this.handleNameChanged(e.target.value)} onBlur={() => this.toggleEditing()} />;
    }

    renderName() {
        return this.state.editing
            ? this.renderEditableName()
            : this.renderStaticName();
    }

    renderPar() {
        return (
            <FormControl>
                <InputLabel htmlFor="par">Par</InputLabel>
                <Select
                    value={this.props.par}
                    onChange={e => this.handleParChanged(e.target.value)}
                    input={<Input id="par" />}
                >
                    {this.getMenuItems(limits.par).map(i => i)}
                </Select>
            </FormControl>
        );
    }

    renderScore() {
        return (
            <FormControl className={this.props.classes.pad}>
                <InputLabel htmlFor="score">Score</InputLabel>
                <Select
                    value={this.props.score}
                    onChange={e => this.handleScoreChanged(e.target.value)}
                    input={<Input id="score" />}
                >
                    {this.getMenuItems(limits.stroke).map(i => i)}
                </Select>
            </FormControl>
        );
    }

    renderScoreAndPar() {
        return (
            <div className={this.props.classes.wrapper}>
                {this.renderPar()}
                {this.renderScore()}
            </div>
        );
    }

    render() {
        return (
            <div>
                <Paper className={this.props.classes.root}>
                    {this.renderName()}
                    {this.renderScoreAndPar()}
                </Paper>
            </div>

            // <div className={this.props.classes.root}>     <span>{state.name}</span>
            // <span>{state.par}</span>     <span>{state.score}</span> </div>
        );
    }
}

export default withStyles(styles)(ScorecardItem);