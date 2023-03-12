import moment from "moment";
import { 
  GET_TODO_DATA, 
  GET_TODO_DATA_LOADING,
  UPDATE_TODO_DATA,
  UPDATE_TODO_DATA_LOADING 
} from "../types"

const initialState = {
  todos: [],
  get_todos_loading: false,
  update_todos_loading: false
}

export const todoReducer = (state = initialState, action) => {
  switch (action.type) { 
      case GET_TODO_DATA:
          const newTodoItems = [...action.payload]
          // format dueDate
          for (let t in newTodoItems) {
            if (newTodoItems[t].dueDate) {
              const dueDate = new Date(newTodoItems[t].dueDate)
              const formattedDueDate = moment(dueDate).format('MM/DD/YYYY')
              newTodoItems[t].dueDate = formattedDueDate
              
              const formattedDueDateToCheck = moment(dueDate).format('YYYY-MM-DD')
              if (moment(formattedDueDateToCheck).isBefore('2021-01-01')) {
                newTodoItems[t].overDue = true
              } else {
                newTodoItems[t].overDue = false
              }
            }
          }
          return {
            ...state,
            todos: newTodoItems,
          }
      case UPDATE_TODO_DATA:
        let updatedData = action.payload
        let updatedTodoItems = JSON.parse(JSON.stringify(state.todos));
        const index = updatedTodoItems.findIndex((obj) => parseInt(obj.id) === updatedData.id);
        if (index !== -1) {
          updatedTodoItems[index].isComplete = updatedData.data.isComplete;
        }
        return {
          ...state,
          todos: updatedTodoItems
        }
      case GET_TODO_DATA_LOADING:
        return {
          ...state,
          get_todos_loading: action.payload,
        }
      case UPDATE_TODO_DATA_LOADING:
        return {
          ...state,
          update_todos_loading: action.payload
        }
      default: 
        return state
  }
}