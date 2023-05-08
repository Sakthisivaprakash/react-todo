import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { Typography, Paper, Grid, Button } from "@mui/material";
import { TodoList } from "../../components";
import { STATUS } from "../../constants/todo-status";
import { TodoContext } from "../../store/todo-context";
// import { DragDropContext } from 'react-beautiful-dnd';

const PaperColumn = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
}));

const TodoMain: React.FC = () => {
  // context value
  const todoCtx: any = useContext(TodoContext);

  // Raw To Do Data
  //   const [rawData, setRawData] = useState(todoCtx.todoList);

  // Filter Data by Status
  const [todoData, setTodoData] = useState([]);
  const [inProgressData, setInprogressData] = useState([]);
  const [completedData, setCompletedData] = useState([]);

  // Router Navigation Hook
  const navigate = useNavigate();

  // Update on Rawdata change
  useEffect(() => {
    if (todoCtx?.todoList) {
      setTodoData(
        todoCtx?.todoList?.filter((x: any) => x.status === STATUS.TODO)
      );
      setInprogressData(
        todoCtx?.todoList?.filter((x: any) => x.status === STATUS.INPROGRESS)
      );
      setCompletedData(
        todoCtx?.todoList?.filter((x: any) => x.status === STATUS.DONE)
      );
    }
  }, [todoCtx]);

  return (
    <div style={{ height: "calc(100vh - 60px)" }}>
      <div className="d-flex justify-content-between">
        <Typography variant="h4" component="h4">
          To-do List
        </Typography>
        <Button
          variant="contained"
          startIcon={<NoteAddIcon />}
          onClick={() => navigate("detail")}
        >
          Create Task
        </Button>
      </div>
      <Grid
        container
        spacing={2}
        sx={{ height: "calc(100% - 60px)", marginTop: "20px" }}
      >
        <Grid item xs={2}>
          <PaperColumn>
            <Typography variant="h6" component="h6" className="pc-head">
              ToDo
            </Typography>
            <TodoList todos={todoData} noDataPlaceHolder="No Todo task found" />
          </PaperColumn>
        </Grid>
        <Grid item xs={2}>
          <PaperColumn>
            <Typography variant="h6" component="h6" className="pc-head">
              In Progress
            </Typography>
            <TodoList todos={inProgressData} noDataPlaceHolder="No In-Progress task found" />
          </PaperColumn>
        </Grid>
        <Grid item xs={2}>
          <PaperColumn>
            <Typography variant="h6" component="h6" className="pc-head">
              Done
            </Typography>
            <TodoList todos={completedData} />
          </PaperColumn>
        </Grid>
      </Grid>
    </div>
  );
};

export default TodoMain;
