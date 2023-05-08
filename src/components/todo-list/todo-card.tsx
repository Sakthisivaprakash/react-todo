import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { TodoData } from "../../types/TodoData";
import moment from "moment";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

interface TodoCardProps {
  data: TodoData;
}

const Card = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
  height: "100%",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  position: "relative",
}));

const EditIcon = styled(IconButton)(() => ({
    position: 'absolute',
    right: '8px',
    top: '8px'
}))


const TodoCard: React.FC<TodoCardProps> = ({ data }) => {
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  return (
    <Card
      onMouseEnter={() => setShowMore(true)}
      onMouseLeave={() => setShowMore(false)}
      data-testid="todo-container"
    >
      {showMore && (
        <EditIcon data-testid="edit-button"  aria-label="more" onClick={() => navigate(`/detail/${data.id}`)}>
          <BorderColorIcon style={{fontSize: '20px'}} />
        </EditIcon>
      )}
      <h4>{data.name}</h4>
      <p>{data.description}</p>
      <div>{moment(data.deadLine).format("MM-DD-YYYY")}</div>
    </Card>
  );
};

export default TodoCard;
