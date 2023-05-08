import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Button,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/Delete";

import { STATUS, statusOptions } from "../../constants/todo-status";
import { TodoContext } from "../../store/todo-context";
import { generateRandomId } from "../../utils";
import { TodoData } from "../../types/TodoData";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  deadLine: yup.string().required("DeadLine date is required"),
});

const TodoDetail: React.FC = () => {
  let { todoId } = useParams();
  const [editData, setEditData] = useState<TodoData>();
  // Router Navigation Hook
  const navigate = useNavigate();

  const { addTodoItem, updateTodoItem, deleteTodoItem, todoList } = useContext(TodoContext);

  useEffect(() => {
    if (todoId) {
      const toEdit = todoList.find((x) => x.id === Number(todoId));
      if (toEdit) {
        setEditData(toEdit);
      } else {
        navigate("/");
      }
    }
  }, [todoId, todoList, navigate]);

  const formik = useFormik({
    initialValues: {
      name: editData ? editData.name : "",
      description: editData ? editData.description : "",
      status: editData ? editData.status : STATUS.TODO,
      deadLine: editData ? editData.deadLine : moment().format("YYYY-MM-DD"),
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      if(editData) {
        updateTodoItem(editData.id, {
          name: values.name,
          description: values.description,
          status: values.status,
          deadLine: moment(values.deadLine).format("YYYY-MM-DD")
        })
      } else {
        addTodoItem({
          id: generateRandomId(),
          name: values.name,
          description: values.description,
          status: values.status,
          deadLine: moment(values.deadLine).format("YYYY-MM-DD")
        });        
      }
      navigate("/");
    },
  });

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value, "SelectChangeEvent");
    formik.setFieldValue("status", event.target.value);
  };

  const handleDelete = () => {
    const id = editData!.id;
    deleteTodoItem(id);
    navigate("/");
  };

  return (
    <div>
      <h2>Todo Detail</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="row form-field">
          <div className="col col-md-4">
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </div>
        </div>
        <div className="row form-field">
          <div className="col col-md-4">
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </div>
        </div>
        <div className="row form-field">
          <div className="col col-md-4">
            <TextField
              fullWidth
              id="deadLine"
              name="deadLine"
              label="DeadLine"
              type="date"
              value={formik.values.deadLine}
              onChange={formik.handleChange}
              error={formik.touched.deadLine && Boolean(formik.errors.deadLine)}
              helperText={formik.touched.deadLine && formik.errors.deadLine}
            />
          </div>
        </div>
        <div className="row form-field">
          <div className="col col-md-4">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.status}
                label="Status"
                onChange={(e) => handleChange(e)}
              >
                {statusOptions.map((item, idx) => {
                  return (
                    <MenuItem key={idx} value={item.value}>
                      {item.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Button variant="contained" type="submit">
            {editData ? "Update" : "Submit"}
          </Button>

          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete()}
            style={{marginLeft: '20px'}}
          >
            Delete
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TodoDetail;
