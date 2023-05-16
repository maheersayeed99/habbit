import { pool } from "../../database/database"

interface Pool_Query {
    rows : Map<string, string>
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



    static clean_all = () => {

        var current_query = `UPDATE daily_status 
                            SET progress = 0,
                                completed = false
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