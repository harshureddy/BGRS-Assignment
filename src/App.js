import "./App.css";
import { connect } from "react-redux";
import {
  simpleAction,
  getItems,
  ageDemographic,
} from "./Redux/Actions/simpleAction";
import React, { useEffect, useState } from "react";
import {
  Container,
  makeStyles,
  ListItemAvatar,
  Avatar,
  ListItemIcon,
  List,
  Box,
  ListItem,
  ListItemText,
  Divider,
  FormControl,
  CircularProgress,
  Grid,
  FormLabel,
} from "@material-ui/core";
import VideocamIcon from "@material-ui/icons/Videocam";
import AlbumIcon from "@material-ui/icons/Album";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  formHolder: {
    margin: "10px auto",
    border: "1px #ccc solid",
    maxWidth: "400px",
    position: "relative",
    borderRadius: "3px",
  },

  formTitle: {
    background: "#444444",
    padding: "5px 15px",
    "& h2": {
      margin: "0px",
      lineHeight: "normal",
      fontWeight: "normal",
      fontSize: "20px",
      color: "#fff",
    },
  },

  formHolderInner: {
    padding: "5px 15px",
  },

  formLabelText: {
    fontSize: "0.9rem",
    color: "#444",
  },

  loadingHolder: {
    position: "absolute",
    left: "0px",
    top: "0px",
    width: "100%",
    height: "100%",
    background: "#00000063",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "95%",
    border: "1px #ccc solid",
    padding: "0px 5px 0px 0px ",
    borderRadius: "3px",
    marginLeft: "0px",
    background: "#fff",
  },
  formControlInput: {
    width: "100%",
    fontSize: "1rem",
    border: 0,
    padding: "5px 15px",
    background: "#fff",
    "&:focus": {
      outline: "none",
    },
  },
}));

function App({
  simpleAction,
  users,
  getItems,
  items,
  ageDemographic,
  usersWith,
  loading,
}) {
  const [selectedItem, setSelectedItem] = useState("-1");
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const classes = useStyles();

  useEffect(() => {
    simpleAction();
  }, [simpleAction, getItems]);
  useEffect(() => {
    if (selectedItem === "0") alert("Please select Item");
    else if (selectedItem !== "0" && selectedItem !== "-1") {
      ageDemographic(selectedItem);
    }
  }, [selectedItem]);
  return (
    <div className="App">
      <Container maxWidth="md">
        <Box className={classes.formHolder} boxShadow={1}>
          <Grid container className={classes.formTitle}>
            <Grid xs={12}>
              <h2>Find Movie Name</h2>
            </Grid>
          </Grid>

          <Box className={classes.formHolderInner}>
            <Grid container>
              <Grid xs={12}>
                <FormLabel className={classes.formLabelText}>
                  Character
                </FormLabel>
                <FormControl variant="filled" className={classes.formControl}>
                  <select
                    className={classes.formControlInput}
                    onChange={(e) => setSelectedItem(e.currentTarget.value)}
                  >
                    <option value="0">Item</option>
                    {users.length > 0 &&
                      users.map((i) => (
                        <option key={i.name} value={i.films}>
                          {i.name}
                        </option>
                      ))}
                  </select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container>
              <Grid xs={12}>
                <FormLabel className={classes.formLabelText}>
                  List of Movies
                </FormLabel>
                <List component="nav" aria-label="contacts">
                  {usersWith &&
                    usersWith.map((f, indx) => (
                      <ListItem
                        selected={selectedIndex === indx}
                        button
                        key={indx}
                        onClick={() => {
                          setSelectedIndex(indx);
                          setTitle(f.data.title);
                          setReleaseDate(f.data.release_date);
                        }}
                      >
                        <ListItemIcon style={{ minWidth: "33px" }}>
                          <AlbumIcon />
                        </ListItemIcon>
                        <ListItemText secondary={f.data.title} />
                      </ListItem>
                    ))}
                </List>
              </Grid>
            </Grid>

            <Divider />
            <Grid container>
              <Grid xs={12}>
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <VideocamIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Name" secondary={title} />
                  </ListItem>
                </List>

                {usersWith && (
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <VideocamIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Year of Release" secondary={releaseDate} />
                    </ListItem>
                  </List>
                )}
              </Grid>
            </Grid>

            {loading === true && (
              <div className={classes.loadingHolder}>
                <CircularProgress color="#fff" />
              </div>
            )}
          </Box>
        </Box>
      </Container>
    </div>
  );
}
const mapStateToProps = (state) => ({
  users: state.simpleReducer.users,
  items: state.simpleReducer.items,
  usersWith: state.simpleReducer.usersWith,
  loading: state.simpleReducer.loading,
});
const mapDispatchToProps = (dispatch) => ({
  simpleAction: () => dispatch(simpleAction()),
  getItems: () => dispatch(getItems()),
  ageDemographic: (item) => dispatch(ageDemographic(item)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
