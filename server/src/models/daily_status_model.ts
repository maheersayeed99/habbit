import { pool } from "../../database/database"
interface Pool_Object {
    activity: string;

} 
interface Pool_Query {
    rows : Array<Pool_Object>
}


class daily_status_model{

    static get_all_status = () => {
        const current_query = `SELECT * FROM daily_status;`;
        return pool.query(current_query)
        .then((result: Pool_Query) => {
            console.log('successful query');
            result.rows.forEach((element: any) => {
                console.log(element.activity);
            });
            return result.rows;
        })
        .catch((error: Error) => {
            console.log(error);
            return error;
        });
    }


    static update_entry = (curr_activity :string) => {

        curr_activity = curr_activity.toLowerCase();

        var current_query = `UPDATE daily_status 
                            SET progress = progress + 1 
                            WHERE activity = '${curr_activity}' 
                            AND progress < frequency;
                            
                            UPDATE daily_status
                            SET completed = true
                            WHERE activity = '${curr_activity}'
                            AND progress = frequency;
                            `;
        console.log(current_query);
        return pool.query(current_query)
        .then((result : Pool_Query)=> {
            console.log("query successful");
            return result.rows;
        })
        .catch((error : Error )=> {
            console.log(error.message);
            return error;
        });
    }

    static get_todo = () => {
        var current_query = `SELECT * FROM daily_status WHERE completed = false;`;

        console.log(current_query)

        return pool.query(current_query)
        .then((result : Pool_Query) => {
            console.log("query successful");
            const todo_array = new Array<string>;
            result.rows.forEach((element) => {
                todo_array.push(element.activity);
            })

            return todo_array;
        })
        .catch((error : Error) => {
            console.log(error);
            console.log(error.message);
        })
    }

    static get_completed = () => {
        var current_query = `SELECT * FROM daily_status WHERE completed = true;`;

        console.log(current_query)

        return pool.query(current_query)
        .then((result : Pool_Query) => {
            console.log("query successful");
            return result.rows;
        })
        .catch((error : Error) => {
            console.log(error);
            console.log(error.message);
        })
    }



    static clean_all = () => {

        var current_query = `UPDATE daily_status 
                            SET progress = 0,
                                completed = false;
                            `;
        console.log(current_query);
        return pool.query(current_query)
        .then((result : Pool_Query)=> {
            console.log("query successful");
            return result.rows;
        })
        .catch((error : Error )=> {
            console.log(error.message);
            return error;
        });

    }

    // static update_entry = (activity : string) => {

    //     const current_query : string = `UPDATE daily_status SET progress = progress + 1  WHERE activity = ${activity};`
    //     return pool.query(current_query)
    //     .then((result: any) => {
    //         console.log('successful query');
    //         return result;
    //     })
    //     .catch((error: any) => {
    //         console.log(error.message);
    //         return error
    //     })
        
    // }
}


export {daily_status_model};