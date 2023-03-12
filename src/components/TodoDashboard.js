import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationBar } from "./NavigationBar";
import { AlertBar } from "./AlertBar";
import { get_todo_data } from "../actions/todoListActions";
import { update_todo_data } from "../actions/todoListActions";

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { 
  Typography,
  CircularProgress, 
  useMediaQuery
} from "@mui/material";


export const TodoDashboard = () => {
  const dispatch = useDispatch();
  const screenLg = useMediaQuery('(min-width:768px)');

  const get_todos_loading = useSelector(state => state.todos.get_todos_loading)
  const todos = useSelector(state => state.todos.todos)

  const [todoData, setTodoData] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const [alertContent, setAlertContent] = useState('')

  const toggleTodoItem = (todo) => () => { 
    const data = {
      isComplete: !todo.isComplete
    }
    dispatch(
      update_todo_data(parseInt(todo.id), data)
    ).then(() => {
      if (!todo.isComplete === true) {
        setShowAlert(true)
        setAlertContent(`You've completed ${todo.description}!`)
        setTimeout(() => {
          setShowAlert(false)
          setAlertContent('')
        }, 3000);
      }
    })
  };

  const sortTodos = (data) => {
    data.sort((t1, t2) => {
      // sort todos by isComplete
      if (t1.isComplete && !t2.isComplete) {
        return 1;
      } else if (!t1.isComplete && t2.isComplete) {
        return -1;
      }
      
      // sort todos by dueDate
      if (t1.dueDate && t2.dueDate) {
        const dateT1 = new Date(t1.dueDate);
        const dateT2 = new Date(t2.dueDate);
        if (dateT1 < dateT2) {
          return -1;
        } else if (dateT1 > dateT2) {
          return 1;
        }
      } else if (t1.dueDate) {
        return -1;
      } else if (t2.dueDate) {
        return 1;
      }
      return 0;
    });
    return data; 
  } 

  useEffect(() => {
    dispatch(
      get_todo_data()
    ).then(res => {
      const sortedData = sortTodos(res)
      setTodoData([...sortedData])
    })
  }, [dispatch])

  useEffect(() => {
    let updatedTodoItems = JSON.parse(JSON.stringify(todos));
    const sortedData = sortTodos(updatedTodoItems)
    setTodoData([...sortedData])
  }, [todos])

  return (
    <Box>
      <NavigationBar />
      <AlertBar showAlert={showAlert} alertContent={alertContent} />
      <Box 
      sx={{ 
        display: screenLg ? 'flex' : 'block', 
        justifyContent: screenLg ? 'center' : ''
      }}
      >
        { !get_todos_loading ?
          <List 
          sx={{ 
            width: '100%', 
            maxWidth: screenLg ? 360 : null, 
            marginTop: screenLg ? 20 : 10
          }}
          >
            {todoData.map((todo) => {
              const labelId = `checkbox-list-label-${todo.id}`;
              return (
                <ListItem
                  key={todo.id}
                  disablePadding
                  secondaryAction={
                    <Typography sx={{ textDecoration: todo.isComplete ? 'line-through' : null }}>
                      {todo.dueDate}
                    </Typography>
                  }
                  sx={{   
                    bgcolor: 'inherit' ,
                    ...(todo.isComplete && {
                      bgcolor: 'rgba(105, 240, 174, 0.65)'
                    }),
                    ...(todo.overDue && !todo.isComplete && {
                      bgcolor: 'rgba(255, 82, 82, 0.65)'
                    })
                  }}
                >
                  <ListItemButton onClick={toggleTodoItem(todo)} dense>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={todo.isComplete}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText 
                    id={labelId} 
                    primary={todo.description} 
                    sx={{ 
                      textDecoration: todo.isComplete ? 'line-through' : null 
                    }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        :
          <Box sx={{ padding: 25 }}>
            <CircularProgress size={50} />
          </Box>
        }
      </Box>
    </Box>
  );
}