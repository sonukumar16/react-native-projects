const initialData = {
    data: [],
    loading: false
};

export const reducer = (state = initialData, action) => {
    const { type, payload, index } = action;
    switch (type) {
        case 'FETCHED_EMPLOYEES':
            return { ...state, data: payload, loading: false }
        case 'DELETE_EMPLOYEE':
            return { ...state, data: state.data.filter(item => item._id != payload._id), loading: false }

        case 'ADDED_EMPLOYEES':
            return { ...state, data: [payload, ...state.data], loading: false };
        case 'UPDATED_EMPLOYEES':
            const newItems = [...state.data];
            const newItem = Object.assign({}, newItems[index], payload);
            newItems[index] = newItem;
            return { ...state, data: newItems, loading: false };
        case 'ADDING_EMPLOYEE':
        case 'DELETEING_EMPLOYEE':
        case 'FETCHING_EMPLOYEES':
            return { ...state, loading: true }
        default:
            return state;
    }
};

