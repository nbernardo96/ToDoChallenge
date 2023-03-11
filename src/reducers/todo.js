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
              const dueDateStr = newTodoItems[t].dueDate
              const dueDate = new Date(dueDateStr)
              const formattedDateStr = moment(dueDate).format('MM/DD/YYYY')
              const formattedDateStrToCheck = moment(dueDate).format('YYYY-MM-DD')
              newTodoItems[t].dueDate = formattedDateStr

              if (moment(formattedDateStrToCheck).isBefore('2021-01-01')) {
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
        let updatedTodoItems = JSON.parse(JSON.stringify(state.todos));
        let updatedData = action.payload
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