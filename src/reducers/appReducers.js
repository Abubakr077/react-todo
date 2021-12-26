let initialData = [
    {
        "id": 1,
        "title": "Sample task 1",
        "desctiption": "Some description 1",
        "createdAt": new Date(),
    },
    {
        "id": 2,
        "title": "Sample task 2",
        "desctiption": "Some description 2",
        "createdAt": new Date(),
    },
    {
        "id": 3,
        "title": "Sample task 3",
        "desctiption": "Some description 3",
        "createdAt": new Date(),
    }
]
const AppReducer = (state = [], action) => {
    switch(action.type) {
        case 'UPDATE_NOTE_BOOKS':
            // return state.concat([action.data]);
            return {
                ...state,
                data: action.data
            };
        // case 'ADD_POINTS':
        //     // return state.concat([action.data]);
        //     return {
        //         ...state,
        //         data: state.data.forEach(item=>{
        //             if (item.id==action.id)
        //             {item.points=action.points
        //                 console.log(item)
        //             }
        //
        //         })
        //     };
        default:
            return state;
    }
}
export default AppReducer;