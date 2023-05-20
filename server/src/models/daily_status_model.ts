import { pool } from "../../database/database"
interface Pool_Object {
    activity: string;
    frequency: number;
    span: number;
    streak: number;
    progress: number;
    completed: boolean;
    days_left:number;
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
                            SET completed = true,
                                days_left = span
                            WHERE activity = '${curr_activity}'
                            AND progress = frequency;

                            SELECT * FROM daily_status
                            WHERE activity = '${curr_activity}';
                            `;
        console.log(current_query);
        return pool.query(current_query)
        .then((result : Array<Pool_Query>)=> {
            console.log("query successful");
            return result[2].rows[0].completed;
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
                if (element.frequency == 1){
                    todo_array.push(element.activity);
                }
                else {
                    todo_array.push(element.activity + " " + element.progress + " out of " + element.frequency);
                }
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


    static get_streaks = () => {
        var current_query = `SELECT * FROM daily_status;`;

        console.log(current_query)

        return pool.query(current_query)
        .then((result : Pool_Query) => {
            console.log("query successful");
            const todo_array = new Array<string>;
            result.rows.forEach((element) => {
                todo_array.push(element.activity + " " + element.streak + " streak");
                })
            return todo_array;
        })
        .catch((error : Error) => {
            console.log(error);
            console.log(error.message);
        })
    }


    static daily_update = () => {

        var current_query = `SELECT * FROM daily_status;`;
        console.log(current_query)
        return pool.query(current_query)
        .then((result : Pool_Query) => {
            console.log("query successful");
            // const todo_array = new Array<string>;
            result.rows.forEach((element) => {
                element.days_left -= 1;
                
                if (element.days_left < 0) {
                    element.streak = 0;
                    element.days_left = 0;
                }
                else if (element.completed) {
                    element.streak += 1;
                    
                }
                if (element.days_left == 0){
                    element.completed = false;
                }

                element.progress = 0;

                var new_query = `UPDATE daily_status 
                                    SET streak = ${element.streak},
                                        progress = ${element.progress},
                                        days_left = ${element.days_left},
                                        completed = ${element.completed}
                                    WHERE activity = '${element.activity}';`;

                pool.query(new_query);
            })
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
                                completed = false,
                                streak = 0;
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

}


export {daily_status_model};