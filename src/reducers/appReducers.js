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