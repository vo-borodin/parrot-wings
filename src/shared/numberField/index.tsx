import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    }
  })
);

interface Props {
  onSetValue: (value: number) => void;
}

interface State {
  value: string;
}

export default function NumberField(props: Props) {
  const classes = useStyles();
  const [state, setState] = React.useState<State>({
    value: ""
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(event.target.value);
    if (!isNaN(numValue)) {
      if (numValue >= 0) {
        setState({ value: event.target.value });
        props.onSetValue(numValue);
      }
    }
  };

  return (
    <TextField
      id="standard-number"
      label="Amount"
      value={state.value}
      onChange={handleChange}
      type="number"
      className={classes.textField}
      InputLabelProps={{
        shrink: true
      }}
      margin="normal"
    />
  );
}
