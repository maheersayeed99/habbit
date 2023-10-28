import { pool } from "../../database/database"
require('dotenv').config()


interface Pool_Object {
    activity: string;
    frequency: number;
    span: number;
    streak: number;
    progress: number;
    completed: boolean;
    completed_today:boolean;
    days_left:number;
    max_streak: number;
} 
interface Pool_Query {
    rows : Array<Pool_Object>
}

class daily_status_model{

    static get_all_status = () => {
        const current_query = `SELECT * FROM daily_status  WHERE active = true ORDER BY completed, completed_today, streak DESC, activity;`;
        return pool.query(current_query)
        .then((result: Pool_Query) => {
            console.log('successful query');
            return result.rows;
        })
        .catch((error: Error) => {
            console.log(error);
            return error;
        });
    }

    static get_disabled_status = () => {
        const current_query = `SELECT * FROM daily_status  WHERE active = false ORDER BY completed, completed_today, streak DESC, activity;`;
        return pool.query(current_query)
        .then((result: Pool_Query) => {
            console.log('successful query');
            return result.rows;
        })
        .catch((error: Error) => {
            console.log(error);
            return error;
        });
    }


    static update_entry_list = async (curr_activity :string, password : string) => {

        const activity_list = curr_activity.toLowerCase().split(" ");
        
        const rows = await daily_status_model.get_all_status();
        var acceptable = new Set()
        for (const entry of rows){
            acceptable.add(entry["activity"])
        }
        for (const activity of activity_list){
            if (acceptable.has(activity) == false){
                return 0;
            }
        }
        

        var failed = false;
        var success = false;

        for(const activity of activity_list){
            const check = await daily_status_model.update_entry(activity, password);
            if (check == 0){
                failed = true;
            }
            if (check == 1){
                success = true;
            }
        }

        if (failed) {
            return 0;
        }
        else if (success){
            return 1;
        }
        else{
            return 2;
        }

    }


    static update_entry = (curr_activity :string, password : string) => {

        curr_activity = curr_activity.toLowerCase();

        var current_query = `UPDATE daily_status 
                            SET progress = progress + 1 
                            WHERE activity = '${curr_activity}' 
                            AND progress < frequency;
                            
                            UPDATE daily_status
                            SET completed = true,
                                days_left = span,
                                completed_today = true
                            WHERE activity = '${curr_activity}'
                            AND progress = frequency;

                            SELECT * FROM daily_status
                            WHERE activity = '${curr_activity}';
                            `;
        console.log(current_query);

        return new Promise<void>((resolve, reject) => {
            if (password == process.env.update_password) {
                console.log("update password is correct!");
                resolve();
            }
            else{
                console.log("update password doesn't match")
                reject("wrong password");
            }
        })
        .then(() => {
            return pool.query(current_query);
        })
        .then((result : Array<Pool_Query>)=> {
            console.log("query successful");
            if (result[2].rows[0].completed){
                return 1;
            }
            else{
                return 2;
            }
        })
        .catch((error : Error )=> {
            console.log(error.message);
            return 0;
        });
    }

    static get_todo = () => {
        var current_query = `SELECT * FROM daily_status WHERE completed_today = false ORDER BY completed, streak DESC;`;

        console.log(current_query)

        return pool.query(current_query)
        .then((result : Pool_Query) => {
            console.log("query successful");
            const todo_array = new Array<string>;
            result.rows.forEach((element) => {
                var urgency : string = "";
                if (!element.completed) {
                    urgency = " URGENT";
                    element.activity = element.activity.toUpperCase();
                }
                if (element.frequency == 1){
                    todo_array.push(element.streak + ": " + element.activity + urgency +  "              .");
                } 
                else {
                    todo_array.push(element.streak + ": " + element.activity + " " + element.progress + " out of " + element.frequency + urgency + "             .");
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


    static daily_update = (password : string) => {

        var current_query = `SELECT * FROM daily_status WHERE active = true;`;
        console.log(current_query)

        return new Promise<void>((resolve, reject) => {
            if (password == process.env.update_password) {
                console.log("update password is correct!");
                resolve();
            }
            else{
                console.log("update password doesn't match")
                reject("wrong password");
            }
        })
        .then(() => {
            return pool.query(current_query);
        })

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
                element.max_streak = Math.max(element.max_streak, element.streak);

                var new_query = `UPDATE daily_status 
                                    SET streak = ${element.streak},
                                        progress = ${element.progress},
                                        days_left = ${element.days_left},
                                        completed = ${element.completed},
                                        completed_today = false,
                                        max_streak = ${element.max_streak}
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



    static clean_all = (password : string) => {

        var current_query = `UPDATE daily_status 
                            SET progress = 0,
                                completed_today = false
                            `;
        console.log(current_query);

        
        return new Promise<void>((resolve, reject) => {
            if (password == process.env.update_password) {
                console.log("update password is correct!");
                resolve();
            }
            else{
                console.log("update password doesn't match")
                reject("wrong password");
            }
        })
        .then(() => {
            return pool.query(current_query);
        })

        .then((result : Pool_Query)=> {
            console.log("query successful");
            return result.rows;
        })
        .catch((error : Error )=> {
            console.log(error.message);
            return error;
        });

    }

    static check_password = (attempt:string) => {
        return attempt === process.env.update_password
    }

}


export {daily_status_model, Pool_Object, Pool_Query};